import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

const programs = [
  {
    tag: "Flagship",
    title: "Job-ready programs taught by practitioners",
    desc: "Multi-course tracks that take you from beginner to hireable, with real projects and mentor feedback.",
  },
  {
    tag: "Business",
    title: "Business track",
    desc: "Strategy, marketing, product and operations fundamentals for aspiring managers and founders.",
  },
  {
    tag: "Design",
    title: "Design track",
    desc: "UI/UX, design systems and portfolio-building taught by working product designers.",
  },
  {
    tag: "Tech",
    title: "Tech track",
    desc: "Software engineering, data and cloud skills with hands-on labs and code reviews.",
  },
];

export default function Programs() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-white" />
      <div className="container-page relative py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="badge">Programs</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Job-ready programs</h1>
          <p className="mt-4 text-lg text-slate-600">
            Structured tracks designed to get you hired, taught by practitioners currently working in
            the field.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="card card-hover group h-full p-8">
                <span className="badge">{p.tag}</span>
                <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-500">{p.desc}</p>
                <Link to="/courses" className="btn-ghost mt-6">Explore courses</Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-14 text-center shadow-glow">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Not sure which track fits you?</h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-100">Browse the full catalog or talk to our team.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/courses" className="btn bg-white text-brand-700 hover:-translate-y-0.5 hover:bg-brand-50">Browse courses</Link>
              <Link to="/contact" className="btn border border-white/40 text-white hover:bg-white/10">Contact us</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
