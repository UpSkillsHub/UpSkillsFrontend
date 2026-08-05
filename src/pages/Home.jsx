import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Testimonials from "../components/Testimonials.jsx";
import ScrollScale from "../components/ScrollScale.jsx";
import HeroActions from "../components/HeroActions.jsx";
import { IconMail, IconPhone, IconMapPin, IconUser, IconUsers, IconClipboard, IconCard, IconCheck, IconGrad, IconBriefcase, IconCode, IconHeadset, IconPalette, IconMegaphone } from "../components/icons.jsx";

// Rotating hero background images. Drop hero-1.jpg … hero-5.jpg into
// public/images/hero/ and they fade in automatically; until then a gradient shows.
function HeroCarousel() {
  const slots = [1, 2, 3, 4, 5];
  const [loaded, setLoaded] = useState([]);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (loaded.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % loaded.length), 4500);
    return () => clearInterval(t);
  }, [loaded]);
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
      <div className="absolute inset-0 animate-gradient bg-[length:200%_200%] bg-gradient-to-br from-brand-500 via-brand-700 to-brand-900" />
      {slots.map((n, i) => (
        <img
          key={n}
          src={`/images/hero/hero-${n}.jpg`}
          alt=""
          onLoad={() => setLoaded((l) => (l.includes(i) ? l : [...l, i]))}
          onError={() => {}}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-apple ${
            loaded[idx] === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-brand-900/10 to-transparent" />
    </div>
  );
}

// ---- Prototype content (exact copy) --------------------------------------
const stats = [
  { n: "500k+", l: "Active learners" },
  { n: "1200+", l: "Courses Completed" },
  { n: "15+", l: "Years of experience" },
];

const whatCards = [
  {
    t: "IT Training Center",
    d: "At its core, Up Skills Hub offers a structured IT training center where learners gain hands-on skills in areas like web development, databases, UI/UX design, and software engineering.",
  },
  {
    t: "Internship Programs",
    d: "The internship programs simulate real workplace environments. Learners are assigned roles, tasks, and deadlines similar to what they would experience in an actual company.",
  },
  {
    t: "Real-World Projects",
    d: "One of the strongest aspects of Up Skills Hub is its emphasis on real-world projects. Participants work on actual problems, sometimes for real clients or realistic case studies.",
  },
  {
    t: "Talent Marketplace",
    d: "The talent marketplace connects trained individuals directly with opportunities. Instead of leaving graduates to search blindly for jobs, the platform acts as a bridge between skilled talent and employers.",
  },
];

const courses = [
  { t: "Cybersecurity & Ethical Hacking", d: "Learn how to protect system, detect vulnerabilities, and perform ethical hacking.", m: "3 Months" },
  { t: "Frontend Development", d: "Master HTML, CSS, Javascript, and build responsive user interfaces.", m: "3 Months" },
  { t: "Backend Development", d: "Learn server-side programming, databases, and Office tools.", m: "4 Months" },
  { t: "Mobile Development", d: "Build Android and ios apps using modern development tools.", m: "4 Months" },
  { t: "Microsoft Office", d: "Become proficient in Word, Excel, PowerPoint, and Office tools", m: "2 Months" },
  { t: "Digital Marketing & SEO with WordPress", d: "Learn SEO, content marketing, and build websites using wordPress.", m: "3 Months" },
  { t: "Power BI & Data Analysis", d: "Analyze data, create dashboards and generate insights using power BI.", m: "3 Months" },
  { t: "Graphic Design", d: "Design logos, posters, and digital content using design tools.", m: "2 Months" },
  { t: "Business and Project Management", d: "Learn project planning, execution, and business management skills.", m: "3 Months" },
];

const benefits = ["Work on Real Projects", "Personalized Mentorship", "Earn Certification"];
const whyChoose = ["Get Featured on Our Website", "Take on Real Tasks", "Job Preparation Support"];

// Services offered by Up Skills Hub.
const services = [
  { icon: IconGrad, title: "Training", desc: "Structured, hands-on IT courses that take you from beginner to job-ready.", grad: "from-blue-500 to-blue-700" },
  { icon: IconBriefcase, title: "Academic Internship", desc: "Real workplace internships with roles, tasks and deadlines for students.", grad: "from-emerald-500 to-emerald-700" },
  { icon: IconCode, title: "Website & App Creation", desc: "We design and build fast, modern websites and mobile apps for you.", grad: "from-brand-500 to-brand-700" },
  { icon: IconHeadset, title: "IT Support", desc: "Reliable technical support to keep your systems and teams running.", grad: "from-cyan-500 to-cyan-700" },
  { icon: IconPalette, title: "Branding & Design", desc: "Logos, visual identity and graphics that make your brand stand out.", grad: "from-fuchsia-500 to-fuchsia-700" },
  { icon: IconMegaphone, title: "Digital Marketing", desc: "SEO, content and campaigns that grow your business online.", grad: "from-amber-500 to-orange-600" },
];

// Talent Marketplace — how employers hire our trainees (4-step flow).
const talentSteps = [
  { icon: IconClipboard, title: "Employer posts a task", desc: "A company or client posts a real task or project they need done." },
  { icon: IconUsers, title: "Trainees apply", desc: "Our skilled trainees browse the task and apply to take it on." },
  { icon: IconCheck, title: "Work completed", desc: "The chosen trainee delivers the finished, reviewed work on time." },
  { icon: IconCard, title: "Employer pays", desc: "Once satisfied, the employer pays, trainees earn and build a track record." },
];

// Trusted-company logos shown under the hero (click through to their sites).
const trustedLogos = [
  { src: "/images/trusted/auca.jpg", url: "https://web.auca.ac.rw/" },
  { src: "/images/trusted/tsinda.jpg", url: "https://tsindamedia.com/" },
  { src: "/images/trusted/golden.jpg", url: null },
  { src: "/images/trusted/apaer.jpg", url: "https://www.apaerschool.rw/" },
  { src: "/images/trusted/alicecop.jpg", url: "https://www.alicecop.com/" },
  { src: "/images/trusted/chris.png", url: "https://www.chrisofficial.com/" },
];

function Institution({ src, url }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  const img = (
    <img
      src={src}
      alt="Trusted company"
      onError={() => setOk(false)}
      className="h-10 w-auto max-w-[110px] shrink-0 object-contain opacity-80 transition duration-300 hover:scale-110 hover:opacity-100"
    />
  );
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" title="Visit website" className="shrink-0">
      {img}
    </a>
  ) : (
    img
  );
}

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Home() {
  // Interactive course spotlight: which course is previewed in the panel.
  const [activeCourse, setActiveCourse] = useState(0);
  return (
    <>
      {/* HERO / HOME */}
      <section id="home" className="relative overflow-hidden bg-white dark:bg-brand-dark">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 animate-float rounded-full bg-brand-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-40 h-72 w-72 animate-float rounded-full bg-brand-200/40 blur-3xl" style={{ animationDelay: "2s" }} />
        <div className="container-page relative grid items-start gap-12 pb-8 pt-4 lg:grid-cols-2 lg:pb-10 lg:pt-6">
          <div className="animate-fadeUp">
            <span className="badge mb-5">IT Training &amp; Internship Hub</span>
            <h1 className="animate-gradient bg-gradient-to-r from-brand-800 via-blue-500 to-brand-800 bg-[length:200%_auto] bg-clip-text text-4xl font-extrabold leading-[1.08] text-transparent dark:from-blue-300 dark:via-white dark:to-blue-300 sm:text-5xl lg:text-[3.4rem]">
              Empowering Youth with Digital Skills &amp; Real Job Opportunities
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-500">
              Welcome to Up Skills Hub Training Program we keep you motivated, and help you achieve
              your goal.
            </p>
            <HeroActions />

            <div className="mt-12">
              <p className="text-xs font-semibold tracking-widest text-slate-400">TRUSTED BY BIG INSTITUTIONS</p>
              <div className="mt-4 flex flex-wrap items-center gap-5">
                {trustedLogos.map((logo) => (
                  <Institution key={logo.src} src={logo.src} url={logo.url} />
                ))}
              </div>
            </div>
          </div>

          {/* Right visual: internship photo + floating cards */}
          <div className="relative hidden h-[460px] animate-scaleIn lg:block">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-brand-100">
              <img
                src="/images/internshipTrue.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <img
                src="/images/internship.jpg"
                alt="Up Skills Hub internship"
                className="hero-swap-top absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/45 via-brand-900/5 to-transparent" />
            </div>
            <div className="float-glow absolute -left-6 top-10 w-44 rounded-2xl border-2 border-blue-500 bg-white/95 p-4 shadow-lift backdrop-blur dark:bg-brand-900/95">
              <p className="text-2xl font-extrabold text-brand-dark">500k+</p>
              <p className="text-xs text-slate-500">Active learners</p>
            </div>
            <div className="float-glow absolute -right-5 bottom-20 w-48 rounded-2xl border-2 border-blue-500 bg-white/95 p-4 shadow-lift backdrop-blur dark:bg-brand-900/95" style={{ animationDelay: "1.5s" }}>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((n) => (
                  <img
                    key={n}
                    src={`/images/cohort${n}.jpg`}
                    alt={`Cohort member ${n}`}
                    className="btn-glow-strong h-9 w-9 rounded-full border-2 border-blue-500 object-cover transition-transform duration-300 ease-apple hover:z-10 hover:-translate-y-1 hover:scale-125"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs font-medium text-slate-600">Join our next cohort</p>
            </div>
            <div className="absolute bottom-6 left-8 animate-float rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-glow" style={{ animationDelay: "0.8s" }}>
              Job-ready in months
            </div>
          </div>
        </div>

        {/* Applications ticker — single-sentence TV-style banner */}
        <div className="ticker-wrap overflow-hidden bg-gradient-to-r from-brand-800 via-blue-600 to-brand-800 py-2.5">
          <div className="ticker-track ticker-fast">
            {[0, 1].map((k) => (
              <span key={k} className="flex items-center whitespace-nowrap pr-20 text-sm font-semibold tracking-wide text-white">
                <span className="mr-3 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_10px_2px_rgba(110,231,183,0.7)]" />
                Continuous applications are open: start learning anytime with our flexible programs, no intake dates required.
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScMG7St3ye7JU7viFJFU1mZdXQcbZDuZ9F9wBiByiVek5SCdQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-5 inline-flex items-center gap-1 rounded-full bg-white px-4 py-1 text-xs font-extrabold text-brand-700 shadow-sm transition hover:scale-105 hover:bg-brand-50"
                >
                  Apply Now →
                </a>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT US — What is Up Skills Hub? */}
      <section id="about" className="bg-slate-50/70 pb-16 pt-8 sm:pb-24 sm:pt-10 dark:bg-transparent">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="inline-block text-3xl font-extrabold text-brand-dark sm:text-4xl">
              What is Up Skills Hub?
              <span className="mt-3 block h-1 w-24 rounded-full bg-brand-600 mx-auto" />
            </h2>
            <p className="mt-6 text-slate-500">
              Up Skills Hub is positioned as a practical, career-focused platform designed to bridge
              the gap between learning and real-world employment in tech.
            </p>
          </Reveal>

          {/* Editorial bento grid: asymmetric cards with ghost numbers */}
          <div className="mt-14 grid gap-6 md:grid-cols-6">
            {whatCards.map((c, i) => {
              const accents = [
                { span: "md:col-span-4", bar: "from-brand-500 to-blue-500", icon: IconGrad, chip: "bg-brand-50 text-brand-600" },
                { span: "md:col-span-2", bar: "from-emerald-400 to-teal-500", icon: IconBriefcase, chip: "bg-emerald-50 text-emerald-600" },
                { span: "md:col-span-2", bar: "from-cyan-400 to-blue-500", icon: IconCode, chip: "bg-cyan-50 text-cyan-600" },
                { span: "md:col-span-4", bar: "from-amber-400 to-orange-500", icon: IconUsers, chip: "bg-amber-50 text-amber-600" },
              ];
              const a = accents[i];
              return (
                <Reveal key={c.t} delay={i * 90} className={a.span}>
                  <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-8 shadow-soft ring-1 ring-slate-100 transition-all duration-500 ease-apple hover:-translate-y-1.5 hover:shadow-lift dark:bg-white/5 dark:ring-white/10">
                    {/* Accent bar slides in on hover */}
                    <span className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${a.bar} transition-transform duration-500 ease-apple group-hover:scale-x-100`} />
                    {/* Ghost number */}
                    <span className="pointer-events-none absolute -right-2 -top-7 select-none text-[7.5rem] font-extrabold leading-none tracking-tighter text-slate-100 transition-all duration-500 ease-apple group-hover:-translate-y-1 group-hover:text-brand-100 dark:text-white/5 dark:group-hover:text-white/10">
                      0{i + 1}
                    </span>
                    <span className={`relative grid h-12 w-12 place-items-center rounded-2xl ${a.chip} ring-1 ring-black/5 transition-transform duration-500 ease-apple group-hover:-rotate-6 group-hover:scale-110 dark:bg-white/10 dark:ring-white/10`}>
                      <a.icon className="h-6 w-6" />
                    </span>
                    <h3 className="relative mt-6 text-xl font-bold text-brand-dark">{c.t}</h3>
                    <p className="relative mt-3 max-w-lg leading-relaxed text-slate-500 dark:text-slate-400">{c.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* COURSES — Our Courses */}
      <section id="courses" className="pb-16 pt-8 sm:pb-24 sm:pt-10">
        <div className="container-page">
          <Reveal className="text-center">
            <h2 className="inline-block text-3xl font-extrabold text-brand-dark sm:text-4xl">
              Our Courses
              <span className="mt-3 block h-1 w-24 rounded-full bg-brand-600 mx-auto" />
            </h2>
          </Reveal>

          {/* Interactive spotlight: pick a course on the left, preview it on the right */}
          <Reveal className="mt-14 hidden gap-10 lg:grid lg:grid-cols-5">
            {/* Course index */}
            <div className="lg:col-span-3">
              <ul className="divide-y divide-slate-100 dark:divide-white/10">
                {courses.map((c, i) => {
                  const active = i === activeCourse;
                  return (
                    <li key={c.t}>
                      <button
                        onMouseEnter={() => setActiveCourse(i)}
                        onFocus={() => setActiveCourse(i)}
                        onClick={() => setActiveCourse(i)}
                        className={`group flex w-full items-center gap-5 px-4 py-5 text-left transition-all duration-300 ease-apple ${
                          active ? "translate-x-2" : "hover:translate-x-1"
                        }`}
                      >
                        <span
                          className={`font-mono text-sm font-bold tabular-nums transition-colors duration-300 ${
                            active ? "text-brand-600 dark:text-blue-400" : "text-slate-300 dark:text-slate-600"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex-1 text-lg font-bold transition-colors duration-300 sm:text-xl ${
                            active
                              ? "animate-gradient bg-gradient-to-r from-brand-700 via-blue-500 to-brand-700 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-blue-300 dark:via-white dark:to-blue-300"
                              : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                          }`}
                        >
                          {c.t}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 ${
                            active
                              ? "bg-brand-50 text-brand-600 dark:bg-white/10 dark:text-blue-300"
                              : "text-slate-300 dark:text-slate-600"
                          }`}
                        >
                          {c.m}
                        </span>
                        <svg
                          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                          className={`h-5 w-5 transition-all duration-300 ease-apple ${
                            active ? "translate-x-0 text-brand-600 opacity-100 dark:text-blue-400" : "-translate-x-2 opacity-0"
                          }`}
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Sticky preview panel */}
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <div
                  key={activeCourse}
                  className="animate-scaleIn relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-9 shadow-lift"
                >
                  <div className="anim-drift pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border border-white/10 bg-blue-400/20" />
                  <div className="anim-drift-b pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full border border-white/10 bg-white/10" />
                  <span className="pointer-events-none absolute -bottom-10 -right-2 select-none text-[9rem] font-extrabold leading-none text-white/[0.06]">
                    {String(activeCourse + 1).padStart(2, "0")}
                  </span>

                  <span className="relative inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-100 ring-1 ring-white/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Start Anytime
                  </span>
                  <h3 className="relative mt-4 text-2xl font-extrabold leading-snug !text-white">
                    {courses[activeCourse].t}
                  </h3>
                  <p className="relative mt-3 leading-relaxed text-blue-100/90">{courses[activeCourse].d}</p>
                  <div className="relative mt-5 flex flex-wrap gap-2.5">
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
                      Duration: {courses[activeCourse].m}
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
                      Online / On-site
                    </span>
                  </div>
                  <Link
                    to="/register"
                    className="group/btn relative mt-7 flex w-full items-center justify-between rounded-full bg-white p-1.5 pl-6 text-sm font-bold text-brand-800 shadow-soft transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.97]"
                  >
                    <span className="tracking-wide transition-transform duration-300 ease-apple group-hover/btn:translate-x-1.5">Enroll</span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-700 text-white transition-all duration-500 ease-apple group-hover/btn:-rotate-45 group-hover/btn:bg-brand-600">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mobile fallback: compact stacked cards */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:hidden">
            {courses.map((c, i) => (
              <Reveal key={c.t} delay={(i % 2) * 90}>
                <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 transition-all duration-500 ease-apple hover:-translate-y-1 hover:shadow-lift dark:bg-white/5 dark:ring-white/10">
                  <span className="pointer-events-none absolute -right-1 -top-5 select-none text-6xl font-extrabold text-slate-100 dark:text-white/5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative text-lg font-bold text-brand-dark">{c.t}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{c.d}</p>
                  <div className="relative mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-white/10 dark:text-blue-300">{c.m}</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">Start Anytime</span>
                  </div>
                  <Link to="/register" className="relative mt-5 inline-flex w-fit rounded-full bg-brand-600 px-8 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700">
                    Enroll
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Funnel to the full catalog */}
          <Reveal className="mt-12 text-center">
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2.5 rounded-full border-2 border-brand-200 px-9 py-3 text-sm font-bold text-brand-600 transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-50 dark:border-white/20 dark:text-blue-300 dark:hover:bg-white/5"
            >
              View All Courses and Fees
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PROGRAM — Our Internship Programs */}
      <section id="program" className="relative overflow-hidden bg-brand-dark py-16 sm:py-24 text-white">
        <img
          src="/images/internship2.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-dark/95 via-brand-900/90 to-brand-dark/95" />
        <div className="container-page relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="inline-block text-3xl font-extrabold text-white sm:text-4xl">
              Our Internship Programs
              <span className="mt-3 block h-1 w-24 rounded-full bg-white/70 mx-auto" />
            </h2>
            <p className="mt-6 text-brand-100">
              Kick start your career with hands-on experience and real-world impact. Our internship
              program is designed to help you grow, learn, and stand out.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              { title: "Benefits", items: benefits },
              { title: "Why choose Us?", items: whyChoose },
            ].map((col, i) => (
              <Reveal key={col.title} delay={i * 120}>
                <div className="rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur">
                  <h3 className="text-center text-xl font-bold text-white">{col.title}</h3>
                  <ul className="mt-6 space-y-5">
                    {col.items.map((it) => (
                      <li key={it} className="flex items-center gap-3 text-lg font-semibold">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 text-sm">✓</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link to="/register" className="btn rounded-full bg-white px-8 text-brand-dark hover:-translate-y-0.5 hover:bg-brand-50">
              Apply for Internship
            </Link>
          </Reveal>
        </div>
      </section>

      {/* TALENT MARKETPLACE — How employers hire our trainees */}
      <section id="talent" className="relative overflow-hidden bg-white pb-10 pt-8 sm:pb-14 sm:pt-10 dark:bg-brand-dark">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="badge mb-4">Talent Marketplace</span>
            <h2 className="inline-block text-3xl font-extrabold text-brand-dark sm:text-4xl">
              How Employers Hire Our Talent
              <span className="mt-3 block h-1 w-24 rounded-full bg-brand-600 mx-auto" />
            </h2>
            <p className="mt-6 text-slate-500">
              Companies get real work done while our trainees gain paid, real-world experience.
              Here's exactly how it works, from posting a task to getting paid.
            </p>
          </Reveal>

          {/* Animated 4-step flow */}
          <div className="relative mt-16">
            {/* connector line + traveling dot (desktop) */}
            <div className="absolute left-[12%] right-[12%] top-8 hidden lg:block">
              <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-brand-100 via-brand-400 to-brand-100 dark:from-white/10 dark:via-blue-400/60 dark:to-white/10" />
              <span className="flow-dot absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-brand-600 shadow-glow" />
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {talentSteps.map((s, i) => (
                <Reveal key={s.title} delay={i * 140} className="relative text-center">
                  <div className="step-pulse relative mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-brand-100 bg-white text-brand-600 dark:border-white/10 dark:bg-brand-900 dark:text-blue-300">
                    <s.icon className="h-7 w-7" />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-brand-dark dark:text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-14 text-center">
            <a href="#contact" onClick={scrollTo("contact")} className="btn-primary rounded-full px-8">Browse Talent</a>
          </Reveal>
        </div>
      </section>

      {/* SERVICES — What Up Skills Hub offers (fixed parallax background) */}
      <section id="services" className="relative overflow-hidden bg-brand-800 py-16 sm:py-24">
        {/* Fixed parallax background — stays put while the content scrolls over it */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/background.jpg')" }} />
        <div className="absolute inset-0 bg-brand-900/65" />
        {/* subtle floating particles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-brand-300/50" />
          <div className="animate-float absolute right-[16%] top-[26%] h-1.5 w-1.5 rounded-full bg-white/40" style={{ animationDelay: "1.4s" }} />
          <div className="animate-float absolute bottom-[18%] left-[26%] h-2 w-2 rounded-full bg-brand-200/50" style={{ animationDelay: "2.6s" }} />
        </div>

        <div className="container-page relative z-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="inline-block text-3xl font-extrabold text-white sm:text-4xl">
              Our Services
              <span className="mt-3 block h-1 w-24 rounded-full bg-brand-300 mx-auto" />
            </h2>
            <p className="mt-6 text-slate-200">
              Beyond training, Up Skills Hub delivers real digital services for individuals and
              businesses, from building your website to growing your brand.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 100}>
                <div className="card-hover group flex h-full flex-col rounded-2xl bg-brand-50 p-8 ring-1 ring-brand-100">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-sm ring-1 ring-brand-100 transition-all duration-500 ease-apple group-hover:bg-brand-600 group-hover:text-white">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-brand-dark">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES — Testimonials from trainees */}
      <section id="success" className="relative overflow-hidden bg-white pb-16 pt-2 sm:pb-24 sm:pt-4 dark:bg-brand-dark">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="inline-block text-3xl font-extrabold text-brand-dark sm:text-4xl">
              Success Stories
              <span className="mt-3 block h-1 w-24 rounded-full bg-brand-600 mx-auto" />
            </h2>
            <p className="mt-6 text-slate-500">
              Real trainees, real results. Hear how Up Skills Hub helped them gain skills, land jobs,
              and launch their tech careers.
            </p>
          </Reveal>
          <Testimonials />
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section id="contact" className="relative overflow-hidden bg-white py-12 sm:py-16 dark:bg-brand-dark">
        <div className="container-page">
          <ScrollScale className="mx-auto max-w-6xl" min={0.58}>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-800 bg-cover bg-center p-14 text-center text-white shadow-lift ring-1 ring-white/10 sm:p-28" style={{ backgroundImage: "url('/images/call-to-action2.jpg')" }}>
              {/* dark overlay so the text stays readable */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-900/85 to-brand-800/80" />
              {/* animated decorative glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 animate-float rounded-full bg-white/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-14 -left-10 h-64 w-64 animate-float rounded-full bg-brand-300/20 blur-2xl" style={{ animationDelay: "1.5s" }} />
              <h2 className="relative text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">Ready to take the next step?</h2>
              <p className="relative mx-auto mt-5 max-w-xl text-lg text-brand-50">
                Whether you want to build in-demand skills or hire job-ready talent, Up Skills Hub is
                your starting point.
              </p>
              <div className="relative mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScMG7St3ye7JU7viFJFU1mZdXQcbZDuZ9F9wBiByiVek5SCdQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-live inline-flex items-center justify-center rounded-full border-2 border-white/70 bg-white/10 px-10 py-4 text-base font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-white/20"
                >
                  Join Training
                </a>
                <a
                  href="#talent"
                  onClick={scrollTo("talent")}
                  className="btn-live inline-flex items-center justify-center rounded-full border-2 border-white/70 px-10 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-white hover:text-brand-700"
                >
                  Hire Our Talent
                </a>
              </div>
            </div>
          </ScrollScale>
        </div>
      </section>
    </>
  );
}
