import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import Modal from "../components/Modal.jsx";
import { IconMail, IconPhone, IconMapPin, IconWhatsapp, IconCheck } from "../components/icons.jsx";

const CONTACT = {
  email: "upskillshub.info@gmail.com",
  phone: "+250 781 796 283",
  phoneDial: "+250781796283",
  address: "KG 173 Street, Remera, Kigali, Rwanda",
};

const details = [
  {
    icon: IconMail,
    label: "Email us",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: "We usually reply within a day",
  },
  {
    icon: IconPhone,
    label: "Call or WhatsApp",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phoneDial}`,
    note: "Monday to Friday, 8am to 6pm",
  },
  {
    icon: IconMapPin,
    label: "Visit our campus",
    value: CONTACT.address,
    href: "https://maps.google.com/?q=KG+173+Street+Remera+Kigali+Rwanda",
    note: "Walk in and meet our trainers",
  },
];

const assurances = [
  { title: "Free course guidance", text: "We help you pick the program that matches your goals." },
  { title: "Fast, clear answers", text: "Fees, schedules and enrollment explained in plain language." },
  { title: "Students and employers", text: "Support whether you want to learn or to hire our talent." },
];

// Deterministic particles for the hero.
const DOTS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 61) % 100}%`,
  size: 3 + ((i * 5) % 5),
  duration: 8 + ((i * 3) % 7),
  delay: (i * 1.9) % 10,
  opacity: 0.3 + ((i * 13) % 40) / 100,
}));

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [open, setOpen] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setOpen(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* ================= Hero with living photo backdrop ================= */}
      <section className="relative overflow-hidden bg-brand-900">
        {/* Crossfading photos with a slow cinematic zoom */}
        <div className="absolute inset-0">
          {["/images/hero/course1.jpg", "/images/cta/dwat2.jpg"].map((src, i) => (
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
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/95 via-brand-800/88 to-brand-600/82" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent" />
        </div>

        {/* Motion layers */}
        <div className="anim-drift pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-400/25 blur-3xl" />
        <div className="anim-drift-b pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="orbit-ring pointer-events-none absolute -top-16 right-1/4 h-72 w-72 rounded-full border-2 border-dashed border-white/15" style={{ animationDuration: "22s" }} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {DOTS.map((p, i) => (
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

        <div className="container-page relative py-20 text-center sm:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white ring-1 ring-white/25 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              We are open
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold !text-white sm:text-6xl">
              Let's Talk About
              <span className="text-gradient-animated block">Your Future</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-blue-100/90">
              Questions about a course, the internship program, or hiring our talent? Reach out and
              our team will guide you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= Contact cards ================= */}
      <section className="container-page -mt-12 pb-4">
        <div className="grid gap-5 md:grid-cols-3">
          {details.map((d, i) => (
            <Reveal key={d.label} effect="rich" delay={i * 110}>
              <a
                href={d.href}
                target={d.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 transition-all duration-500 ease-apple hover:-translate-y-1.5 hover:shadow-lift hover:ring-brand-200 dark:bg-white/5 dark:ring-white/10"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-600 to-blue-400 transition-transform duration-500 ease-apple group-hover:scale-x-100" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-all duration-500 ease-apple group-hover:-rotate-6 group-hover:scale-110 dark:bg-white/10 dark:text-blue-300 dark:ring-white/10">
                  <d.icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{d.label}</p>
                <p className="mt-1.5 break-words text-[15px] font-semibold text-slate-800 transition-colors duration-300 group-hover:text-brand-700 dark:text-white">
                  {d.value}
                </p>
                <p className="mt-auto pt-3 text-[13px] text-slate-500 dark:text-slate-400">{d.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= Message section ================= */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Left: dark brand panel */}
          <Reveal effect="rich" className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-8 shadow-lift sm:p-10">
              <div className="anim-drift pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full border border-white/10 bg-blue-300/20" />
              <div className="anim-drift-b pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full border border-white/10 bg-white/10" />

              <span className="relative inline-flex w-fit items-center rounded-full bg-white/15 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white ring-1 ring-white/25">
                Contact
              </span>
              <h2 className="relative mt-5 text-3xl font-extrabold leading-tight !text-white sm:text-4xl">
                Get in Touch
              </h2>
              <p className="relative mt-4 max-w-md leading-relaxed text-blue-100/90">
                Tell us what you are looking for and we will point you in the right direction.
                Whether you want to start a course, apply for an internship, or hire our trained
                talent, we are here to help.
              </p>

              <ul className="relative mt-8 space-y-4">
                {assurances.map((a, i) => (
                  <li
                    key={a.title}
                    className="stagger-item flex items-start gap-3.5 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15"
                    style={{ transitionDelay: `${200 + i * 130}ms` }}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-300 ring-1 ring-emerald-300/30">
                      <IconCheck className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-white">{a.title}</span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-blue-100/80">{a.text}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${CONTACT.phoneDial.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa relative mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-emerald-700 shadow-soft transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white transition-transform duration-300 group-hover/wa:scale-110">
                  <IconWhatsapp className="h-4 w-4" />
                </span>
                Chat with us on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Right: form, matched height */}
          <Reveal effect="rich" delay={120} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white p-8 shadow-lift ring-1 ring-slate-100 sm:p-10 dark:bg-white/5 dark:ring-white/10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-50 blur-2xl dark:bg-blue-400/10" />

              <div className="relative">
                <h2 className="text-2xl font-extrabold tracking-tight">Send us a message</h2>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                  Fill in the form and we will get back to you shortly.
                </p>
              </div>

              <form onSubmit={submit} className="relative mt-7 flex flex-1 flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label">Your name</label>
                    <input name="name" value={form.name} onChange={handle} placeholder="Ardent Matabaro" required className="input" />
                  </div>
                  <div>
                    <label className="label">Your email</label>
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" required className="input" />
                  </div>
                </div>

                <div>
                  <label className="label">Subject</label>
                  <select name="subject" value={form.subject} onChange={handle} required className="input">
                    <option value="">Select a subject</option>
                    <option>Course enrollment</option>
                    <option>Internship program</option>
                    <option>Hire our talent</option>
                    <option>Request a service</option>
                    <option>Something else</option>
                  </select>
                </div>

                <div className="flex flex-1 flex-col">
                  <label className="label">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handle}
                    placeholder="How can we help?"
                    required
                    className="input min-h-[150px] flex-1 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-cta group/send relative inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl text-[14px] font-bold text-white shadow-glow transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.98]"
                >
                  <span className="relative tracking-wide">Send message</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="relative h-4 w-4 transition-transform duration-300 ease-apple group-hover/send:translate-x-1">
                    <path d="m4 12 16-8-6 16-2.5-6.5L4 12Z" />
                  </svg>
                </button>

                <p className="text-center text-xs text-slate-400">
                  By sending this message you agree to be contacted by Up Skills Hub.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Message sent">
        <p className="text-slate-600 dark:text-slate-300">
          Thanks for reaching out. Our team will get back to you within one business day.
        </p>
        <button
          onClick={() => setOpen(false)}
          className="btn-cta mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl text-sm font-bold text-white shadow-glow transition-all duration-300 ease-apple hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Done
        </button>
      </Modal>
    </div>
  );
}
