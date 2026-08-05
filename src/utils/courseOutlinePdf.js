// Dependency-free PDF generator for course outlines.
// Styled after the reference brochure: white page, centered letterhead with the
// logo, a topics strip, a colored level band, a framed content area with
// numbered sections, and bordered Requirements / Course Fee boxes at the bottom.

import { LOGO_JPEG_B64, LOGO_SIZE } from "./logoData.js";

const W = 595;
const H = 842;
const M = 46;
const NAVY = [0.106, 0.165, 0.29];
const BLUE = [0.184, 0.31, 0.514];
const ACCENT = [0.231, 0.51, 0.965];
const RED = [0.78, 0.12, 0.12];
const INK = [0.13, 0.16, 0.22];
const GRAY = [0.32, 0.37, 0.45];
const LIGHT = [0.58, 0.63, 0.71];
const BORDER = [0.72, 0.76, 0.82];
const FEEBG = [0.878, 0.922, 0.988];
const FOOT = 58;

const esc = (s) =>
  String(s)
    .replace(/[^\x20-\x7e]/g, "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

const col = (c) => c.map((v) => v.toFixed(3)).join(" ");
const est = (s, size) => String(s).length * size * 0.52;

export function downloadCourseOutlinePdf(course, { registrationFee, onlineMonthlyFee, schedule, rwf }) {
  const pages = [];
  let ops = [];
  let y = 0;

  const newPage = () => {
    ops = [];
    pages.push(ops);
    y = H - 56;
  };
  const rect = (x, top, w, h, c) => ops.push(`${col(c)} rg ${x} ${(top - h).toFixed(1)} ${w} ${h} re f`);
  const sRect = (x, top, w, h, c = BORDER, lw = 0.9) =>
    ops.push(`${lw} w ${col(c)} RG ${x} ${(top - h).toFixed(1)} ${w} ${h} re S`);
  const raw = (str, x, yy, size, bold, c) =>
    ops.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${col(c)} rg ${x} ${yy.toFixed(1)} Td (${esc(str)}) Tj ET`);
  const center = (str, yy, size, bold, c) => raw(str, (W - est(str, size)) / 2, yy, size, bold, c);
  const rawRight = (str, xR, yy, size, bold, c) => raw(str, xR - est(str, size), yy, size, bold, c);
  const ensure = (need) => {
    if (y - need < FOOT + 18) newPage();
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

  const IX = M + 16; // inner x inside the frame
  const IW = W - M * 2 - 32; // inner width

  const numHeading = (n, title) => {
    ensure(34);
    y -= 24;
    raw(`${n}. ${title}`, IX, y, 10.8, true, NAVY);
    y -= 3;
    rect(IX, y + 1, est(`${n}. ${title}`, 10.8) + 4, 0.9, ACCENT);
    y -= 3;
  };

  const bulletAt = (str, x, yy, maxW, size = 9.6) => {
    const ls = wrap(str, size, maxW);
    ls.forEach((l, i) => {
      if (i === 0) ops.push(`${col(NAVY)} rg ${x + 1} ${(yy - 2.4).toFixed(1)} 3 3 re f`);
      raw(l, x + 10, yy - i * 12.5, size, false, GRAY);
    });
    return ls.length;
  };
  const bullets = (items, indent = 10) => {
    items.forEach((it) => {
      const rows = wrap(it, 9.6, IW - indent - 10).length;
      ensure(rows * 12.5 + 4);
      y -= 14;
      bulletAt(it, IX + indent, y, IW - indent - 10);
      y -= (rows - 1) * 12.5;
    });
  };

  // ================= Letterhead (white) =================
  newPage();

  // Logo top-left with a thin border
  sRect(M, H - 40, 58, 58, BORDER, 0.8);
  ops.push(`q 52 0 0 52 ${M + 3} ${H - 95} cm /Im1 Do Q`);

  center("UP SKILLS HUB", H - 66, 22, true, NAVY);
  center("Excellence in IT Services", H - 82, 9, false, LIGHT);
  center(course.name.toUpperCase(), H - 104, 14, true, ACCENT);
  center("COURSE OUTLINE", H - 120, 8.5, true, GRAY);
  rect((W - 76) / 2, H - 124, 76, 0.9, GRAY);

  // Topics strip (skills in caps, like the reference)
  y = H - 142;
  wrap(course.skills.join(",  ").toUpperCase(), 8, W - M * 2).forEach((l) => {
    center(l, y, 8, true, INK);
    y -= 11.5;
  });
  y -= 4;

  // ================= Level band =================
  const bandTop = y;
  rect(M, bandTop, W - M * 2, 21, BLUE);
  sRect(M, bandTop, W - M * 2, 21, NAVY, 0.9);
  center(`${course.category.toUpperCase()}  -  ${course.durationMonths} MONTHS  -  ONLINE / ON-SITE`, bandTop - 14.5, 9.5, true, [1, 1, 1]);
  y = bandTop - 21;

  // ================= Framed content =================
  const frameTopPage = pages.length;
  const frameTop = y;
  y -= 4;

  numHeading(1, "Course Overview");
  wrap(course.description, 9.8, IW).forEach((l) => {
    ensure(13.5);
    y -= 13.5;
    raw(l, IX, y, 9.8, false, INK);
  });

  numHeading(2, "Skills You Will Learn");
  {
    const colW = IW / 2;
    const rows = Math.ceil(course.skills.length / 2);
    for (let r = 0; r < rows; r++) {
      ensure(15);
      y -= 14;
      const a = course.skills[r];
      const b = course.skills[r + rows];
      if (a) bulletAt(a, IX + 10, y, colW - 26);
      if (b) bulletAt(b, IX + colW + 4, y, colW - 26);
    }
  }

  numHeading(3, "Duration and Schedule");
  bullets([`Duration: ${course.durationMonths} months`, ...schedule]);

  numHeading(4, "Online / On-site Options");
  bullets([
    `On-site in Kigali: ${rwf(course.monthlyFee)} per month, hands-on classes at our campus.`,
    `Online / self-coaching: ${rwf(onlineMonthlyFee)} per month, learn from anywhere.`,
  ]);

  y -= 10;
  // Close the frame only if everything stayed on one page.
  if (pages.length === frameTopPage) {
    sRect(M, frameTop, W - M * 2, frameTop - y, BORDER, 0.9);
  }

  // ================= Bottom boxes =================
  {
    const gap = 12;
    const boxW = (W - M * 2 - gap) / 2;
    const reqSize = 9.2;
    const reqHeights = course.requirements.map((r) => wrap(r, reqSize, boxW - 40).length);
    const reqRows = reqHeights.reduce((a, b) => a + b, 0);
    const innerH = Math.max(reqRows * 12.5 + 6, 3 * 16 + 24);
    const boxH = innerH + 40;

    ensure(boxH + 26);
    y -= 18;
    const top = y;

    // Requirements (bordered, white)
    sRect(M, top, boxW, boxH, NAVY, 1);
    raw("REQUIREMENTS", M + 14, top - 17, 9.8, true, NAVY);
    rect(M + 14, top - 20.5, est("REQUIREMENTS", 9.8), 0.9, NAVY);
    let ry = top - 37;
    course.requirements.forEach((r, i) => {
      const ls = wrap(r, reqSize, boxW - 40);
      ls.forEach((l, j) => {
        if (j === 0) ops.push(`${col(NAVY)} rg ${M + 16} ${(ry - 2.4).toFixed(1)} 3 3 re f`);
        raw(l, M + 25, ry - j * 12.5, reqSize, false, GRAY);
      });
      ry -= ls.length * 12.5 + 1.5;
    });

    // Course fee (filled + bordered, like the highlighted fee box)
    const fx = M + boxW + gap;
    rect(fx, top, boxW, boxH, FEEBG);
    sRect(fx, top, boxW, boxH, NAVY, 1);
    raw("COURSE FEE", fx + 14, top - 17, 9.8, true, NAVY);
    rect(fx + 14, top - 20.5, est("COURSE FEE", 9.8), 0.9, NAVY);
    let fy = top - 37;
    [
      ["Registration (one-time)", rwf(registrationFee)],
      ["On-site program fee", `${rwf(course.monthlyFee)} /mo`],
      ["Online / self-coaching", `${rwf(onlineMonthlyFee)} /mo`],
    ].forEach(([label, value]) => {
      raw(label, fx + 14, fy, 8.6, false, GRAY);
      rawRight(value, fx + boxW - 14, fy, 9.4, true, NAVY);
      fy -= 16;
    });
    wrap("(A recognized certificate is awarded upon successful completion)", 7.6, boxW - 28).forEach((l) => {
      raw(l, fx + 14, fy, 7.6, true, RED);
      fy -= 10;
    });

    y = top - boxH;
  }

  // ================= White footer on every page =================
  const total = pages.length;
  pages.forEach((p, i) => {
    const saved = ops;
    ops = p;
    rect(M, FOOT - 8, W - M * 2, 0.9, BORDER);
    const l1 = "Up Skills Hub  |  KG 173 Street, Remera, Kigali, Rwanda";
    const l2 = "upskillshub.info@gmail.com  |  +250 781 796 283  |  www.upskillshub.com";
    raw(l1, (W - est(l1, 8)) / 2, FOOT - 22, 8, false, LIGHT);
    raw(l2, (W - est(l2, 8)) / 2, FOOT - 34, 8, false, LIGHT);
    if (total > 1) rawRight(`Page ${i + 1} of ${total}`, W - M, FOOT - 22, 8, false, LIGHT);
    ops = saved;
  });

  // ================= Assemble (binary-safe) =================
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
