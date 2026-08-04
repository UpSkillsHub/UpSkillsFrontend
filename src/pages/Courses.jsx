import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import {
  courses,
  internshipPrograms,
  whoCanApply,
  eligibility,
  feeNotes,
  REGISTRATION_FEE,
  ONLINE_MONTHLY_FEE,
} from "../data/programs.js";

const rwf = (n) => `${n.toLocaleString("en-US")} RWF`;

function CourseCard({ course }) {
  return (
    <div className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="badge">{course.category}</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            Online / On-site
          </span>
        </div>
        <h3 className="mt-4 text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:text-brand-700 dark:text-white">
          {course.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {course.description}
        </p>

        <dl className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-sm dark:border-white/10">
          <div className="flex items-center justify-between">
            <dt className="text-slate-500 dark:text-slate-400">Duration</dt>
            <dd className="font-semibold text-brand-dark dark:text-white">
              {course.durationMonths} months
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500 dark:text-slate-400">Registration fee (one-time)</dt>
            <dd className="font-semibold text-brand-dark dark:text-white">{rwf(REGISTRATION_FEE)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-slate-500 dark:text-slate-400">Program fee</dt>
            <dd className="font-bold text-brand-600 dark:text-blue-400">
              {rwf(course.monthlyFee)}<span className="font-medium text-slate-400"> /month</span>
            </dd>
          </div>
        </dl>

        <Link
          to={`/courses/${course.slug}`}
          className="btn-primary mt-6 w-full rounded-xl py-2.5 text-center"
        >
          View Course Details
        </Link>
      </div>
    </div>
  );
}

export default function Courses() {
  const [query, setQuery] = useState("");

  const filtered = courses.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-white dark:from-white/5 dark:to-transparent" />
      <div className="container-page relative py-20">
        {/* ============ Header ============ */}
        <Reveal className="max-w-2xl">
          <span className="badge">Program Structure & Fees</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Our Courses</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Every program we offer — taught by practitioners, built for real jobs. All courses are
            available both <strong>on-site</strong> and <strong>online</strong>, and every trainee
            receives a recognized certificate upon successful completion.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8">
          <div className="relative max-w-md">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              className="input pl-9"
            />
          </div>
        </Reveal>

        {/* ============ Course cards ============ */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length > 0 ? (
            filtered.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 80}>
                <CourseCard course={c} />
              </Reveal>
            ))
          ) : (
            <p className="text-slate-500">No courses found.</p>
          )}
        </div>

        {/* ============ Fee notes ============ */}
        <Reveal className="mt-14">
          <div className="card border-l-4 border-l-brand-600 p-6">
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {feeNotes.map((note) => (
                <li key={note} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-brand-600 dark:text-blue-400">✔</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ============ Internship program ============ */}
        <section className="mt-20">
          <Reveal className="max-w-2xl">
            <span className="badge">Academic Internship Program</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Internship Program</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              A trusted, straightforward internship designed for IT students — practice your
              coding, work on real projects, and receive expert mentorship from IT industry
              professionals.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {internshipPrograms.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}>
                <div className="card card-hover flex h-full flex-col p-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">{p.name}</h3>
                  <dl className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-sm dark:border-white/10">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-slate-500 dark:text-slate-400">Duration</dt>
                      <dd className="text-right font-semibold text-brand-dark dark:text-white">{p.duration}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-500 dark:text-slate-400">Registration fee</dt>
                      <dd className="font-semibold text-brand-dark dark:text-white">{rwf(p.registrationFee)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-500 dark:text-slate-400">Program fee</dt>
                      <dd className="font-semibold text-emerald-600 dark:text-emerald-400">{rwf(p.programFee)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-500 dark:text-slate-400">Mentorship & certificate fee</dt>
                      <dd className="font-bold text-brand-600 dark:text-blue-400">{rwf(p.mentorshipCertificateFee)}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Who can apply + Eligibility */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="card h-full p-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Who Can Apply?</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                  {whoCanApply.map((w) => (
                    <li key={w} className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-brand-600 dark:text-blue-400">✔</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card h-full p-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Eligibility</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  This internship is designed for students studying:
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                  {eligibility.map((e) => (
                    <li key={e} className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-brand-600 dark:text-blue-400">✔</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ Call to action ============ */}
        <Reveal className="mt-16">
          <div className="card flex flex-col items-center gap-4 bg-gradient-to-r from-brand-600 to-brand-700 p-10 text-center text-white">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Don't Wait. Apply Today!</h2>
            <p className="max-w-xl text-sm text-blue-100">
              Kickstart your journey. Gain real skills. Build a brighter future — expert
              mentorship, real project experience, and career growth.
            </p>
            <Link
              to="/register"
              className="mt-2 rounded-full bg-white px-10 py-3 text-sm font-bold text-brand-700 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
            >
              Apply Now
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
