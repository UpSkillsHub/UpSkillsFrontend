import { useState } from "react";
import { SectionHeading } from "../components/Section.jsx";

const faqs = [
  {
    q: "What do I need to know before I start?",
    a: "Nothing! Our beginner tracks assume no prior experience. More advanced courses list any prerequisites on their page.",
  },
  {
    q: "Who teaches the courses?",
    a: "Practitioners currently working in the field — so you learn skills that are relevant to real jobs today.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes, you receive a certificate of completion for every course you finish.",
  },
  {
    q: "Can I pay with mobile money?",
    a: "Yes. We support card and mobile money payments through Flutterwave.",
  },
  {
    q: "Is there a free plan?",
    a: "Absolutely — the Starter plan gives you access to our free courses at no cost.",
  },
];

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-medium text-brand-dark">{q}</span>
        <span className="text-brand">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-sm text-slate-500">{a}</p>}
    </div>
  );
}

export default function Faq() {
  return (
    <div className="container-page py-16">
      <SectionHeading center eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Everything you need to know before you upskill." />
      <div className="mx-auto mt-10 max-w-2xl">
        {faqs.map((f) => (
          <Item key={f.q} {...f} />
        ))}
      </div>
    </div>
  );
}
