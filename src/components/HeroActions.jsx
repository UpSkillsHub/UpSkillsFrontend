import { useEffect, useState } from "react";
import { IconArrow } from "./icons.jsx";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScMG7St3ye7JU7viFJFU1mZdXQcbZDuZ9F9wBiByiVek5SCdQ/viewform";

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// Two pairs of hero actions that alternate over time (and on the arrow click).
const SETS = [
  [
    { label: "Explore Courses", kind: "primary", href: "#courses", onClick: scrollTo("courses") },
    { label: "Hire Our Talent", kind: "secondary", href: "#talent", onClick: scrollTo("talent") },
  ],
  [
    { label: "Hire Talent", kind: "primary", href: "#talent", onClick: scrollTo("talent") },
    { label: "Apply / Join Training", kind: "secondary", href: FORM_URL, external: true },
  ],
];

export default function HeroActions() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % SETS.length), 4500);
    return () => clearTimeout(t);
  }, [idx, paused]);

  const next = () => setIdx((i) => (i + 1) % SETS.length);

  const renderBtn = (b) => {
    const cls = `${b.kind === "primary" ? "btn-primary" : "btn-secondary"} rounded-full px-8`;
    return b.external ? (
      <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer" className={cls}>{b.label}</a>
    ) : (
      <a key={b.label} href={b.href} onClick={b.onClick} className={cls}>{b.label}</a>
    );
  };

  return (
    <div
      className="mt-8 flex items-center gap-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={idx} className="anim-swap flex flex-wrap gap-4">
        {SETS[idx].map(renderBtn)}
      </div>
      <button
        onClick={next}
        aria-label="Switch actions"
        title="Switch options"
        className="btn-glow-strong grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-brand-600 text-brand-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-white/10"
      >
        <IconArrow className="h-5 w-5" />
      </button>
    </div>
  );
}
