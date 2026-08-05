import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import ScrollScale from "../components/ScrollScale.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import {
  IconCode,
  IconPalette,
  IconBriefcase,
  IconMegaphone,
  IconClipboard,
  IconGrad,
  IconCheck,
} from "../components/icons.jsx";
import {
  courses,
  internshipPrograms,
  whoCanApply,
  eligibility,
  courseSchedule,
  REGISTRATION_FEE,
  ONLINE_MONTHLY_FEE,
} from "../data/programs.js";

const rwf = (n) => `${n.toLocaleString("en-US")} RWF`;

/* Small stroke icons local to this page (same style as components/icons.jsx) */
const Svg = ({ children, className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);
const IconShield = (p) => (
  <Svg {...p}><path d="M12 3 5 6v5c0 4.6 3 8.2 7 9.6 4-1.4 7-5 7-9.6V6l-7-3Z" /><path d="m9.2 12 2 2 3.8-4" /></Svg>
);
const IconChart = (p) => (
  <Svg {...p}><path d="M4 20V6M4 20h16" /><rect x="7.5" y="12" width="3" height="5" rx=".6" /><rect x="12.2" y="8.5" width="3" height="8.5" rx=".6" /><rect x="16.9" y="10.5" width="3" height="6.5" rx=".6" /></Svg>
);
const IconCamera = (p) => (
  <Svg {...p}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="m8 7 1.5-2.5h5L16 7" /><circle cx="12" cy="13.5" r="3.4" /></Svg>
);
const IconClock = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></Svg>
);
const IconGlobe = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.6 2.5 3.9 5.5 3.9 9S14.6 18.5 12 21c-2.6-2.5-3.9-5.5-3.9-9S9.4 5.5 12 3Z" /></Svg>
);
const IconCertificate = (p) => (
  <Svg {...p}><circle cx="12" cy="9.5" r="4.5" /><path d="m9.5 13 -1.5 7 4-2.4 4 2.4-1.5-7" /></Svg>
);
const IconBook = (p) => (
  <Svg {...p}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" /></Svg>
);

/* Counts from 0 up to `end` once the hero is on screen */
function CountUp({ end, duration = 1400, format = (v) => v, suffix = "" }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(end * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return (
    <span ref={ref}>
      {format(value)}
      {suffix}
    </span>
  );
}

/* Deterministic particle field so the render is stable */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  size: 3 + ((i * 7) % 6),
  duration: 7 + ((i * 3) % 8),
  delay: (i * 1.7) % 9,
  opacity: 0.35 + ((i * 11) % 40) / 100,
}));

const categoryIcons = {
  "IT & Security": IconShield,
  "Software Development": IconCode,
  "Design": IconPalette,
  "AI & Data": IconChart,
  "Marketing": IconMegaphone,
  "Media": IconCamera,
  "Office Skills": IconClipboard,
  "Business": IconBriefcase,
};

