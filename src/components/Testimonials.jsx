import { useEffect, useState } from "react";
import { IconUser } from "./icons.jsx";
import { getTestimonials, subscribe } from "../data/testimonials.js";

function Avatar({ person, active, big }) {
  const size = big ? "h-16 w-16" : "h-12 w-12";
  const ring = active ? "ring-2 ring-brand-400" : "ring-1 ring-slate-200 dark:ring-white/10";
  if (person.img) {
    return <img src={person.img} alt={person.name} className={`${size} shrink-0 rounded-full object-cover shadow-sm ${ring}`} />;
  }
  return (
    <span className={`grid ${size} shrink-0 place-items-center rounded-full bg-slate-200 text-slate-500 shadow-sm dark:bg-white/10 dark:text-slate-300 ${ring}`}>
      <IconUser className={big ? "h-8 w-8" : "h-6 w-6"} />
    </span>
  );
}

// Shortest circular distance between item i and the active index.
function offsetOf(i, active, n) {
  let off = i - active;
  if (off > n / 2) off -= n;
  if (off < -n / 2) off += n;
  return off;
}

export default function Testimonials() {
  const [list, setList] = useState(getTestimonials);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = list.length;

  // Re-read the store when a new story is submitted.
  useEffect(() => subscribe(() => setList(getTestimonials())), []);

  // Auto-rotate through everyone, then loop. Restarts 6s after any change.
  useEffect(() => {
    if (paused || n === 0) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), 6000);
    return () => clearTimeout(t);
  }, [active, paused, n]);

  const current = list[Math.min(active, n - 1)] || list[0];
  if (!current) return null;

  return (
    <div
      className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-slate-100 dark:bg-brand-900 dark:ring-white/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid md:grid-cols-[330px_1fr]">
        {/* Circular people wheel — avatars sit exactly on the guide arc */}
        <div className="relative mx-auto h-[400px] w-full max-w-[330px] overflow-hidden border-b border-slate-100 md:border-b-0 md:border-r dark:border-white/10">
          {/* faint guide arc (passes through every avatar centre) */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full text-slate-200 dark:text-white/10" viewBox="0 0 330 400" preserveAspectRatio="none" fill="none">
            <path d="M40 56 Q132 200 40 344" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {list.map((t, i) => {
            const off = offsetOf(i, active, n);
            const abs = Math.abs(off);
            const visible = abs <= 2;
            const isActive = off === 0;
            const arcX = 40 + 46 * (1 - (off * off) / 4);  // avatar centre x on the arc
            const avatarR = isActive ? 32 : 24;             // half of h-16 / h-12
            const tx = arcX - 8 - avatarR;                  // px-2 padding = 8
            const style = {
              transform: `translate(${tx.toFixed(1)}px, calc(-50% + ${off * 72}px))`,
              opacity: visible ? (1 - abs * 0.33).toFixed(2) : 0,
              zIndex: 30 - abs,
              pointerEvents: visible ? "auto" : "none",
            };
            return (
              <button
                key={t.id ?? t.name}
                onClick={() => setActive(i)}
                style={style}
                className={`absolute left-0 top-1/2 flex w-[250px] items-center gap-3 rounded-2xl px-2 py-2 text-left transition-all duration-500 ease-apple ${
                  isActive ? "bg-brand-50 ring-1 ring-brand-200 dark:bg-white/10 dark:ring-white/15" : ""
                }`}
              >
                <Avatar person={t} active={isActive} big={isActive} />
                <span className="min-w-0">
                  <span className={`block truncate font-bold ${isActive ? "text-base text-brand-dark dark:text-white" : "text-sm text-slate-600 dark:text-slate-300"}`}>{t.name}</span>
                  <span className="block truncate text-xs text-slate-400">{t.role}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active testimonial — text only */}
        <div className="relative flex flex-col justify-center p-8 sm:p-12">
          <span className="font-serif text-7xl leading-none text-brand-200 dark:text-blue-400/40">&ldquo;</span>
          <p key={active} className="anim-rise -mt-2 text-lg italic leading-relaxed text-slate-600 dark:text-slate-300">
            {current.text}
          </p>
        </div>
      </div>
    </div>
  );
}
