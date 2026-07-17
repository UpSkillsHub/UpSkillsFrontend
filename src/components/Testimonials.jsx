import { useEffect, useState } from "react";
import { IconUser } from "./icons.jsx";

// Trainee success stories. Drop a photo in /public/images/testimonials/ and set
// `img` to show it; leave null to fall back to the placeholder icon.
const testimonials = [
  {
    name: "Ardent Matabaro",
    role: "Frontend Developer",
    img: "/images/testimonials/ardent.jpg",
    text: "I joined Up Skills Hub with only basic HTML knowledge and left building full, responsive web apps in React. The real projects and my mentor's feedback made everything click, and within weeks of finishing I was hired as a junior frontend developer.",
  },
  {
    name: "DonBéni Effata",
    role: "Backend Developer",
    img: "/images/testimonials/donbeni.jpg",
    text: "The backend track was hands-on from day one. I built real APIs, worked with databases, and learned how production systems actually fit together. The Talent Marketplace even connected me to my first paid client task.",
  },
  {
    name: "Jean-Luc Matabaro",
    role: "Cybersecurity Analyst",
    img: "/images/testimonials/jeanluc.jpg",
    text: "The Cybersecurity & Ethical Hacking program was intense and practical. I learned to find vulnerabilities and defend real systems, not just theory. Today I work as a security analyst, and it all started right here.",
  },
  {
    name: "Joseph Courbon",
    role: "Data Analyst",
    img: "/images/testimonials/joseph.jpg",
    text: "Power BI and data analysis felt intimidating until Up Skills Hub broke it down into real dashboards and real decisions. I now turn messy data into insights every day at work, and I owe that confidence to my trainers.",
  },
  {
    name: "Rodruigue Shabani",
    role: "Mobile Developer",
    img: null,
    text: "I always wanted to build apps but never knew where to start. The mobile development track gave me real projects to ship, and the internship taught me to work to deadlines. I published my first app before I even graduated.",
  },
  {
    name: "Guillain Bengehya",
    role: "Full-Stack Developer",
    img: null,
    text: "What sets Up Skills Hub apart is that you actually build things people use. The mentorship, the real tasks, the exposure on their website, it all made me job-ready. I went from student to full-stack developer faster than I imagined.",
  },
  {
    name: "Ntare Bright",
    role: "Digital Marketing Specialist",
    img: "/images/testimonials/ntare.jpg",
    text: "The Digital Marketing & SEO track was practical from the first lesson. I built real WordPress sites, ran real campaigns, and learned to read analytics properly. I now lead marketing for a growing local business.",
  },
  {
    name: "Aurora Dragnir",
    role: "UI/UX & Graphic Designer",
    img: "/images/testimonials/aurora.jpg",
    text: "I came in loving design but lacking direction. The graphic design program and real client briefs sharpened both my skills and my portfolio. The Talent Marketplace helped me land freelance work while I was still learning.",
  },
  {
    name: "Uwase Leiss",
    role: "Project Coordinator",
    img: null,
    text: "The Business and Project Management course taught me how real teams plan and deliver. The internship put me in charge of actual tasks and deadlines, exactly the experience that got me my current project coordinator role.",
  },
  {
    name: "Victor Jacker",
    role: "IT Support Specialist",
    img: null,
    text: "Up Skills Hub gave me both the technical skills and the professional habits employers look for. From Microsoft Office mastery to real IT support tasks, I walked into my first interview genuinely prepared and confident.",
  },
];

function Avatar({ person, active, big }) {
  const size = big ? "h-16 w-16" : "h-11 w-11";
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
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;

  // Auto-rotate through everyone, then loop. Restarts 6s after any change.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % n), 6000);
    return () => clearTimeout(t);
  }, [active, paused, n]);

  const current = testimonials[active];

  return (
    <div
      className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-slate-100 dark:bg-brand-900 dark:ring-white/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid md:grid-cols-[330px_1fr]">
        {/* Circular people wheel — items sit on a curved arc, active centred */}
        <div className="relative h-[400px] overflow-hidden border-b border-slate-100 md:border-b-0 md:border-r dark:border-white/10">
          {/* faint guide arc */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full text-slate-200 dark:text-white/10" viewBox="0 0 330 400" preserveAspectRatio="none" fill="none">
            <path d="M46 44 Q150 200 46 356" stroke="currentColor" strokeWidth="1.5" />
          </svg>

          {testimonials.map((t, i) => {
            const off = offsetOf(i, active, n);
            const abs = Math.abs(off);
            const visible = abs <= 2;
            const bulge = 52 * (1 - (off * off) / 4); // rightward bulge, max at centre
            const style = {
              transform: `translateY(calc(-50% + ${off * 78}px)) translateX(${bulge.toFixed(1)}px) scale(${(1 - abs * 0.14).toFixed(3)})`,
              opacity: visible ? (1 - abs * 0.33).toFixed(2) : 0,
              zIndex: 30 - abs,
              pointerEvents: visible ? "auto" : "none",
            };
            return (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                style={style}
                className={`absolute left-3 top-1/2 flex w-[280px] items-center gap-3 rounded-2xl px-3 py-2 text-left transition-all duration-500 ease-apple ${
                  off === 0 ? "bg-brand-50 ring-1 ring-brand-200 dark:bg-white/10 dark:ring-white/15" : ""
                }`}
              >
                <Avatar person={t} active={off === 0} big={off === 0} />
                <span className="min-w-0">
                  <span className={`block truncate font-bold ${off === 0 ? "text-base text-brand-dark dark:text-white" : "text-sm text-slate-600 dark:text-slate-300"}`}>{t.name}</span>
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
