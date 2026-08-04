import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import {
  IconCode,
  IconPalette,
  IconBriefcase,
  IconMegaphone,
  IconClipboard,
  IconGrad,
  IconCheck,
  IconUsers,
} from "../components/icons.jsx";
import {
  courses,
  internshipPrograms,
  whoCanApply,
  eligibility,
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
    <div className="card card-hover group relative flex h-full flex-col overflow-hidden">
      {/* Accent line that lights up on hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-300 to-brand-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-transform duration-500 group-hover:scale-110 dark:text-blue-300">
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

        <Link to={`/courses/${course.slug}`} className="btn-primary mt-5 w-full rounded-xl py-2.5 text-center">
          View Course Details
        </Link>
      </div>
    </div>
  );
}

export default function Courses() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

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
      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-600 to-brand-500">
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl" />

        <div className="container-page relative py-20 text-center sm:py-24">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-100 ring-1 ring-white/20 backdrop-blur">
              Program Structure and Fees
            </span>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold !text-white sm:text-5xl">
              Learn a Skill That Builds Your Future
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-blue-100/90">
              Practical, career-focused training taught by industry practitioners. Study on-site in
              Kigali or online from anywhere, and graduate with a recognized certificate.
            </p>
          </Reveal>

          {/* Stats */}
          <Reveal delay={120}>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur sm:grid-cols-4">
              {[
                { value: `${courses.length}`, label: "Professional Courses" },
                { value: "2 to 3", label: "Months per Course" },
                { value: rwf(REGISTRATION_FEE), label: "One-time Registration" },
                { value: "100%", label: "Certificate on Completion" },
              ].map((s) => (
                <div key={s.label} className="bg-brand-700/40 px-4 py-5">
                  <p className="text-xl font-extrabold text-white sm:text-2xl">{s.value}</p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-blue-200/80">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= Catalog ================= */}
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold">Our Courses</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
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
              <Reveal key={c.slug} delay={(i % 3) * 80}>
                <CourseCard course={c} />
              </Reveal>
            ))
          ) : (
            <p className="text-slate-500">No courses match your search.</p>
          )}
        </div>

        {/* Study options */}
        <Reveal className="mt-14">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: IconGlobe,
                title: "Study Your Way",
                text: "Every course is available both on-site at our Kigali campus and fully online.",
              },
              {
                icon: IconUsers,
                title: "Online and Self-Coaching",
                text: `Prefer to learn online or with a personal coach? The program fee is ${rwf(ONLINE_MONTHLY_FEE)} per month for any course.`,
              },
              {
                icon: IconCertificate,
                title: "Recognized Certificate",
                text: "Upon successful completion, every trainee receives a recognized certificate.",
              },
            ].map((f) => (
              <div key={f.title} className="card flex items-start gap-4 p-6">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:text-blue-300">
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================= Internship ================= */}
      <section className="relative bg-brand-50/60 py-16 dark:bg-white/[0.03] sm:py-20">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge">Academic Internship Program</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Internship Program</h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              A trusted, straightforward internship designed for IT students. Practice your coding,
              work on real projects, and receive expert mentorship from IT industry professionals.
            </p>
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            {internshipPrograms.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <div className="card card-hover flex h-full flex-col overflow-hidden">
                  <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-4 dark:border-white/10">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/25">
                      <IconGrad className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold leading-snug !text-white">{p.name}</h3>
                  </div>
                  <dl className="flex-1 space-y-3 p-6 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-slate-500 dark:text-slate-400">Duration</dt>
                      <dd className="text-right font-semibold text-slate-800 dark:text-white">{p.duration}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-500 dark:text-slate-400">Registration fee</dt>
                      <dd className="font-semibold text-slate-800 dark:text-white">{rwf(p.registrationFee)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-500 dark:text-slate-400">Program fee</dt>
                      <dd className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        FREE
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-white/10">
                      <dt className="font-medium text-slate-600 dark:text-slate-300">Mentorship and certificate</dt>
                      <dd className="text-base font-extrabold text-brand-600 dark:text-blue-400">
                        {rwf(p.mentorshipCertificateFee)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Who can apply + Eligibility */}
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-5">
            <Reveal className="md:col-span-2">
              <div className="card h-full p-6">
                <h3 className="flex items-center gap-2.5 text-base font-bold text-slate-800 dark:text-white">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:text-blue-300">
                    <IconUsers className="h-5 w-5" />
                  </span>
                  Who Can Apply?
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {whoCanApply.map((w) => (
                    <li key={w} className="flex items-center gap-2.5">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <IconCheck className="h-3 w-3" />
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100} className="md:col-span-3">
              <div className="card h-full p-6">
                <h3 className="flex items-center gap-2.5 text-base font-bold text-slate-800 dark:text-white">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:text-blue-300">
                    <IconClipboard className="h-5 w-5" />
                  </span>
                  Eligibility
                </h3>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  This internship is designed for students studying:
                </p>
                <ul className="mt-3 grid gap-x-6 gap-y-2.5 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                  {eligibility.map((e) => (
                    <li key={e} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <IconCheck className="h-3 w-3" />
                      </span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-600 to-brand-500 px-6 py-14 text-center shadow-lift sm:px-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-brand-400/25 blur-3xl" />
            <h2 className="relative text-3xl font-extrabold !text-white sm:text-4xl">
              Don't Wait. Apply Today!
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl leading-relaxed text-blue-100/90">
              Kickstart your journey with expert mentorship, real project experience, and career
              growth. Gain real skills and build a brighter future.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="rounded-full bg-white px-10 py-3.5 text-sm font-bold text-brand-700 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
              >
                Apply Now
              </Link>
              <Link
                to="/contact"
                className="rounded-full border-2 border-white/40 px-10 py-3 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/10"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
