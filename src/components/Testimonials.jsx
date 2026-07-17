import { useEffect, useState } from "react";
import { IconUser } from "./icons.jsx";
import { getTestimonials, subscribe } from "../data/testimonials.js";

// Five star (pentagram) points — avatar centres in a 330 x 360 space.
const POINTS = [
  [165, 55],   // 0 top          (active)
  [289, 145],  // 1 upper-right  (+1)
  [241, 290],  // 2 lower-right  (+2)
  [89, 290],   // 3 lower-left   (-2)
  [41, 145],   // 4 upper-left   (-1)
];
const POINT_FOR_OFF = { "0": 0, "1": 1, "2": 2, "-2": 3, "-1": 4 };
// Pentagram path: connect every other point (0→2→4→1→3→0).
const STAR_D = "M165 55 L241 290 L41 145 L289 145 L89 290 Z";

function Avatar({ person, active, big }) {
  const size = big ? "h-16 w-16" : "h-12 w-12";
  const ring = active ? "ring-2 ring-brand-400" : "ring-1 ring-slate-200 dark:ring-white/10";
  if (person.img) {
    return <img src={person.img} alt={person.name} className={`${size} rounded-full object-cover shadow-sm ${ring}`} />;
  }
  return (
    <span className={`grid ${size} place-items-center rounded-full bg-slate-200 text-slate-500 shadow-sm dark:bg-white/10 dark:text-slate-300 ${ring}`}>
      <IconUser className={big ? "h-8 w-8" : "h-6 w-6"} />
    </span>
  );
}

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

  useEffect(() => subscribe(() => setList(getTestimonials())), []);

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
      <div className="grid md:grid-cols-[360px_1fr]">
        {/* Star of people */}
        <div className="relative mx-auto h-[380px] w-full max-w-[360px] border-b border-slate-100 md:border-b-0 md:border-r dark:border-white/10">
          {/* Animated star lines + travelling glow dot */}
          <svg viewBox="0 0 330 360" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
            <defs>
              <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8aa0c9" />
                <stop offset="0.5" stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8aa0c9" />
              </linearGradient>
            </defs>
            <path id="starPath" d={STAR_D} stroke="url(#starGrad)" strokeWidth="2" strokeLinejoin="round" className="star-line" />
            <circle r="4.5" fill="#3b82f6" style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.9))" }}>
              <animateMotion dur="7s" repeatCount="indefinite">
                <mpath href="#starPath" />
              </animateMotion>
            </circle>
          </svg>

          {/* Active name in the centre of the star */}
          <div key={active} className="anim-rise pointer-events-none absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/70 px-2 py-1 text-center backdrop-blur dark:bg-brand-900/70">
            <p className="truncate text-sm font-extrabold text-brand-dark dark:text-white">{current.name}</p>
            <p className="truncate text-xs font-medium text-brand-600 dark:text-blue-300">{current.role}</p>
          </div>

          {/* Avatars sitting on the star points */}
          {list.map((t, i) => {
            const off = offsetOf(i, active, n);
            const visible = Math.abs(off) <= 2;
            const isActive = off === 0;
            const [x, y] = visible ? POINTS[POINT_FOR_OFF[String(off)]] : [165, 180];
            const style = {
              left: `${((x / 330) * 100).toFixed(2)}%`,
              top: `${((y / 360) * 100).toFixed(2)}%`,
              transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.9})`,
              opacity: visible ? 1 : 0,
              zIndex: isActive ? 20 : 12,
              pointerEvents: visible ? "auto" : "none",
            };
            return (
              <button
                key={t.id ?? t.name}
                onClick={() => setActive(i)}
                style={style}
                className={`absolute rounded-full transition-all duration-700 ease-apple ${isActive ? "star-pulse" : ""}`}
              >
                <Avatar person={t} active={isActive} big={isActive} />
              </button>
            );
          })}
        </div>

        {/* Active testimonial — text vertically centred */}
        <div className="relative flex min-h-[380px] flex-col justify-center p-8 sm:p-12">
          <span className="pointer-events-none absolute left-8 top-8 font-serif text-7xl leading-none text-brand-200 dark:text-blue-400/40 sm:left-12">&ldquo;</span>
          <p key={active} className="anim-rise text-lg italic leading-relaxed text-slate-600 dark:text-slate-300">
            {current.text}
          </p>
        </div>
      </div>
    </div>
  );
}
