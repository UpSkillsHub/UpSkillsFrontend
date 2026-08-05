// Dependency-free PDF generator for course outlines.
// Brochure-style A4: navy masthead with logo, filled section bands, compact
// content, side-by-side Requirements / Fees boxes, navy footer band.
// Typical courses fit on a single page.

import { LOGO_JPEG_B64, LOGO_SIZE } from "./logoData.js";

const W = 595;
const H = 842;
const M = 50;
const NAVY = [0.106, 0.165, 0.29]; // #1b2a4a
const ACCENT = [0.231, 0.51, 0.965]; // #3b82f6
const BAND = [0.918, 0.943, 0.985]; // light blue band
const PANEL = [0.955, 0.965, 0.985];
const FEEBG = [0.878, 0.922, 0.988];
const INK = [0.16, 0.2, 0.27];
const GRAY = [0.33, 0.38, 0.46];
const LIGHT = [0.62, 0.68, 0.76];
const RULE = [0.87, 0.9, 0.94];
const FOOT_H = 46;

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
    y = H - 64;
  };
  const rect = (x, top, w, h, c) => ops.push(`${col(c)} rg ${x} ${(top - h).toFixed(1)} ${w} ${h} re f`);
  const raw = (str, x, yy, size, bold, c) =>
    ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${col(c)} rg ${x} ${yy.toFixed(1)} Td (${esc(str)}) Tj ET`);
  const rawRight = (str, xRight, yy, size, bold, c) => {
    const w = String(str).length * size * 0.52;
    raw(str, xRight - w, yy, size, bold, c);
  };
  const ensure = (need) => {
    if (y - need < FOOT_H + 24) newPage();
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

  // Filled section band with accent edge (like the reference brochure).
  const band = (title) => {
    ensure(42);
    y -= 28;
    rect(M, y + 16, W - M * 2, 19, BAND);
    rect(M, y + 16, 3.5, 19, ACCENT);
    raw(title.toUpperCase(), M + 13, y + 3.2, 10.5, true, NAVY);
    y -= 4;
  };

  const bulletAt = (str, x, yy, maxW, size = 9.8, c = GRAY) => {
    const ls = wrap(str, size, maxW);
    ls.forEach((l, i) => {
      if (i === 0) ops.push(`${col(ACCENT)} rg ${x + 1.5} ${(yy - 2.5).toFixed(1)} 3.2 3.2 re f`);
      raw(l, x + 11, yy - i * 13, size, false, c);
    });
    return ls.length;
  };

  const bullets = (items, size = 9.8) => {
    items.forEach((it) => {
      const rows = wrap(it, size, W - M * 2 - 11).length;
      ensure(rows * 13 + 4);
      y -= 14.5;
      bulletAt(it, M + 2, y, W - M * 2 - 11, size);
      y -= (rows - 1) * 13;
    });
  };

  // ---------- Masthead ----------
  newPage();
  const nameLines = wrap(course.name, 19, W - M * 2);
  const bandH = 128 + (nameLines.length - 1) * 23;
  rect(0, H, W, bandH, NAVY);
  rect(0, H - bandH + 3.5, W, 3.5, ACCENT);

  rect(M, H - 22, 52, 52, [1, 1, 1]);
  ops.push(`q 46 0 0 46 ${M + 3} ${H - 71} cm /Im1 Do Q`);

  raw("UP SKILLS HUB", M + 64, H - 42, 11.5, true, [1, 1, 1]);
  raw("Excellence in IT Services", M + 64, H - 56, 8, false, [0.66, 0.76, 0.95]);
  rawRight("COURSE OUTLINE", W - M, H - 42, 8.5, true, [0.66, 0.76, 0.95]);

  let hy = H - 95;
  nameLines.forEach((l) => {
    raw(l, M, hy, 19, true, [1, 1, 1]);
    hy -= 23;
  });
  raw(`${course.category}   |   ${course.durationMonths} months   |   Online / On-site   |   Recognized certificate`, M, hy + 5, 9, false, [0.75, 0.82, 0.95]);

  y = H - bandH - 10;

  // ---------- Overview ----------
  band("Course Overview");
  wrap(course.description, 10, W - M * 2).forEach((l) => {
    ensure(14);
    y -= 14;
    raw(l, M + 2, y, 10, false, INK);
  });

  // ---------- Skills (two columns) ----------
  band("Skills You Will Learn");
  {
    const colW = (W - M * 2) / 2;
    const rows = Math.ceil(course.skills.length / 2);
    for (let r = 0; r < rows; r++) {
      ensure(16);
      y -= 14.5;
      const left = course.skills[r];
      const right = course.skills[r + rows];
      if (left) bulletAt(left, M + 2, y, colW - 22);
      if (right) bulletAt(right, M + colW + 6, y, colW - 22);
    }
  }

  // ---------- Duration & Schedule ----------
  band("Duration and Schedule");
  bullets([`Duration: ${course.durationMonths} months`, ...schedule]);

  // ---------- Online / On-site ----------
  band("Online / On-site Options");
  bullets([
    `On-site in Kigali: ${rwf(course.monthlyFee)} per month, hands-on classes at our campus.`,
    `Online / self-coaching: ${rwf(onlineMonthlyFee)} per month, learn from anywhere.`,
  ]);

  // ---------- Bottom row: Requirements box + Fees box ----------
  {
    const gap = 14;
    const boxW = (W - M * 2 - gap) / 2;
    const reqSize = 9.5;
    const reqRowHeights = course.requirements.map((r) => wrap(r, reqSize, boxW - 34).length);
    const reqRows = reqRowHeights.reduce((a, b) => a + b, 0);
    const feeRows = 3;
    const innerH = Math.max(reqRows * 13 + 8, feeRows * 17 + 26);
    const boxH = innerH + 38;

    ensure(boxH + 34);
    y -= 24;
    const top = y;

    // Requirements box
    rect(M, top, boxW, boxH, PANEL);
    rect(M, top, boxW, 20, BAND);
    rect(M, top, 3.5, boxH, ACCENT);
    raw("REQUIREMENTS", M + 13, top - 13.5, 9.5, true, NAVY);
    let ry = top - 34;
    course.requirements.forEach((r, i) => {
      bulletAt(r, M + 12, ry, boxW - 34, reqSize);
      ry -= reqRowHeights[i] * 13 + 1;
    });

    // Fees box
    const fx = M + boxW + gap;
    rect(fx, top, boxW, boxH, FEEBG);
    rect(fx, top, boxW, 20, NAVY);
    raw("FEES", fx + 13, top - 13.5, 9.5, true, [1, 1, 1]);
    let fy = top - 36;
    [
      ["Registration (one-time)", rwf(registrationFee)],
      ["On-site program fee", `${rwf(course.monthlyFee)} /mo`],
      ["Online / self-coaching", `${rwf(onlineMonthlyFee)} /mo`],
    ].forEach(([label, value]) => {
      raw(label, fx + 13, fy, 8.8, false, GRAY);
      rawRight(value, fx + boxW - 13, fy, 9.5, true, NAVY);
      fy -= 17;
    });
    wrap("A recognized certificate is awarded upon successful completion.", 7.8, boxW - 26).forEach((l) => {
      raw(l, fx + 13, fy, 7.8, false, [0.35, 0.45, 0.6]);
      fy -= 10;
    });

    y = top - boxH;
  }

  // ---------- Navy footer band on every page ----------
  const total = pages.length;
  pages.forEach((p, i) => {
    const saved = ops;
    ops = p;
    rect(0, FOOT_H, W, FOOT_H, NAVY);
    rect(0, FOOT_H, W, 2, ACCENT);
    raw("Up Skills Hub  |  KG 173 Street, Remera, Kigali, Rwanda", M, FOOT_H - 19, 7.8, false, [0.78, 0.84, 0.95]);
    raw("upskillshub.info@gmail.com   |   +250 781 796 283   |   www.upskillshub.com", M, FOOT_H - 32, 7.8, false, [0.78, 0.84, 0.95]);
    if (total > 1) rawRight(`Page ${i + 1} of ${total}`, W - M, FOOT_H - 19, 7.8, false, [0.78, 0.84, 0.95]);
    rawRight("Learn. Practice. Grow. Succeed.", W - M, FOOT_H - 32, 7.8, true, [0.66, 0.76, 0.95]);
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

  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;

  const blob = new Blob([bytes], { type: "application/pdf" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${course.slug}-course-outline.pdf`;
  a.click();
  URL.revokeObjectURL(a.href);
}
