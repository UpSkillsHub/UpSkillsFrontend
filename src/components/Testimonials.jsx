import { useEffect, useState } from "react";
import { IconUser } from "./icons.jsx";

// Trainee success stories. Add an `img` path (e.g. "/images/testimonials/ardent.jpg")
// later and it replaces the placeholder icon automatically.
const testimonials = [
  {
    name: "Ardent Matabaro",
    role: "Frontend Developer",
    img: null,
    text: "I joined Up Skills Hub with only basic HTML knowledge and left building full, responsive web apps in React. The real projects and my mentor's feedback made everything click — within weeks of finishing I was hired as a junior frontend developer.",
  },
  {
    name: "DonBéni Effata",
    role: "Backend Developer",
    img: null,
    text: "The backend track was hands-on from day one. I built real APIs, worked with databases, and learned how production systems actually fit together. The Talent Marketplace even connected me to my first paid client task.",
  },
  {
    name: "Jean-Luc Matabaro",
    role: "Cybersecurity Analyst",
    img: null,
    text: "The Cybersecurity & Ethical Hacking program was intense and practical. I learned to find vulnerabilities and defend real systems, not just theory. Today I work as a security analyst, and it all started right here.",
  },
  {
    name: "Joseph Courbon",
    role: "Data Analyst",
    img: null,
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
    text: "What sets Up Skills Hub apart is that you actually build things people use. The mentorship, the real tasks, the exposure on their website — it all made me job-ready. I went from student to full-stack developer faster than I imagined.",
  },
  {
    name: "Ntare Bright",
    role: "Digital Marketing Specialist",
    img: null,
    text: "The Digital Marketing & SEO track was practical from the first lesson. I built real WordPress sites, ran real campaigns, and learned to read analytics properly. I now lead marketing for a growing local business.",
  },
  {
    name: "Aurora Dragnir",
    role: "UI/UX & Graphic Designer",
    img: null,
    text: "I came in loving design but lacking direction. The graphic design program and real client briefs sharpened both my skills and my portfolio. The Talent Marketplace helped me land freelance work while I was still learning.",
  },
  {
    name: "Uwase Leiss",
    role: "Project Coordinator",
    img: null,
    text: "The Business and Project Management course taught me how real teams plan and deliver. The internship put me in charge of actual tasks and deadlines — exactly the experience that got me my current project coordinator role.",
  },
  {
    name: "Victor Jacker",
    role: "IT Support Specialist",
    img: null,
    text: "Up Skills Hub gave me both the technical skills and the professional habits employers look for. From Microsoft Office mastery to real IT support tasks, I walked into my first interview genuinely prepared and confident.",
  },
];

function Avatar({ person, active }) {
  const ring = active ? "ring-2 ring-brand-400" : "";
  if (person.img) {
    return <img src={person.img} alt={person.name} className={`h-11 w-11 shrink-0 rounded-full object-cover ${ring}`} />;
  }
  return (
    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-200 text-slate-500 dark:bg-white/10 dark:text-slate-300 ${ring}`}>
      <IconUser className="h-6 w-6" />
    </span>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance through everyone, then loop. Restarts 6s after any change.
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % testimonials.length), 6000);
    return () => clearTimeout(t);
  }, [active, paused]);

  const current = testimonials[active];

  return (
    <div
      className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-slate-100 dark:bg-brand-900 dark:ring-white/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid md:grid-cols-[290px_1fr]">
        {/* People list */}
        <div className="border-b border-slate-100 p-4 md:border-b-0 md:border-r dark:border-white/10">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition ${
                i === active
                  ? "bg-brand-50 ring-1 ring-brand-200 dark:bg-white/10 dark:ring-white/15"
                  : "hover:bg-slate-50 dark:hover:bg-white/5"
              }`}
            >
              <Avatar person={t} active={i === active} />
              <span className="min-w-0">
                <span className={`block truncate text-sm font-bold ${i === active ? "text-brand-dark dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>{t.name}</span>
                <span className="block truncate text-xs text-slate-400">{t.role}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Active testimonial */}
        <div className="relative flex flex-col justify-center p-8 sm:p-10">
          <span className="font-serif text-6xl leading-none text-brand-200 dark:text-blue-400/40">&ldquo;</span>
          <div key={active} className="anim-rise">
            <p className="mt-1 text-lg italic leading-relaxed text-slate-600 dark:text-slate-300">{current.text}</p>
            <div className="mt-6 flex items-center gap-3">
              <Avatar person={current} active />
              <div>
                <p className="font-bold text-brand-dark dark:text-white">{current.name}</p>
                <p className="text-sm font-medium text-brand-600 dark:text-blue-300">{current.role}</p>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-8 flex flex-wrap gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show story ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-brand-600" : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
