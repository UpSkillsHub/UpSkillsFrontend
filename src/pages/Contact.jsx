import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import Modal from "../components/Modal.jsx";
import { IconWhatsapp, IconCheck } from "../components/icons.jsx";


/* Brand-accurate icons for the contact channels */
const GmailIcon = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <path fill="#fff" d="M6 12h36v24H6z" />
    <path fill="#4285F4" d="M42 38h-4V19.5L24 29 10 19.5V38H6a2 2 0 0 1-2-2V13a3 3 0 0 1 4.7-2.5L24 21l15.3-10.5A3 3 0 0 1 44 13v23a2 2 0 0 1-2 2Z" />
    <path fill="#34A853" d="M4 36V17l6 4.3V38H6a2 2 0 0 1-2-2Z" />
    <path fill="#FBBC04" d="M44 36V17l-6 4.3V38h4a2 2 0 0 0 2-2Z" />
    <path fill="#EA4335" d="M4 13a3 3 0 0 1 4.7-2.5L24 21l15.3-10.5A3 3 0 0 1 44 13l-20 13.8L4 13Z" />
  </svg>
);
const WhatsAppIcon = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 32 32" className={className}>
    <path fill="#25D366" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Z" />
    <path fill="#fff" d="M22.3 19.1c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2s-.9 1.1-1.1 1.3c-.2.2-.4.3-.8.1a9.4 9.4 0 0 1-2.8-1.7 10.4 10.4 0 0 1-1.9-2.4c-.2-.4 0-.6.2-.8l.6-.7c.2-.2.2-.4.3-.6a.7.7 0 0 0 0-.7c0-.2-.8-1.9-1-2.6-.3-.7-.6-.6-.8-.6h-.7a1.3 1.3 0 0 0-1 .4 4 4 0 0 0-1.2 3 7 7 0 0 0 1.5 3.7 15.9 15.9 0 0 0 6.1 5.4c2.1.8 2.9.9 4 .7a3.4 3.4 0 0 0 2.2-1.6 2.8 2.8 0 0 0 .2-1.6c-.1-.2-.3-.3-.7-.4Z" />
  </svg>
);
const PhoneIcon = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      fill="#2f4f83"
      d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z"
    />
  </svg>
);
const MapsIcon = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 48 48" className={className}>
    <path fill="#EA4335" d="M24 4a13 13 0 0 0-13 13c0 9.8 13 27 13 27s13-17.2 13-27A13 13 0 0 0 24 4Z" />
    <circle cx="24" cy="17" r="5.4" fill="#fff" />
  </svg>
);

const CONTACT = {
  email: "upskillshub.info@gmail.com",
  phone: "+250 781 796 283",
  phoneDial: "+250781796283",
  address: "KG 173 Street, Remera, Kigali, Rwanda",
};

