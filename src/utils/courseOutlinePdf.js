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

// Per-character widths for Times (units of 1/1000 em), enough for accurate
// centering and wrapping. Falls back to an average for anything unlisted.
const WID_R = { " ": 250, ".": 250, ",": 250, ":": 278, ";": 278, "-": 333, "/": 278, "(": 333, ")": 333, "|": 200, "'": 333 };
const charW = (ch, bold) => {
  if (WID_R[ch] !== undefined) return WID_R[ch] * (bold ? 1.05 : 1);
  const code = ch.charCodeAt(0);
  const isUpper = code >= 65 && code <= 90;
  const isDigit = code >= 48 && code <= 57;
  if (isDigit) return bold ? 500 : 500;
  if (isUpper) return bold ? 700 : 660;
  return bold ? 520 : 470; // lowercase average
};
const est = (s, size, bold = false) => {
  let w = 0;
  for (const ch of String(s)) w += charW(ch, bold);
  return (w / 1000) * size;
};
// 1.5 line spacing everywhere.
const LH = (size) => size * 1.5;

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
  const center = (str, yy, size, bold, c) => raw(str, (W - est(str, size, bold)) / 2, yy, size, bold, c);
  const centerIn = (str, xL, boxW, yy, size, bold, c) =>
    raw(str, xL + (boxW - est(str, size, bold)) / 2, yy, size, bold, c);
  const rawRight = (str, xR, yy, size, bold, c) => raw(str, xR - est(str, size, bold), yy, size, bold, c);
  const ensure = (need) => {
    if (y - need < FOOT + 18) newPage();
  };
  // Measured word wrap: breaks on real text width, so nothing runs off the page.
  const wrap = (str, size, maxW, bold = false) => {
    const words = String(str).split(" ");
    const out = [];
    let cur = "";
    for (const w of words) {
      const next = cur ? `${cur} ${w}` : w;
      if (est(next, size, bold) > maxW && cur) {
        out.push(cur);
        cur = w;
      } else cur = next;
    }
    if (cur) out.push(cur);
    return out;
  };

  const IX = M + 16; // inner x inside the frame
  const IW = W - M * 2 - 32; // inner width

  const numHeading = (n, title) => {
    ensure(38);
    y -= 26;
    const label = `${n}. ${title}`;
    raw(label, IX, y, 11.5, true, NAVY);
    y -= 4;
    rect(IX, y + 1, est(label, 11.5, true) + 4, 0.9, ACCENT);
    y -= 4;
  };

  const BSZ = 10; // body size
  const BLH = LH(BSZ); // 1.5 line spacing

  const bulletAt = (str, x, yy, maxW, size = BSZ) => {
    const ls = wrap(str, size, maxW);
    ls.forEach((l, i) => {
      if (i === 0) ops.push(`${col(NAVY)} rg ${x + 1} ${(yy - 2.4).toFixed(1)} 3 3 re f`);
      raw(l, x + 11, yy - i * LH(size), size, false, GRAY);
    });
    return ls.length;
  };
  const bullets = (items, indent = 10) => {
    items.forEach((it) => {
      const rows = wrap(it, BSZ, IW - indent - 12).length;
      ensure(rows * BLH + 4);
      y -= BLH;
      bulletAt(it, IX + indent, y, IW - indent - 12);
      y -= (rows - 1) * BLH;
    });
  };

  // ================= Letterhead (white) =================
  newPage();

  // Logo top-left (no frame around it)
  ops.push(`q 56 0 0 56 ${M} ${H - 96} cm /Im1 Do Q`);

  center("UP SKILLS HUB", H - 66, 22, true, NAVY);
  center("Excellence in IT Services", H - 84, 9.5, false, LIGHT);
  {
    // Course name may need two centered lines on long titles.
    let ty = H - 108;
    wrap(course.name.toUpperCase(), 14, W - M * 2 - 80, true).forEach((l) => {
      center(l, ty, 14, true, ACCENT);
      ty -= 19;
    });
    center("COURSE OUTLINE", ty - 2, 9, true, GRAY);
    const cw = est("COURSE OUTLINE", 9, true);
    rect((W - cw) / 2, ty - 6, cw, 0.9, GRAY);
    y = ty - 24;
  }

  // Topics strip (skills in caps, like the reference), wrapped and centered
  wrap(course.skills.join(",  ").toUpperCase(), 8.5, W - M * 2 - 10, true).forEach((l) => {
    center(l, y, 8.5, true, INK);
    y -= 13;
  });
  y -= 6;

  // ================= Level band =================
  const bandTop = y;
  rect(M, bandTop, W - M * 2, 23, BLUE);
  sRect(M, bandTop, W - M * 2, 23, NAVY, 0.9);
  centerIn(
    `${course.category.toUpperCase()}   -   ${course.durationMonths} MONTHS   -   ONLINE / ON-SITE`,
    M, W - M * 2, bandTop - 15.5, 10, true, [1, 1, 1],
  );
  y = bandTop - 23;

  // ================= Framed content =================
  const frameTopPage = pages.length;
  const frameTop = y;
  y -= 4;

  numHeading(1, "Course Overview");
  wrap(course.description, BSZ, IW).forEach((l) => {
    ensure(BLH);
    y -= BLH;
    raw(l, IX, y, BSZ, false, INK);
  });

  numHeading(2, "Skills You Will Learn");
  {
    const colW = IW / 2;
    const rows = Math.ceil(course.skills.length / 2);
    for (let r = 0; r < rows; r++) {
      ensure(BLH + 2);
      y -= BLH;
      const a = course.skills[r];
      const b = course.skills[r + rows];
      if (a) bulletAt(a, IX + 10, y, colW - 30);
      if (b) bulletAt(b, IX + colW + 6, y, colW - 30);
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
    const gap = 14;
    const boxW = (W - M * 2 - gap) / 2;
    const rSize = 9.5;
    const rLH = LH(rSize);
    const reqHeights = course.requirements.map((r) => wrap(r, rSize, boxW - 42).length);
    const reqRows = reqHeights.reduce((a, b) => a + b, 0);
    const certLines = wrap("(A recognized certificate is awarded upon successful completion)", 8, boxW - 30, true);
    const innerH = Math.max(reqRows * rLH + 6, 3 * 17 + certLines.length * 11 + 8);
    const boxH = innerH + 42;

    ensure(boxH + 28);
    y -= 20;
    const top = y;

    // Requirements (bordered, white)
    sRect(M, top, boxW, boxH, NAVY, 1);
    raw("REQUIREMENTS", M + 14, top - 18, 10, true, NAVY);
    rect(M + 14, top - 22, est("REQUIREMENTS", 10, true), 0.9, NAVY);
    let ry = top - 40;
    course.requirements.forEach((r) => {
      const ls = wrap(r, rSize, boxW - 42);
      ls.forEach((l, j) => {
        if (j === 0) ops.push(`${col(NAVY)} rg ${M + 16} ${(ry - 2.4).toFixed(1)} 3 3 re f`);
        raw(l, M + 26, ry - j * rLH, rSize, false, GRAY);
      });
      ry -= ls.length * rLH + 2;
    });

    // Course fee (filled + bordered, like the highlighted fee box)
    const fx = M + boxW + gap;
    rect(fx, top, boxW, boxH, FEEBG);
    sRect(fx, top, boxW, boxH, NAVY, 1);
    raw("COURSE FEE", fx + 14, top - 18, 10, true, NAVY);
    rect(fx + 14, top - 22, est("COURSE FEE", 10, true), 0.9, NAVY);
    let fy = top - 40;
    [
      ["Registration (one-time)", rwf(registrationFee)],
      ["On-site program fee", `${rwf(course.monthlyFee)} /mo`],
      ["Online / self-coaching", `${rwf(onlineMonthlyFee)} /mo`],
    ].forEach(([label, value]) => {
      raw(label, fx + 14, fy, 8.8, false, GRAY);
      rawRight(value, fx + boxW - 14, fy, 9.6, true, NAVY);
      fy -= 17;
    });
    fy -= 2;
    certLines.forEach((l) => {
      raw(l, fx + 14, fy, 8, true, RED);
      fy -= 11;
    });

    y = top - boxH;
  }

  // ================= White footer on every page =================
  const total = pages.length;
  pages.forEach((p, i) => {
    const saved = ops;
    ops = p;
    rect(M, FOOT - 6, W - M * 2, 0.9, BORDER);
    const l1 = "Up Skills Hub  |  KG 173 Street, Remera, Kigali, Rwanda";
    const l2 = "upskillshub.info@gmail.com  |  +250 781 796 283  |  www.upskillshub.com";
    raw(l1, (W - est(l1, 8.5)) / 2, FOOT - 22, 8.5, false, LIGHT);
    raw(l2, (W - est(l2, 8.5)) / 2, FOOT - 35, 8.5, false, LIGHT);
    if (total > 1) rawRight(`Page ${i + 1} of ${total}`, W - M, FOOT - 22, 8.5, false, LIGHT);
    ops = saved;
  });

  // ================= Assemble (binary-safe) =================
  const logoBin = atob(LOGO_JPEG_B64);
  const objs = [];
  objs[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objs[2] = `<< /Type /Pages /Kids [${pages.map((_, i) => `${6 + i * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  objs[3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>`;
  objs[4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>`;
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
