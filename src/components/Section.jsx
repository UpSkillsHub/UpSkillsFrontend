export function SectionHeading({ eyebrow, title, subtitle, center }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-3xl font-extrabold text-brand-dark sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-slate-500">{subtitle}</p>}
    </div>
  );
}
