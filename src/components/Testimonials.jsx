import { useEffect, useState } from "react";
import { IconUser } from "./icons.jsx";
import { getTestimonials, subscribe } from "../data/testimonials.js";

// Satellite positions (percent of the box) for the surrounding people.
const SAT = {
  "-2": [16.7, 18.4], // top-left
  "2": [83.3, 18.4],  // top-right
  "-1": [16.7, 78.9], // bottom-left
  "1": [83.3, 78.9],  // bottom-right
};

function Avatar({ person, big }) {
  const size = big ? "h-20 w-20" : "h-12 w-12";
  const ring = big ? "ring-2 ring-brand-400" : "ring-1 ring-slate-200 dark:ring-white/10";
  if (person.img) {
    return <img src={person.img} alt={person.name} className={`${size} rounded-full object-cover shadow-sm ${ring}`} />;
  }
  return (
    <span className={`grid ${size} place-items-center rounded-full bg-slate-200 text-slate-500 shadow-sm dark:bg-white/10 dark:text-slate-300 ${ring}`}>
      <IconUser className={big ? "h-9 w-9" : "h-6 w-6"} />
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
        {/* People orbit */}
        <div className="relative mx-auto h-[380px] w-full max-w-[360px] border-b border-slate-100 md:border-b-0 md:border-r dark:border-white/10">
          {/* Slow glowing dot orbiting the group (no lines) */}
          <svg viewBox="0 0 360 380" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
            <path id="orbit" d="M180 44 A140 150 0 1 0 180 344 A140 150 0 1 0 180 44" fill="none" />
            <g>
              <animateMotion dur="16s" repeatCount="indefinite">
                <mpath href="#orbit" />
              </animateMotion>
              <circle r="11" fill="rgba(59,130,246,0.22)">
                <animate attributeName="r" values="7;13;7" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle r="5" fill="#3b82f6" style={{ filter: "drop-shadow(0 0 7px rgba(59,130,246,0.95))" }} />
            </g>
          </svg>

          {/* Surrounding people */}
          {list.map((t, i) => {
            const off = offsetOf(i, active, n);
            const abs = Math.abs(off);
            const visible = abs >= 1 && abs <= 2;
            const [left, top] = visible ? SAT[String(off)] : [50, 50];
            const style = {
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
              opacity: visible ? 1 : 0,
              pointerEvents: visible ? "auto" : "none",
            };
            return (
              <button
                key={t.id ?? t.name}
                onClick={() => setActive(i)}
                style={style}
                className="absolute rounded-full transition-all duration-700 ease-apple hover:scale-110"
              >
                <Avatar person={t} />
              </button>
            );
          })}

          {/* Active person — profile + name in the centre */}
          <div key={active} className="anim-pop pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center">
            <span className="star-pulse inline-block rounded-full">
              <Avatar person={current} big />
            </span>
            <p className="mt-3 text-center text-base font-extrabold text-brand-dark dark:text-white">{current.name}</p>
            <p className="text-center text-xs font-medium text-brand-600 dark:text-blue-300">{current.role}</p>
          </div>
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