function CourseCard({ course }) {
  const Icon = categoryIcons[course.category] || IconCode;
  return (
    <div className="card card-hover course-card group relative flex h-full flex-col overflow-hidden">
      {/* Accent line that lights up on hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-300 to-brand-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* Light sheen sweeps across the card on hover */}
      <div className="service-sheen pointer-events-none absolute inset-0 z-10" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:shadow-glow dark:text-blue-300">
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20">
            Online / On-site
          </span>
        </div>

        <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-brand-400 dark:text-blue-400/80">
          {course.category}
        </p>
        <h3 className="mt-1 text-lg font-bold leading-snug text-slate-800 transition-colors duration-300 group-hover:text-brand-600 dark:text-white">
          {course.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {course.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          <IconClock className="h-4 w-4 text-brand-500 dark:text-blue-400" />
          {course.durationMonths} months
        </div>

        <div className="mt-5 flex-1" />

        {/* Fees */}
        <div className="rounded-xl bg-brand-50/70 p-4 ring-1 ring-brand-100/70 dark:bg-white/5 dark:ring-white/10">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Program fee</span>
            <span className="text-lg font-extrabold text-brand-600 dark:text-blue-400">
              {rwf(course.monthlyFee)}
              <span className="text-xs font-semibold text-slate-400"> /month</span>
            </span>
          </div>
          <div className="mt-1.5 flex items-baseline justify-between border-t border-brand-100/70 pt-1.5 dark:border-white/10">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Registration</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {rwf(REGISTRATION_FEE)} <span className="font-medium text-slate-400">one-time</span>
            </span>
          </div>
        </div>

        <Link
          to={`/courses/${course.slug}`}
          className="btn-cta group/btn relative mt-5 flex w-full items-center justify-between rounded-full p-1.5 pl-6 text-sm font-bold text-white shadow-glow transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.97]"
        >
          <span className="tracking-wide transition-transform duration-300 ease-apple group-hover/btn:translate-x-1.5">
            View Course Details
          </span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-brand-700 shadow-soft transition-all duration-500 ease-apple group-hover/btn:-rotate-45 group-hover/btn:bg-blue-100 group-hover/btn:shadow-glow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}

/* ================= Course Details modal (doc section 4) ================= */
function CourseDetailsModal({ course, onClose }) {
  const Icon = categoryIcons[course.category] || IconCode;

  // Lock page scroll and close on Escape while the modal is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Build and download a plain-text course outline.
  const downloadOutline = () => {
    const L = [];
    L.push("UP SKILLS HUB - COURSE OUTLINE");
    L.push("=".repeat(40));
    L.push("");
    L.push(`Course: ${course.name}`);
    L.push(`Category: ${course.category}`);
    L.push(`Duration: ${course.durationMonths} months`);
    L.push("");
    L.push("COURSE OVERVIEW");
    L.push(course.description);
    L.push("");
    L.push("SKILLS YOU WILL LEARN");
    course.skills.forEach((s) => L.push(`  - ${s}`));
    L.push("");
    L.push("COURSE SCHEDULE");
    courseSchedule.forEach((s) => L.push(`  - ${s}`));
    L.push("");
    L.push("REQUIREMENTS");
    course.requirements.forEach((s) => L.push(`  - ${s}`));
    L.push("");
    L.push("FEES");
    L.push(`  - Registration fee (one-time): ${rwf(REGISTRATION_FEE)}`);
    L.push(`  - Program fee (on-site): ${rwf(course.monthlyFee)} per month`);
    L.push(`  - Online / self-coaching: ${rwf(ONLINE_MONTHLY_FEE)} per month`);
    L.push("");
    L.push("Upon successful completion, trainees receive a recognized certificate.");
    L.push("");
    L.push("Contact: upskillshub.info@gmail.com | +250 781 796 283");
    L.push("KG 173 Street, Remera, Kigali, Rwanda | www.upskillshub.com");

    const blob = new Blob([L.join("\n")], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${course.slug}-course-outline.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const SectionLabel = ({ children }) => (
    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-500 dark:text-blue-300">{children}</p>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${course.name} details`}
    >
      <div
        className="animate-scaleIn relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-lift dark:bg-[#0f1830]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-brand-800 via-brand-600 to-brand-500 px-7 py-6">
          <div className="anim-drift pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-400/25 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 animate-float place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200/90">{course.category}</p>
                <h2 className="mt-0.5 text-xl font-extrabold leading-snug !text-white sm:text-2xl">{course.name}</h2>
              </div>
            </div>
            {/* Back / close */}
            <button
              onClick={onClose}
              aria-label="Go back"
              className="x-live grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition-all duration-300 hover:rotate-90 hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 space-y-7 overflow-y-auto px-7 py-6">
          {/* Overview */}
          <div>
            <SectionLabel>Course Overview</SectionLabel>
            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{course.description}</p>
          </div>

          {/* Skills */}
          <div>
            <SectionLabel>Skills You Will Learn</SectionLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {course.skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-2 rounded-full bg-brand-50/80 px-3.5 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-100 dark:bg-white/5 dark:text-blue-200 dark:ring-white/10">
                  <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Duration + Schedule */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-brand-50/60 p-5 ring-1 ring-brand-100/70 dark:bg-white/5 dark:ring-white/10">
              <SectionLabel>Duration</SectionLabel>
              <p className="mt-2 flex items-center gap-2.5 text-lg font-extrabold text-brand-dark dark:text-white">
                <IconClock className="h-5 w-5 text-brand-500 dark:text-blue-400" />
                {course.durationMonths} months
              </p>
            </div>
            <div className="rounded-2xl bg-brand-50/60 p-5 ring-1 ring-brand-100/70 dark:bg-white/5 dark:ring-white/10">
              <SectionLabel>Course Schedule</SectionLabel>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
                {courseSchedule.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Online / On-site options */}
          <div>
            <SectionLabel>Online / On-site Options</SectionLabel>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl p-4 ring-1 ring-brand-100 dark:ring-white/10">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-white/10 dark:text-blue-300">
                  <IconMapPinSmall />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">On-site in Kigali</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {rwf(course.monthlyFee)} per month, hands-on classes at our campus.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl p-4 ring-1 ring-brand-100 dark:ring-white/10">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-white/10 dark:text-blue-300">
                  <IconGlobe className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">Online / Self-coaching</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {rwf(ONLINE_MONTHLY_FEE)} per month, learn from anywhere with a coach.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements + Fee */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <SectionLabel>Requirements</SectionLabel>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {course.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <IconCheck className="h-3 w-3" />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-blue-50 p-5 ring-1 ring-brand-100 dark:from-white/5 dark:to-white/5 dark:ring-white/10">
              <SectionLabel>Fee</SectionLabel>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Registration (one-time)</span>
                  <span className="font-bold text-slate-800 dark:text-white">{rwf(REGISTRATION_FEE)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-brand-100/70 pt-2 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400">Program fee</span>
                  <span className="text-base font-extrabold text-brand-600 dark:text-blue-400">
                    {rwf(course.monthlyFee)}<span className="text-xs font-semibold text-slate-400"> /month</span>
                  </span>
                </div>
                <p className="border-t border-brand-100/70 pt-2 text-xs leading-relaxed text-slate-500 dark:border-white/10 dark:text-slate-400">
                  Recognized certificate upon successful completion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex shrink-0 flex-col gap-3 border-t border-slate-100 px-7 py-5 sm:flex-row dark:border-white/10">
          <Link
            to="/register"
            className="btn-cta group/btn relative flex flex-1 items-center justify-between rounded-full p-1.5 pl-6 text-sm font-bold text-white shadow-glow transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.97]"
          >
            <span className="tracking-wide transition-transform duration-300 ease-apple group-hover/btn:translate-x-1.5">Apply Now</span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-brand-700 shadow-soft transition-all duration-500 ease-apple group-hover/btn:-rotate-45 group-hover/btn:bg-blue-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
          <button
            onClick={downloadOutline}
            className="group/dl flex flex-1 items-center justify-center gap-2.5 rounded-full border-2 border-brand-200 px-6 py-3 text-sm font-bold text-brand-600 transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50 dark:border-white/20 dark:text-blue-300 dark:hover:bg-white/5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover/dl:translate-y-0.5">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            Download Course Outline
          </button>
        </div>
      </div>
    </div>
  );
}

const IconMapPinSmall = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 21s-7-5.3-7-11a7 7 0 1 1 14 0c0 5.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.6" />
  </svg>
);

export default function Courses() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const { slug } = useParams();
  const navigate = useNavigate();
  const activeCourse = slug ? courses.find((c) => c.slug === slug) : null;

  const categories = useMemo(
    () => ["All", ...new Set(courses.map((c) => c.category))],
    [],
  );

  const filtered = courses.filter(
    (c) =>
      (category === "All" || c.category === category) &&
      c.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      {/* Course details modal: closing returns to the course list */}
      {activeCourse && (
        <CourseDetailsModal course={activeCourse} onClose={() => navigate("/courses")} />
      )}

      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden bg-brand-900">
        {/* Background slideshow: course1 and course2 crossfade forever, each slowly zooming */}
        <div className="absolute inset-0">
          {["/images/hero/course1.jpg", "/images/hero/course2.jpg"].map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
              className="hero-xfade absolute inset-0 h-full w-full object-cover"
              style={{ animationDelay: i === 1 ? "-8s, -11s" : "0s, 0s" }}
            />
          ))}
          {/* Navy overlay keeps the text readable and on-brand */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/95 via-brand-800/85 to-brand-600/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent" />
        </div>

        {/* Floating glow orbs */}
        <div className="anim-drift pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-400/25 blur-3xl" />
        <div className="anim-drift-b pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="anim-drift pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-300/10 blur-3xl" />

        {/* Rising light particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="hero-particle"
              style={{
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--po": p.opacity,
              }}
            />
          ))}
        </div>

        <div className="container-page relative pb-20 pt-10 text-center sm:pb-24 sm:pt-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-100 ring-1 ring-white/20 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Program Structure and Fees
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold !text-white sm:text-6xl">
              Learn a Skill That
              <span className="text-gradient-animated block">Builds Your Future</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100/90">
              Practical, career-focused training taught by industry practitioners. Study on-site in
              Kigali or online from anywhere, and graduate with a recognized certificate.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href="#catalog" className="btn-primary rounded-full !bg-white px-9 py-3 !text-brand-700 hover:!bg-blue-50">
                Browse Courses
              </a>
              <Link
                to="/register"
                className="btn-live rounded-full border-2 border-white/50 px-9 py-2.5 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Apply Now
              </Link>
            </div>
          </Reveal>

          {/* Stats with counting animation */}
          <Reveal delay={180}>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur sm:grid-cols-4">
              {[
                {
                  node: <CountUp end={courses.length} />,
                  label: "Professional Courses",
                },
                { node: "2 to 3", label: "Months per Course" },
                {
                  node: <CountUp end={REGISTRATION_FEE} format={(v) => v.toLocaleString("en-US")} suffix=" RWF" />,
                  label: "One-time Registration",
                },
                { node: <CountUp end={100} suffix="%" />, label: "Certificate on Completion" },
              ].map((s) => (
                <div key={s.label} className="bg-brand-800/50 px-4 py-6 backdrop-blur-sm">
                  <p className="text-xl font-extrabold text-white sm:text-2xl">{s.node}</p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-blue-200/80">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Scroll hint */}
          <a href="#catalog" aria-label="Scroll to courses" className="anim-hero-bounce mx-auto mt-10 grid h-10 w-10 place-items-center rounded-full border border-white/30 text-white/80">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
        </div>
      </section>

      {/* ================= Catalog ================= */}
      <section id="catalog" className="container-page py-16 sm:py-20">
        <Reveal effect="rich">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <SectionHeading align="left" eyebrow="Our Catalog" title="Our" accent="Courses" />
              <p className="mt-4 text-slate-500 dark:text-slate-400">
                Choose from {courses.length} hands-on programs designed for real jobs.
              </p>
            </div>
            <div className="relative w-full max-w-sm">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses…"
                className="input pl-9"
              />
            </div>
          </div>

          {/* Category filter */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  category === cat
                    ? "bg-brand-600 text-white shadow-glow"
                    : "bg-brand-50 text-slate-600 hover:bg-brand-100 hover:text-brand-700 dark:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map((c, i) => (
              <Reveal key={c.slug} effect="rich" delay={(i % 3) * 110}>
                <CourseCard course={c} />
              </Reveal>
            ))
          ) : (
            <p className="text-slate-500">No courses match your search.</p>
          )}
        </div>

        {/* Study options: three live, animated tiles */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {/* 1. Study your way: globe with an orbiting dot */}
          <Reveal effect="rich">
            <div className="group h-full rounded-3xl bg-gradient-to-br from-brand-200/80 via-slate-100 to-blue-200/70 p-px shadow-soft transition-all duration-500 ease-apple hover:-translate-y-2 hover:shadow-lift dark:from-white/15 dark:via-white/5 dark:to-blue-400/20">
              <div className="relative flex h-full flex-col items-center overflow-hidden rounded-[calc(1.5rem-1px)] bg-white/95 p-8 pt-10 text-center backdrop-blur dark:bg-[#111a2e]">
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-blue-100/70 blur-2xl transition-transform duration-700 group-hover:scale-150 dark:bg-blue-400/10" />
                {/* Icon stage: concentric rings + floating globe + orbiting dot */}
                <div className="relative h-24 w-24 animate-float">
                  <span className="absolute inset-0 rounded-full border border-brand-100 dark:border-white/10" />
                  <span className="absolute inset-3 rounded-full border border-brand-100/70 dark:border-white/5" />
                  <div className="absolute inset-5 grid place-items-center rounded-full bg-gradient-to-br from-brand-50 to-blue-100 text-brand-600 shadow-soft dark:text-blue-300">
                    <IconGlobe className="h-8 w-8" />
                  </div>
                  <div className="orbit-ring absolute inset-0">
                    <span className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-500 shadow-glow" />
                  </div>
                </div>
                <span className="mt-5 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-blue-300">
                  Flexible
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">Study Your Way</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  On-site in Kigali or fully online. Same course, your choice.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 2. Online and self-coaching: live typing dots + price focus */}
          <Reveal effect="rich" delay={110}>
            <div className="group h-full rounded-3xl bg-gradient-to-br from-blue-200/70 via-slate-100 to-brand-200/80 p-px shadow-soft transition-all duration-500 ease-apple hover:-translate-y-2 hover:shadow-lift dark:from-blue-400/20 dark:via-white/5 dark:to-white/15">
              <div className="relative flex h-full flex-col items-center overflow-hidden rounded-[calc(1.5rem-1px)] bg-white/95 p-8 pt-10 text-center backdrop-blur dark:bg-[#111a2e]">
                <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-brand-100/70 blur-2xl transition-transform duration-700 group-hover:scale-150 dark:bg-blue-400/10" />
                <div className="relative h-24 w-24 animate-float" style={{ animationDelay: "0.6s" }}>
                  <span className="absolute inset-0 rounded-full border border-brand-100 dark:border-white/10" />
                  <span className="absolute inset-3 rounded-full border border-brand-100/70 dark:border-white/5" />
                  <div className="absolute inset-5 grid place-items-center rounded-full bg-gradient-to-br from-brand-50 to-blue-100 shadow-soft">
                    <span className="flex items-end gap-1.5">
                      <span className="typing-dot h-2.5 w-2.5 rounded-full bg-brand-500" style={{ animationDelay: "0s" }} />
                      <span className="typing-dot h-2.5 w-2.5 rounded-full bg-brand-500" style={{ animationDelay: "0.18s" }} />
                      <span className="typing-dot h-2.5 w-2.5 rounded-full bg-brand-500" style={{ animationDelay: "0.36s" }} />
                    </span>
                  </div>
                </div>
                <span className="mt-5 rounded-full bg-brand-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-blue-300">
                  Flat Rate
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">Online and Self-Coaching</h3>
                <p className="mt-2 text-3xl font-extrabold text-brand-600 dark:text-blue-400">
                  {rwf(ONLINE_MONTHLY_FEE)}
                  <span className="text-sm font-semibold text-slate-400"> /month</span>
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Any course, from anywhere.</p>
              </div>
            </div>
          </Reveal>

          {/* 3. Certificate: pulsing seal with a marching dashed ring */}
          <Reveal effect="rich" delay={220}>
            <div className="group h-full rounded-3xl bg-gradient-to-br from-emerald-200/60 via-slate-100 to-brand-200/80 p-px shadow-soft transition-all duration-500 ease-apple hover:-translate-y-2 hover:shadow-lift dark:from-emerald-400/20 dark:via-white/5 dark:to-white/15">
              <div className="relative flex h-full flex-col items-center overflow-hidden rounded-[calc(1.5rem-1px)] bg-white/95 p-8 pt-10 text-center backdrop-blur dark:bg-[#111a2e]">
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-emerald-100/70 blur-2xl transition-transform duration-700 group-hover:scale-150 dark:bg-emerald-400/10" />
                <div className="relative h-24 w-24 animate-float" style={{ animationDelay: "1.2s" }}>
                  <div className="seal-pulse absolute inset-5 grid place-items-center rounded-full bg-gradient-to-br from-brand-50 to-emerald-50 text-brand-600 shadow-soft dark:text-blue-300">
                    <IconCertificate className="h-8 w-8" />
                  </div>
                  <svg viewBox="0 0 96 96" fill="none" className="absolute inset-0 h-full w-full text-blue-400/70">
                    <circle cx="48" cy="48" r="45" stroke="currentColor" strokeWidth="1.6" className="ring-dash" />
                  </svg>
                  <span className="absolute inset-2.5 rounded-full border border-brand-100/70 dark:border-white/5" />
                </div>
                <span className="mt-5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                  Certified
                </span>
                <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-white">Recognized Certificate</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  Awarded to every trainee upon successful completion.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Internship ================= */}
      <section className="relative bg-brand-50/60 py-16 dark:bg-white/[0.03] sm:py-20">
        <div className="container-page">
          <Reveal effect="rich" className="mx-auto max-w-2xl text-center">
            <SectionHeading eyebrow="Academic Internship Program" title="Internship" accent="Program" />
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              A trusted, straightforward internship designed for IT students. Practice your coding,
              work on real projects, and receive expert mentorship from IT industry professionals.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            {internshipPrograms.map((p, i) => (
              <Reveal key={p.slug} effect="rich" delay={i * 140}>
                <div className="spin-border h-full shadow-lift transition-transform duration-500 ease-apple hover:-translate-y-2">
                  <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-brand-400 via-brand-500 to-brand-600 p-7">
                    {/* Ambience */}
                    <div className="anim-drift pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-300/25 blur-3xl" />
                    <div className="anim-drift-b pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
                    {/* Giant watermark icon */}
                    <div className="pointer-events-none absolute -bottom-8 -right-6 text-white/[0.04]">
                      {i === 0 ? <IconBook className="h-44 w-44" /> : <IconGrad className="h-44 w-44" />}
                    </div>

                    {/* Header */}
                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-200 ring-1 ring-white/15 backdrop-blur">
                          {i === 0 ? "Secondary School Track" : "University Track"}
                        </span>
                        <h3 className="mt-3 max-w-[15rem] text-lg font-bold leading-snug !text-white">{p.name}</h3>
                      </div>
                      <div className="grid h-12 w-12 shrink-0 animate-float place-items-center rounded-2xl bg-white/10 text-blue-200 ring-1 ring-white/15 backdrop-blur">
                        {i === 0 ? <IconBook className="h-6 w-6" /> : <IconGrad className="h-6 w-6" />}
                      </div>
                    </div>

                    {/* Fee timeline */}
                    <div className="relative mt-8 flex-1 pl-7">
                      <span className="draw-line absolute bottom-1 left-[7px] top-1 w-px bg-gradient-to-b from-blue-400/90 via-blue-300/40 to-transparent" />
                      {[
                        { label: "Duration", node: <span className="font-semibold text-white">{p.duration}</span> },
                        { label: "Registration fee", node: <span className="font-semibold text-white">{rwf(p.registrationFee)}</span> },
                        {
                          label: "Program fee",
                          free: true,
                          node: (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/30">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              </span>
                              FREE
                            </span>
                          ),
                        },
                      ].map((row, j) => (
                        <div
                          key={row.label}
                          className="stagger-item relative flex items-center justify-between gap-4 py-3"
                          style={{ transitionDelay: `${250 + j * 140}ms` }}
                        >
                          <span className={`absolute -left-7 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 ${row.free ? "border-emerald-300 bg-emerald-400/40" : "border-blue-200 bg-brand-500"}`}>
                            {row.free && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />}
                          </span>
                          <p className="text-sm text-blue-200/80">{row.label}</p>
                          {row.node}
                        </div>
                      ))}
                    </div>

                    {/* Price plate */}
                    <div className="stagger-item relative mt-5 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10 backdrop-blur" style={{ transitionDelay: "680ms" }}>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200/70">
                          Mentorship and certificate
                        </p>
                        <p className="mt-1 bg-gradient-to-r from-white to-blue-300 bg-clip-text text-2xl font-extrabold text-transparent">
                          {rwf(p.mentorshipCertificateFee)}
                        </p>
                      </div>
                      <span className="seal-pulse grid h-11 w-11 place-items-center rounded-full bg-white/10 text-blue-200 ring-1 ring-white/15">
                        <IconCertificate className="h-5 w-5" />
                      </span>
                    </div>

                    {/* Apply: inverted white pill */}
                    <Link
                      to="/register"
                      className="group/btn relative mt-6 flex w-full items-center justify-between rounded-full bg-white p-1.5 pl-6 text-sm font-bold text-brand-800 shadow-soft transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.97]"
                    >
                      <span className="tracking-wide transition-transform duration-300 ease-apple group-hover/btn:translate-x-1.5">
                        Apply for Internship
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-700 text-white transition-all duration-500 ease-apple group-hover/btn:-rotate-45 group-hover/btn:bg-brand-600 group-hover/btn:shadow-glow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Who can apply + Eligibility: one glass panel, stepper + pill wall */}
          <Reveal effect="rich" className="mx-auto mt-14 max-w-5xl">
            <div className="dots-panel relative overflow-hidden rounded-[2.5rem] border border-brand-100/80 bg-white/80 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
              <div className="anim-drift pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-400/10" />
              <div className="anim-drift-b pointer-events-none absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-400/10" />

              <div className="relative grid md:grid-cols-5">
                {/* Left: who can apply, as a drawing stepper */}
                <div className="p-8 sm:p-10 md:col-span-2">
                  <span className="badge">Open Admission</span>
                  <h3 className="mt-3 text-2xl font-extrabold">Who Can Apply?</h3>
                  <div className="relative mt-8 pl-9">
                    <span className="draw-line absolute bottom-4 left-[15px] top-2 w-px bg-gradient-to-b from-brand-400 via-brand-200 to-transparent dark:from-blue-400 dark:via-blue-400/30" />
                    {whoCanApply.map((w, j) => (
                      <div key={w} className="pop-item relative pb-8 last:pb-0" style={{ transitionDelay: `${350 + j * 200}ms` }}>
                        <span className="absolute -left-9 top-0 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-glow ring-4 ring-white dark:ring-brand-900">
                          {j === 0 ? <IconGrad className="h-4 w-4" /> : <IconBook className="h-4 w-4" />}
                        </span>
                        <p className="pt-1 text-base font-bold text-slate-800 dark:text-white">{w}</p>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                          {j === 0 ? "In IT-related fields and faculties" : "In IT trades and related subjects"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="pointer-events-none absolute inset-y-10 left-[40%] hidden w-px bg-gradient-to-b from-transparent via-brand-200 to-transparent md:block dark:via-white/15" />

                {/* Right: eligibility as a springy pill wall */}
                <div className="border-t border-brand-100/70 p-8 sm:p-10 md:col-span-3 md:border-t-0 dark:border-white/10">
                  <span className="badge">Fields of Study</span>
                  <h3 className="mt-3 text-2xl font-extrabold">Eligibility</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    This internship is designed for students studying:
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {eligibility.map((e, j) => {
                      const tints = [
                        "border-brand-200 bg-brand-50/80 text-brand-700 hover:bg-brand-100 dark:border-white/15 dark:bg-white/5 dark:text-blue-200",
                        "border-blue-200 bg-blue-50/80 text-blue-700 hover:bg-blue-100 dark:border-blue-400/25 dark:bg-blue-400/10 dark:text-blue-200",
                        "border-emerald-200 bg-emerald-50/80 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-200",
                      ];
                      return (
                        <span
                          key={e}
                          className={`pop-item inline-flex cursor-default items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-300 ease-apple hover:-translate-y-1 hover:shadow-soft ${tints[j % 3]}`}
                          style={{ transitionDelay: `${300 + j * 90}ms` }}
                        >
                          <IconCheck className="h-3.5 w-3.5" />
                          {e}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container-page py-14 sm:py-16">
        <Reveal effect="rich">
          <ScrollScale min={0.95}>
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 py-20 text-center shadow-lift sm:py-24">
              {/* Drifting photo bubbles: real moments inside the moving circles */}
              {[
                { src: "/images/cta/dwat1.jpg", cls: "anim-aurora -left-24 -top-20 h-[24rem] w-[24rem] opacity-40 ring-white/25", imgDelay: "0s", delay: "0s" },
                { src: "/images/cta/dwat2.jpg", cls: "anim-aurora-b -bottom-28 -right-20 h-[26rem] w-[26rem] opacity-40 ring-white/20", imgDelay: "-8s", delay: "0s" },
                { src: "/images/cta/dwat3.jpg", cls: "anim-aurora -bottom-16 left-1/4 h-60 w-60 opacity-35 ring-white/20", imgDelay: "-14s", delay: "4s" },
                { src: "/images/cta/dwat4.jpg", cls: "anim-aurora-b -top-24 left-[55%] h-64 w-64 opacity-35 ring-white/20", imgDelay: "-5s", delay: "2s" },
              ].map((b) => (
                <div key={b.src} className={`pointer-events-none absolute overflow-hidden rounded-full ring-2 ${b.cls}`} style={{ animationDelay: b.delay }}>
                  <img
                    src={b.src}
                    alt=""
                    aria-hidden="true"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                    className="anim-kenburns h-full w-full object-cover"
                    style={{ animationDelay: b.imgDelay }}
                  />
                  <div className="absolute inset-0 bg-brand-700/50" />
                </div>
              ))}
              <div className="orbit-ring pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full border-2 border-dashed border-blue-200/40" style={{ animationDuration: "18s" }} />
              {/* Small floating bubbles */}
              <span className="animate-float pointer-events-none absolute left-[12%] top-1/3 h-3 w-3 rounded-full bg-blue-200/60" />
              <span className="animate-float pointer-events-none absolute right-[15%] top-1/4 h-2 w-2 rounded-full bg-white/50" style={{ animationDelay: "1.5s" }} />
              <span className="animate-float pointer-events-none absolute bottom-1/4 left-[28%] h-2.5 w-2.5 rounded-full bg-blue-100/50" style={{ animationDelay: "3s" }} />
              <span className="animate-float pointer-events-none absolute bottom-1/3 right-[30%] h-2 w-2 rounded-full bg-white/40" style={{ animationDelay: "4.5s" }} />

              <div className="relative px-6">
                <span className="pop-item inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-100 ring-1 ring-white/20 backdrop-blur" style={{ transitionDelay: "200ms" }}>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Start Anytime
                </span>
                <h2 className="mt-6 text-4xl font-extrabold !text-white sm:text-5xl">
                  Don't Wait.
                  <span className="text-gradient-animated"> Apply Today!</span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl leading-relaxed text-blue-100/90">
                  Kickstart your journey with expert mentorship, real project experience, and
                  career growth. Gain real skills and build a brighter future.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/register"
                    className="group/btn flex items-center gap-3 rounded-full bg-white p-1.5 pl-8 text-sm font-bold text-brand-800 shadow-lift transition-all duration-300 ease-apple hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Apply Now
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-700 text-white transition-all duration-500 ease-apple group-hover/btn:-rotate-45 group-hover/btn:bg-brand-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    to="/contact"
                    className="btn-live rounded-full border-2 border-white/50 px-10 py-3 text-sm font-bold text-white backdrop-blur transition-all duration-300 ease-apple hover:-translate-y-1 hover:bg-white/10"
                  >
                    Talk to Us
                  </Link>
                </div>
              </div>
            </div>
          </ScrollScale>
        </Reveal>
      </section>
    </div>
  );
}
