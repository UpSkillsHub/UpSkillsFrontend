import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Testimonials from "../components/Testimonials.jsx";
import { IconMail, IconPhone, IconMapPin, IconUser, IconUsers, IconClipboard, IconCard, IconCheck } from "../components/icons.jsx";

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

// Talent Marketplace — how employers hire our trainees (4-step flow).
const talentSteps = [
  { icon: IconClipboard, title: "Employer posts a task", desc: "A company or client posts a real task or project they need done." },
  { icon: IconUsers, title: "Trainees apply", desc: "Our skilled trainees browse the task and apply to take it on." },
  { icon: IconCheck, title: "Work completed", desc: "The chosen trainee delivers the finished, reviewed work on time." },
  { icon: IconCard, title: "Employer pays", desc: "Once satisfied, the employer pays, trainees earn and build a track record." },
];

// Institution logo slot — shows /images/institution-N.png, falls back to a box.
function Institution({ n }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <div className="h-14 w-32 rounded-lg bg-slate-100" />;
  return (
    <img
      src={`/images/institution-${n}.png`}
      alt="Partner institution"
      onError={() => setOk(false)}
      className="h-9 w-auto max-w-[100px] shrink-0 object-contain opacity-80 transition duration-300 hover:scale-105 hover:opacity-100"
    />
  );
}

const scrollTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Home() {
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
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#courses" onClick={scrollTo("courses")} className="btn-primary rounded-full px-8">Explore Courses</a>
              <a href="#contact" onClick={scrollTo("contact")} className="btn-secondary rounded-full px-8">Hire Our Talent</a>
            </div>

            <div className="mt-12">
              <p className="text-xs font-semibold tracking-widest text-slate-400">TRUSTED BY BIG INSTITUTIONS</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <Institution key={n} n={n} />
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

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {whatCards.map((c, i) => (
              <Reveal key={c.t} delay={(i % 2) * 100}>
                <div className="card-hover h-full rounded-2xl bg-brand-50 p-8 ring-1 ring-brand-100">
                  <h3 className="text-xl font-bold text-brand-dark">{c.t}</h3>
                  <p className="mt-3 leading-relaxed text-slate-500">{c.d}</p>
                </div>
              </Reveal>
            ))}
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

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c, i) => (
              <Reveal key={c.t} delay={(i % 3) * 80}>
                <div className="card-hover flex h-full flex-col rounded-2xl bg-brand-50 p-6 ring-1 ring-brand-100">
                  <h3 className="text-lg font-bold text-brand-dark">{c.t}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{c.d}</p>
                  <p className="mt-4 text-sm text-slate-600">Duration: {c.m}</p>
                  <p className="text-sm text-slate-600">Start Time:</p>
                  <Link to="/register" className="mt-5 w-fit rounded-full bg-brand-600 px-8 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700">Enroll</Link>
                </div>
              </Reveal>
            ))}
          </div>
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

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-slate-50/70 pb-16 pt-8 sm:pb-24 sm:pt-10 dark:bg-transparent">
        {/* Live animated background — soft, professional, light */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-gradient bg-[length:200%_200%] bg-gradient-to-br from-blue-50 via-white to-brand-50 opacity-90 dark:from-brand-900 dark:via-brand-dark dark:to-brand-900 dark:opacity-60" />
          <div className="anim-drift absolute -left-20 top-6 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl" />
          <div className="anim-drift-b absolute right-0 top-1/3 h-80 w-80 rounded-full bg-brand-300/25 blur-3xl" />
          <div className="anim-drift absolute -bottom-10 left-1/3 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" style={{ animationDelay: "3s" }} />
          <div className="anim-drift-b absolute bottom-10 right-1/4 h-56 w-56 rounded-full bg-brand-200/30 blur-3xl" style={{ animationDelay: "5s" }} />
          <div className="animate-float absolute left-[12%] top-[24%] h-3 w-3 rounded-full bg-blue-400/50" />
          <div className="animate-float absolute right-[16%] top-[30%] h-2 w-2 rounded-full bg-brand-400/50" style={{ animationDelay: "1.2s" }} />
          <div className="animate-float absolute bottom-[22%] left-[26%] h-2.5 w-2.5 rounded-full bg-blue-300/60" style={{ animationDelay: "2.4s" }} />
          <div className="animate-float absolute bottom-[28%] right-[30%] h-2 w-2 rounded-full bg-brand-300/50" style={{ animationDelay: "0.6s" }} />
        </div>
        <div className="container-page relative z-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="inline-block text-3xl font-extrabold text-brand-dark sm:text-4xl">
              Get in Touch
              <span className="mt-3 block h-1 w-24 rounded-full bg-brand-600 mx-auto" />
            </h2>
            <p className="mt-6 text-slate-500">
              Have a question or want to hire our talent? Send us a message and we'll get back to you.
            </p>
          </Reveal>

          <Reveal delay={120} className="mx-auto mt-14 max-w-2xl">
              <form onSubmit={(e) => e.preventDefault()} className="card space-y-5 p-8">
                <div>
                  <h3 className="text-2xl font-extrabold text-brand-dark">Contact Form</h3>
                  <p className="mt-1 text-sm text-slate-500">Fill in the form and our team will get back to you shortly.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <input className="input pr-11" placeholder="Matabaro Ardent" required />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"><IconUser className="h-5 w-5" /></span>
                  </div>
                  <div className="relative">
                    <input type="email" className="input pr-11" placeholder="Email Address" required />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"><IconMail className="h-5 w-5" /></span>
                  </div>
                </div>
                <select className="input" defaultValue="">
                  <option value="" disabled>Choose Subject</option>
                  <option>General enquiry</option>
                  <option>Course information</option>
                  <option>Hire our talent</option>
                  <option>Partnership</option>
                </select>
                <textarea rows={5} className="input" placeholder="Your Message" required />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/" className="btn-secondary flex-1 rounded-full">Back to Home</Link>
                  <button className="btn-primary flex-1 rounded-full">Submit Now</button>
                </div>
              </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