const details = [
  {
    icon: GmailIcon,
    label: "Email us",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: "We usually reply within a day",
    // Gmail red
    ring: "from-red-300/70 via-slate-100 to-orange-200/60 dark:from-red-400/25 dark:via-white/5 dark:to-orange-400/20",
    glow: "bg-red-100/70 dark:bg-red-400/10",
    label_c: "text-red-600 dark:text-red-300",
    hover_t: "group-hover:text-red-600",
    chip: "bg-red-50 text-red-600 group-hover:bg-red-500 dark:bg-red-500/10 dark:text-red-300",
    dash: "border-red-200 dark:border-red-400/30",
  },
  {
    icon: PhoneIcon,
    label: "Call us",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phoneDial}`,
    note: "Monday to Friday, 8am to 6pm",
    // Brand navy
    ring: "from-brand-300/70 via-slate-100 to-blue-200/60 dark:from-white/20 dark:via-white/5 dark:to-blue-400/20",
    glow: "bg-brand-100/70 dark:bg-blue-400/10",
    label_c: "text-brand-600 dark:text-blue-300",
    hover_t: "group-hover:text-brand-700",
    chip: "bg-brand-50 text-brand-600 group-hover:bg-brand-600 dark:bg-white/10 dark:text-blue-300",
    dash: "border-brand-200 dark:border-blue-400/30",
  },
  {
    icon: MapsIcon,
    label: "Visit our campus",
    value: CONTACT.address,
    href: "https://maps.google.com/?q=KG+173+Street+Remera+Kigali+Rwanda",
    note: "Walk in and meet our trainers",
    // Google Maps blue
    ring: "from-blue-300/70 via-slate-100 to-sky-200/60 dark:from-blue-400/25 dark:via-white/5 dark:to-sky-400/20",
    glow: "bg-blue-100/70 dark:bg-blue-400/10",
    label_c: "text-blue-600 dark:text-blue-300",
    hover_t: "group-hover:text-blue-600",
    chip: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 dark:bg-blue-500/10 dark:text-blue-300",
    dash: "border-blue-200 dark:border-blue-400/30",
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
          {["contact1", "contact2", "contact3", "contact4"].map((name, i) => (
            <img
              key={name}
              src={`/images/contact/${name}.jpg`}
              alt=""
              aria-hidden="true"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
              className="hero-slide absolute inset-0 h-full w-full object-cover"
              style={{ animationDelay: `${i * 6}s, ${-i * 5}s` }}
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
                className={`group relative block h-full rounded-[1.75rem] bg-gradient-to-br ${d.ring} p-px shadow-soft transition-all duration-500 ease-apple hover:-translate-y-2 hover:shadow-lift`}
              >
                <div className="course-card relative flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-1px)] bg-white p-7 dark:bg-[#111a2e]">
                  {/* Light sweeps across on hover */}
                  <div className="service-sheen pointer-events-none absolute inset-0 z-10" />
                  {/* Slow floating glow */}
                  <div className={`card-glow pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl ${d.glow}`} />

                  {/* Icon with pulsing halo + rotating dashed ring */}
                  <div className="relative h-14 w-14">
                    <span className={`orbit-ring absolute -inset-2 rounded-full border border-dashed opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${d.dash}`} style={{ animationDuration: "9s" }} />
                    <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-soft ring-1 ring-slate-100 transition-all duration-500 ease-apple group-hover:-rotate-6 group-hover:scale-110 dark:bg-white/10 dark:ring-white/10">
                      <d.icon className="h-7 w-7" />
                    </span>
                  </div>

                  <p className={`relative mt-6 text-[11px] font-bold uppercase tracking-[0.18em] ${d.label_c}`}>
                    {d.label}
                  </p>
                  <p className={`relative mt-2 break-words text-[15px] font-bold leading-snug text-slate-800 transition-colors duration-300 dark:text-white ${d.hover_t}`}>
                    {d.value}
                  </p>

                  {/* Footer row: note + arrow chip */}
                  <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
                    <p className="text-[12.5px] text-slate-500 dark:text-slate-400">{d.note}</p>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-500 ease-apple group-hover:-rotate-45 group-hover:text-white ${d.chip}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= Message section ================= */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        {/* Shared decorative backdrop: dot grid + drifting glows, behind both columns */}
        <div className="dots-deco pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="anim-drift pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-100/50 blur-3xl dark:bg-blue-400/10" />
        <div className="anim-drift-b pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl dark:bg-brand-400/10" />

        <div className="container-page relative grid items-stretch gap-8 lg:grid-cols-2">
          {/* Left: open editorial text, no box */}
          <Reveal effect="rich" className="h-full">
            <div className="relative flex h-full flex-col justify-center py-2 lg:pr-6">
              <span className="inline-flex w-fit items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-500 dark:text-blue-300">
                <span className="h-px w-7 bg-gradient-to-r from-brand-400 to-transparent" />
                Contact
              </span>
              <h2 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                Get in{" "}
                <span className="animate-gradient bg-gradient-to-r from-brand-600 via-blue-500 to-brand-600 bg-[length:200%_auto] bg-clip-text text-transparent dark:from-blue-300 dark:via-white dark:to-blue-300">
                  Touch
                </span>
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-slate-600 dark:text-slate-300">
                Tell us what you are looking for and we will point you in the right direction.
                Whether you want to start a course, apply for an internship, or hire our trained
                talent, we are here to help.
              </p>

              {/* Assurances as a drawing list */}
              <ul className="relative mt-9 space-y-5 pl-11">
                {/* Connector line that draws itself */}
                <span className="draw-line absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-emerald-400 via-emerald-300/60 to-transparent" />
                {assurances.map((a, i) => (
                  <li
                    key={a.title}
                    className="pop-item group/as relative rounded-2xl px-3 py-2.5 transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:bg-emerald-50/60 dark:hover:bg-emerald-500/10"
                    style={{ transitionDelay: `${250 + i * 180}ms` }}
                  >
                    {/* Animated green check node */}
                    <span className="absolute -left-11 top-2.5 grid h-8 w-8 place-items-center">
                      <span
                        className="absolute inset-0 rounded-full bg-emerald-400/40 opacity-70"
                        style={{ animation: `ping 2.4s cubic-bezier(0,0,0.2,1) ${i * 0.5}s infinite` }}
                      />
                      <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_6px_16px_-6px_rgba(16,185,129,0.9)] ring-4 ring-white transition-transform duration-500 ease-apple group-hover/as:scale-110 dark:ring-brand-900">
                        <IconCheck className="h-4 w-4" />
                      </span>
                    </span>
                    <p className="text-[15px] font-bold text-slate-800 transition-colors duration-300 group-hover/as:text-emerald-700 dark:text-white dark:group-hover/as:text-emerald-300">
                      {a.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{a.text}</p>
                  </li>
                ))}
              </ul>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${CONTACT.phoneDial.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa mt-10 inline-flex w-fit items-center gap-3 rounded-full border-2 border-emerald-500/30 bg-white py-2.5 pl-2.5 pr-6 text-sm font-bold text-emerald-700 transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-soft dark:bg-white/5 dark:text-emerald-300"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-white transition-transform duration-300 group-hover/wa:scale-110">
                  <IconWhatsapp className="h-4 w-4" />
                </span>
                Chat with us on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Right: form, matched height */}
          <Reveal effect="rich" delay={120} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-white/85 p-8 shadow-lift ring-1 ring-slate-100 backdrop-blur-xl sm:p-10 dark:bg-white/5 dark:ring-white/10">
              <div className="dots-deco pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />

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
