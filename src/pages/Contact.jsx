import { useState } from "react";
import Reveal from "../components/Reveal.jsx";
import Modal from "../components/Modal.jsx";

const details = [
  { label: "Email", value: "hello@upskillshub.com" },
  { label: "Phone", value: "+250 700 000 000" },
  { label: "Office", value: "Kigali, Rwanda" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [open, setOpen] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setOpen(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-white" />
      <div className="container-page relative py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="badge">Contact</span>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Get in touch</h1>
            <p className="mt-4 text-lg text-slate-600">
              Questions about a course or program? We'd love to help — we usually reply within a day.
            </p>
            <dl className="mt-10 space-y-6">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 font-semibold text-brand-600">
                    {d.label.charAt(0)}
                  </span>
                  <div>
                    <dt className="text-sm text-slate-400">{d.label}</dt>
                    <dd className="font-medium text-brand-dark">{d.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={submit} className="card space-y-5 p-8">
              <div>
                <label className="label">Your name</label>
                <input name="name" value={form.name} onChange={handle} placeholder="Jane Doe" required className="input" />
              </div>
              <div>
                <label className="label">Your email</label>
                <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@email.com" required className="input" />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea name="message" value={form.message} onChange={handle} placeholder="How can we help?" rows={5} required className="input" />
              </div>
              <button className="btn-primary w-full">Send message</button>
            </form>
          </Reveal>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Message sent 🎉">
        <p className="text-slate-600">Thanks for reaching out! We'll get back to you within one business day.</p>
        <button onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">Done</button>
      </Modal>
    </div>
  );
}
