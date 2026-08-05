// Dependency-free PDF generator for course outlines.
// Produces a branded A4 document: navy cover band with the Up Skills Hub logo,
// structured sections, two-column skills, a fee panel, and footers on every page.

import { LOGO_JPEG_B64, LOGO_SIZE } from "./logoData.js";

const W = 595;
const H = 842;
const M = 56;
const NAVY = [0.106, 0.165, 0.29]; // #1b2a4a
const BLUE = [0.184, 0.31, 0.514]; // #2f4f83
const ACCENT = [0.231, 0.51, 0.965]; // #3b82f6
const INK = [0.16, 0.2, 0.27];
const GRAY = [0.35, 0.4, 0.48];
const LIGHT = [0.55, 0.6, 0.68];
const PANEL = [0.945, 0.96, 0.985];
const RULE = [0.86, 0.89, 0.94];

const esc = (s) =>
  String(s)
    .replace(/[^\x20-\x7e]/g, "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

const col = (c) => c.map((v) => v.toFixed(3)).join(" ");

export function downloadCourseOutlinePdf(course, { registrationFee, onlineMonthlyFee, schedule, rwf }) {
  const pages = [];
  let ops = [];
  let y = 0;

  const newPage = () => {
    ops = [];
    pages.push(ops);
    y = H - 70;
  };
  const rect = (x, top, w, h, c) => ops.push(`${col(c)} rg ${x} ${(top - h).toFixed(1)} ${w} ${h} re f`);
  const raw = (str, x, yy, size, bold, c) =>
    ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${col(c)} rg ${x} ${yy.toFixed(1)} Td (${esc(str)}) Tj ET`);
  const rawRight = (str, xRight, yy, size, bold, c) => {
    const w = String(str).length * size * 0.52;
    raw(str, xRight - w, yy, size, bold, c);
  };
  const ensure = (need) => {
    if (y - need < 84) newPage();
  };
  const wrap = (str, size, maxW) => {
    const maxChars = Math.floor(maxW / (size * 0.5));
    const words = String(str).split(" ");
    const out = [];
    let cur = "";
    for (const w of words) {
      if ((cur + " " + w).trim().length > maxChars) {
        out.push(cur.trim());
        cur = w;
      } else cur += " " + w;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  };
  const line = (str, { size = 10, bold = false, c = GRAY, x = M, lh } = {}) => {
    const step = lh ?? size * 1.55;
    ensure(step);
    y -= step;
    raw(str, x, y, size, bold, c);
  };
  const para = (str, opts = {}) =>
    wrap(str, opts.size ?? 10, W - M * 2).forEach((l) => line(l, opts));

  const heading = (str) => {
    ensure(44);
    y -= 34;
    rect(M, y + 9, 7, 7, ACCENT);
    raw(str.toUpperCase(), M + 14, y, 11.5, true, NAVY);
    y -= 8;
    rect(M, y + 2, W - M * 2, 0.9, RULE);
    y -= 2;
  };

  const bulletRow = (str, x, yy, maxW) => {
    const ls = wrap(str, 10, maxW);
    ls.forEach((l, i) => {
      if (i === 0) {
        ops.push(`${col(ACCENT)} rg ${x + 2} ${(yy - 3).toFixed(1)} 3.4 3.4 re f`);
      }
      raw(l, x + 12, yy - i * 14, 10, false, GRAY);
    });
    return ls.length;
  };

  const bullets = (items) => {
    items.forEach((it) => {
      const rows = wrap(it, 10, W - M * 2 - 12).length;
      ensure(rows * 14 + 4);
      y -= 16;
      bulletRow(it, M, y, W - M * 2 - 12);
      y -= (rows - 1) * 14;
    });
  };

  // ---------- Page 1: cover band ----------
  newPage();
  const nameLines = wrap(course.name, 20, W - M * 2);
  const bandH = 158 + (nameLines.length - 1) * 25;
  rect(0, H, W, bandH, NAVY);
  rect(0, H - bandH + 4, W, 4, ACCENT); // thin accent line under the band

  // Logo badge
  rect(M, H - 34, 62, 62, [1, 1, 1]);
  ops.push(`q 54 0 0 54 ${M + 4} ${H - 92} cm /Im1 Do Q`);

  raw("UP SKILLS HUB", M + 76, H - 58, 12, true, [1, 1, 1]);
  raw("Excellence in IT Services", M + 76, H - 74, 8.5, false, [0.66, 0.76, 0.95]);
  rawRight(`Course Outline`, W - M, H - 58, 9, true, [0.66, 0.76, 0.95]);

  let hy = H - 122;
  nameLines.forEach((l) => {
    raw(l, M, hy, 20, true, [1, 1, 1]);
    hy -= 25;
  });
  raw(`${course.category}   |   ${course.durationMonths} months   |   Online / On-site   |   Recognized certificate`, M, hy + 4, 9.5, false, [0.75, 0.82, 0.95]);

  y = H - bandH - 26;

  // ---------- Sections ----------
  heading("Course Overview");
  y -= 4;
  para(course.description, { size: 10.5, c: INK, lh: 16 });

  heading("Skills You Will Learn");
  y -= 4;
  {
    const colW = (W - M * 2) / 2;
    const rows = Math.ceil(course.skills.length / 2);
    for (let r = 0; r < rows; r++) {
      ensure(18);
      y -= 17;
      const left = course.skills[r];
      const right = course.skills[r + rows];
      if (left) bulletRow(left, M, y, colW - 24);
      if (right) bulletRow(right, M + colW, y, colW - 24);
    }
  }

  heading("Duration and Schedule");
  y -= 4;
  bullets([`Duration: ${course.durationMonths} months`, ...schedule]);

  heading("Online / On-site Options");
  y -= 4;
  bullets([
    `On-site in Kigali: ${rwf(course.monthlyFee)} per month, hands-on classes at our campus.`,
    `Online / self-coaching: ${rwf(onlineMonthlyFee)} per month, learn from anywhere.`,
  ]);

  heading("Requirements");
  y -= 4;
  bullets(course.requirements);

  // ---------- Fee panel (kept together with its heading) ----------
  {
    const rows = [
      ["Registration fee (one-time)", rwf(registrationFee)],
      ["Program fee (on-site)", `${rwf(course.monthlyFee)} / month`],
      ["Online / self-coaching", `${rwf(onlineMonthlyFee)} / month`],
    ];
    const panelH = rows.length * 20 + 40;
    ensure(panelH + 62);
    heading("Fees");
    y -= 12;
    const top = y;
    rect(M, top, W - M * 2, panelH, PANEL);
    rect(M, top, 3, panelH, ACCENT);
    let ry = top - 22;
    rows.forEach(([label, value]) => {
      raw(label, M + 18, ry, 10, false, GRAY);
      rawRight(value, W - M - 18, ry, 10.5, true, NAVY);
      ry -= 20;
    });
    raw("Upon successful completion, trainees receive a recognized certificate.", M + 18, ry, 8.5, false, LIGHT);
    y = top - panelH;
  }

  // ---------- Footer on every page ----------
  const total = pages.length;
  pages.forEach((p, i) => {
    const saved = ops;
    ops = p;
    rect(M, 56, W - M * 2, 0.9, RULE);
    raw("Up Skills Hub  |  KG 173 Street, Remera, Kigali, Rwanda", M, 42, 8, false, LIGHT);
    raw("upskillshub.info@gmail.com  |  +250 781 796 283  |  www.upskillshub.com", M, 30, 8, false, LIGHT);
    rawRight(`Page ${i + 1} of ${total}`, W - M, 42, 8, false, LIGHT);
    ops = saved;
  });

  // ---------- Assemble (binary-safe) ----------
  const logoBin = atob(LOGO_JPEG_B64);
  const objs = [];
  objs[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objs[2] = `<< /Type /Pages /Kids [${pages.map((_, i) => `${6 + i * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  objs[3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;
  objs[4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;
  objs[5] = `<< /Type /XObject /Subtype /Image /Width ${LOGO_SIZE} /Height ${LOGO_SIZE} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${logoBin.length} >>\nstream\n${logoBin}\nendstream`;
  pages.forEach((p, i) => {
    const stream = p.join("\n");
    objs[6 + i * 2] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << /Im1 5 0 R >> >> /Contents ${7 + i * 2} 0 R >>`;
    objs[7 + i * 2] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
  });

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  for (let i = 1; i < objs.length; i++) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objs[i]}\nendobj\n`;
  }
  const xref = pdf.length;
  pdf += `xref\n0 ${objs.length}\n0000000000 65535 f \n`;
  for (let i = 1; i < objs.length; i++) pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  pdf += `trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

  // Latin-1 safe byte conversion (keeps the embedded JPEG intact).
  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;

  const blob = new Blob([bytes], { type: "application/pdf" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${course.slug}-course-outline.pdf`;
  a.click();
  URL.revokeObjectURL(a.href);
}
