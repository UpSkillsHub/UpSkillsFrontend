// Dependency-free PDF generator for course outlines.
// Hand-writes a valid multi-page PDF (A4, Helvetica) with the brand navy header.

const W = 595;
const H = 842;
const MARGIN = 54;
const NAVY = [0.106, 0.165, 0.29]; // #1b2a4a
const BLUE = [0.184, 0.31, 0.514]; // #2f4f83
const GRAY = [0.29, 0.34, 0.42];
const LIGHT = [0.55, 0.6, 0.68];

const esc = (s) =>
  String(s)
    .replace(/[^\x20-\x7e]/g, "-")
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

export function downloadCourseOutlinePdf(course, { registrationFee, onlineMonthlyFee, schedule, rwf }) {
  const pages = [];
  let ops = [];
  let y = 0;

  const newPage = () => {
    ops = [];
    pages.push(ops);
    y = H - 60;
  };
  const rect = (x, top, w, h, color) => {
    ops.push(`${color.map((c) => c.toFixed(3)).join(" ")} rg ${x} ${(top - h).toFixed(1)} ${w} ${h} re f`);
  };
  const raw = (str, x, yy, size, bold, color) => {
    ops.push(
      `BT /${bold ? "F2" : "F1"} ${size} Tf ${color.map((c) => c.toFixed(3)).join(" ")} rg ${x} ${yy.toFixed(1)} Td (${esc(str)}) Tj ET`,
    );
  };
  const ensure = (need) => {
    if (y - need < 64) newPage();
  };
  const line = (str, { size = 10, bold = false, color = GRAY, x = MARGIN, lh } = {}) => {
    const step = lh ?? size * 1.5;
    ensure(step);
    y -= step;
    raw(str, x, y, size, bold, color);
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
  const para = (str, opts = {}) => {
    wrap(str, opts.size ?? 10, W - MARGIN * 2 - (opts.indent ?? 0)).forEach((l) =>
      line(l, { ...opts, x: MARGIN + (opts.indent ?? 0) }),
    );
  };
  const bullets = (items, opts = {}) => {
    items.forEach((it) => {
      const ls = wrap(it, opts.size ?? 10, W - MARGIN * 2 - 14);
      ls.forEach((l, i) => line(`${i === 0 ? "• " : "  "}${l}`, { ...opts, x: MARGIN + 6 }));
    });
  };
  const heading = (str) => {
    ensure(34);
    y -= 26;
    raw(str.toUpperCase(), MARGIN, y, 11, true, BLUE);
    y -= 6;
    rect(MARGIN, y + 2, 40, 2, BLUE);
  };

  // ---- Page 1 header band ----
  newPage();
  rect(0, H, W, 118, NAVY);
  raw("UP SKILLS HUB", MARGIN, H - 38, 10, true, [0.65, 0.78, 0.98]);
  const nameLines = wrap(course.name, 20, W - MARGIN * 2);
  let hy = H - 62;
  nameLines.forEach((l) => {
    raw(l, MARGIN, hy, 20, true, [1, 1, 1]);
    hy -= 24;
  });
  raw(`${course.category}  |  ${course.durationMonths} months  |  Online / On-site`, MARGIN, hy - 2, 10, false, [0.75, 0.82, 0.95]);
  y = H - 150;

  // ---- Content ----
  heading("Course Overview");
  para(course.description);

  heading("Skills You Will Learn");
  bullets(course.skills);

  heading("Duration");
  para(`${course.durationMonths} months`);

  heading("Course Schedule");
  bullets(schedule);

  heading("Online / On-site Options");
  bullets([
    `On-site in Kigali: ${rwf(course.monthlyFee)} per month, hands-on classes at our campus.`,
    `Online / self-coaching: ${rwf(onlineMonthlyFee)} per month, learn from anywhere.`,
  ]);

  heading("Requirements");
  bullets(course.requirements);

  heading("Fees");
  bullets([
    `Registration fee (one-time): ${rwf(registrationFee)}`,
    `Program fee (on-site): ${rwf(course.monthlyFee)} per month`,
    `Online / self-coaching: ${rwf(onlineMonthlyFee)} per month`,
    "Upon successful completion, trainees receive a recognized certificate.",
  ]);

  // ---- Footer on the last page ----
  rect(MARGIN, 52, W - MARGIN * 2, 1, [0.85, 0.88, 0.93]);
  raw("Up Skills Hub  |  KG 173 Street, Remera, Kigali, Rwanda", MARGIN, 38, 8.5, false, LIGHT);
  raw("upskillshub.info@gmail.com  |  +250 781 796 283  |  www.upskillshub.com", MARGIN, 26, 8.5, false, LIGHT);

  // ---- Assemble the PDF ----
  const objs = [];
  objs[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objs[2] = `<< /Type /Pages /Kids [${pages.map((_, i) => `${5 + i * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  objs[3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;
  objs[4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;
  pages.forEach((p, i) => {
    const stream = p.join("\n");
    objs[5 + i * 2] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6 + i * 2} 0 R >>`;
    objs[6 + i * 2] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
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

  const blob = new Blob([pdf], { type: "application/pdf" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${course.slug}-course-outline.pdf`;
  a.click();
  URL.revokeObjectURL(a.href);
}
