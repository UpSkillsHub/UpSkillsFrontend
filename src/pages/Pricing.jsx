import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";
import Modal from "../components/Modal.jsx";

const plans = [
  {
    name: "Starter",
    monthly: 0,
    yearly: 0,
    features: ["Access to free courses", "Community support", "Course certificates"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    monthly: 29,
    yearly: 290,
    features: ["All courses unlocked", "Mentor feedback", "Career support", "Downloadable resources"],
    cta: "Choose Pro",
    highlight: true,
  },
  {
    name: "Teams",
    monthly: null,
    yearly: null,
    features: ["Everything in Pro", "Team dashboard", "Weekly reports", "Priority support"],
    cta: "Contact sales",
    highlight: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const priceLabel = (p) => {
    if (p.monthly === null) return "Custom";
    const val = yearly ? p.yearly : p.monthly;
    return val === 0 ? "Free" : `$${val}`;
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-white" />
      <div className="container-page relative py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="badge">Pricing</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Choose your plan</h1>
          <p className="mt-4 text-lg text-slate-600">Simple, transparent pricing that scales with you.</p>
        </Reveal>

        {/* Billing toggle */}
        <Reveal delay={100} className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!yearly ? "text-brand-dark" : "text-slate-400"}`}>Monthly</span>
          <button
            onClick={() => setYearly((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${yearly ? "bg-brand-600" : "bg-slate-300"}`}
            aria-label="Toggle billing period"
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ease-apple ${yearly ? "left-6" : "left-1"}`} />
          </button>
          <span className={`text-sm font-medium ${yearly ? "text-brand-dark" : "text-slate-400"}`}>
            Yearly <span className="text-brand-600">(2 months free)</span>
          </span>
        </Reveal>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div
                className={`card relative flex h-full flex-col p-8 transition-all duration-500 ease-apple hover:-translate-y-1.5 hover:shadow-lift ${
                  p.highlight ? "ring-2 ring-brand-500" : ""
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-glow">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-brand-dark">{priceLabel(p)}</span>
                  {p.monthly !== null && p.monthly !== 0 && (
                    <span className="text-slate-500">/{yearly ? "yr" : "mo"}</span>
                  )}
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-xs text-brand-600">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                {p.name === "Teams" ? (
                  <button onClick={() => setSalesOpen(true)} className={p.highlight ? "btn-primary mt-8" : "btn-secondary mt-8"}>
                    {p.cta}
                  </button>
                ) : (
                  <Link to="/register" className={p.highlight ? "btn-primary mt-8" : "btn-secondary mt-8"}>
                    {p.cta}
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Modal open={salesOpen} onClose={() => setSalesOpen(false)} title="Talk to our team">
        {sent ? (
          <p className="text-slate-600">Thanks! Our team will reach out shortly.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="label">Work email</label>
              <input type="email" required placeholder="you@company.com" className="input" />
            </div>
            <div>
              <label className="label">Team size</label>
              <input type="text" placeholder="e.g. 25" className="input" />
            </div>
            <div>
              <label className="label">Message</label>
              <textarea rows={3} placeholder="Tell us what you need…" className="input" />
            </div>
            <button className="btn-primary w-full">Request a call</button>
          </form>
        )}
      </Modal>
    </div>
  );
}
