import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import Modal from "../components/Modal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
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
  "Free guidance on choosing the right course",
  "Fast answers about fees, schedules and enrollment",
  "Support for both students and employers",
];

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
      {/* ================= Hero ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500">
        <div className="anim-drift pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full border border-white/10 bg-blue-400/20 blur-2xl" />
        <div className="anim-drift-b pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full border border-white/10 bg-white/10 blur-2xl" />
        <div className="orbit-ring pointer-events-none absolute -top-20 right-1/4 h-64 w-64 rounded-full border-2 border-dashed border-white/20" style={{ animationDuration: "20s" }} />

        <div className="container-page relative py-16 text-center sm:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white ring-1 ring-white/25 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              We are open
            </span>
            <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-extrabold !text-white sm:text-5xl">
              Let's Talk About Your Future
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-blue-100/90">
              Questions about a course, the internship program, or hiring our talent? Reach out and
              our team will guide you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= Contact cards ================= */}
      <section className="container-page -mt-10 pb-4">
        <div className="grid gap-5 md:grid-cols-3">
          {details.map((d, i) => (
            <Reveal key={d.label} effect="rich" delay={i * 110}>
              <a
                href={d.href}
                target={d.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 transition-all duration-500 ease-apple hover:-translate-y-1.5 hover:shadow-lift hover:ring-blue-200 dark:bg-white/5 dark:ring-white/10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-all duration-500 ease-apple group-hover:-rotate-6 group-hover:scale-110 dark:bg-white/10 dark:text-blue-300 dark:ring-white/10">
                  <d.icon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {d.label}
                </p>
                <p className="mt-1.5 break-words text-[15px] font-semibold text-slate-800 transition-colors duration-300 group-hover:text-blue-600 dark:text-white">
                  {d.value}
                </p>
                <p className="mt-auto pt-3 text-[13px] text-slate-500 dark:text-slate-400">{d.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= Form + info ================= */}
      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: message */}
          <Reveal effect="rich" className="lg:col-span-2">
            <SectionHeading align="left" eyebrow="Contact" title="Get in" accent="Touch" />
            <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-300">
              Tell us what you are looking for and we will point you in the right direction. Whether
              you want to start a course, apply for an internship, or hire our trained talent, we
              are here to help.
            </p>

            <ul className="mt-8 space-y-3.5">
              {assurances.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[15px] text-slate-600 dark:text-slate-300">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>

            {/* WhatsApp shortcut */}
            <a
              href={`https://wa.me/${CONTACT.phoneDial.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/wa mt-8 inline-flex items-center gap-3 rounded-2xl border-2 border-emerald-500/30 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-soft dark:bg-white/5 dark:text-emerald-300"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500 text-white transition-transform duration-300 group-hover/wa:scale-110">
                <IconWhatsapp className="h-4 w-4" />
              </span>
              Chat with us on WhatsApp
            </a>
          </Reveal>

          {/* Right: form */}
          <Reveal effect="rich" delay={120} className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-lift ring-1 ring-slate-100 sm:p-9 dark:bg-white/5 dark:ring-white/10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-50 blur-2xl dark:bg-blue-400/10" />

              <div className="relative">
                <h2 className="text-2xl font-extrabold tracking-tight">Send us a message</h2>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                  Fill in the form and we will get back to you shortly.
                </p>
              </div>

              <form onSubmit={submit} className="relative mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label">Your name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handle}
                      placeholder="Ardent Matabaro"
                      required
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="label">Your email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handle}
                      placeholder="your@email.com"
                      required
                      className="input"
                    />
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

                <div>
                  <label className="label">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handle}
                    placeholder="How can we help?"
                    rows={5}
                    required
                    className="input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-live-blue group/send relative inline-flex h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-blue-600 text-[14px] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(37,99,235,0.65)] transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0 active:scale-[0.98]"
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/35" />
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-apple group-hover/send:translate-x-full" />
                  <span className="relative">Send message</span>
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

      {/* ================= Map ================= */}
      <section className="container-page pb-20">
        <Reveal effect="rich">
          <div className="map-glow overflow-hidden rounded-[2rem] ring-1 ring-slate-100 dark:ring-white/10">
            <iframe
              title="Up Skills Hub location"
              src="https://www.google.com/maps?q=KG%20173%20Street%20Remera%20Kigali%20Rwanda&output=embed"
              className="h-[320px] w-full border-0 sm:h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title="Message sent">
        <p className="text-slate-600 dark:text-slate-300">
          Thanks for reaching out. Our team will get back to you within one business day.
        </p>
        <button
          onClick={() => setOpen(false)}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-blue-600 text-sm font-semibold text-white transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98]"
        >
          Done
        </button>
      </Modal>
    </div>
  );
}
