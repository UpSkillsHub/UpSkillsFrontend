// Unified, professional section heading used across the site.
// Structure: small tracked eyebrow flanked by fading lines, a two-tone title
// whose accent word carries a slowly moving gradient, and a tapered underline.
export default function SectionHeading({ eyebrow, title, accent, dark = false, align = "center" }) {
  const center = align === "center";
  return (
    <div className={center ? "text-center" : "text-left"}>
      {eyebrow && (
        <span
          className={`inline-flex max-w-full flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] sm:gap-3 sm:text-[11px] sm:tracking-[0.28em] ${
            center ? "justify-center" : ""
          } ${dark ? "text-blue-200/90" : "text-brand-500 dark:text-blue-300"}`}
        >
          <span className={`h-px w-5 shrink-0 bg-gradient-to-r from-transparent sm:w-8 ${dark ? "to-blue-300/70" : "to-brand-400/70"}`} />
          <span className="min-w-0 text-center">{eyebrow}</span>
          <span className={`h-px w-5 shrink-0 bg-gradient-to-l from-transparent sm:w-8 ${dark ? "to-blue-300/70" : "to-brand-400/70"}`} />
        </span>
      )}
      <h2 className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl ${dark ? "!text-white" : ""}`}>
        {title}{" "}
        <span
          className={`animate-gradient bg-[length:200%_auto] bg-clip-text text-transparent ${
            dark
              ? "bg-gradient-to-r from-blue-200 via-white to-blue-200"
              : "bg-gradient-to-r from-brand-600 via-blue-500 to-brand-600 dark:from-blue-300 dark:via-white dark:to-blue-300"
          }`}
        >
          {accent}
        </span>
      </h2>
      <div className={`mt-4 flex items-center gap-1.5 ${center ? "justify-center" : ""}`}>
        <span className={`h-1 w-10 rounded-full bg-gradient-to-r ${dark ? "from-blue-300 to-white/70" : "from-brand-600 to-blue-400"}`} />
        <span className={`h-1 w-2.5 rounded-full ${dark ? "bg-white/60" : "bg-blue-400/70"}`} />
        <span className={`h-1 w-1 rounded-full ${dark ? "bg-white/40" : "bg-blue-300/60"}`} />
      </div>
    </div>
  );
}
