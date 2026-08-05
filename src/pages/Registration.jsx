import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import { IconCheck, IconUser, IconGrad, IconCard, IconMail } from "../components/icons.jsx";
import {
  AFRICAN_COUNTRIES,
  PROGRAM_OPTIONS,
  STUDY_LEVELS,
  LEARNING_MODES,
  HEARD_FROM,
  GENDERS,
  FEES,
  PAYMENT_METHODS,
  AGREEMENT_TEXT,
} from "../data/registration.js";

const STEPS = [
  { n: 1, title: "Your details", icon: IconUser },
  { n: 2, title: "Program", icon: IconGrad },
  { n: 3, title: "Payment", icon: IconCard },
];

const EMPTY = {
  fullName: "", email: "", phone: "", gender: "", country: "Rwanda",
  level: "", department: "", institution: "", address: "",
  programs: [], mode: "", heardFrom: "",
  currency: "RWF", payment: "", receipt: null, agree: false, notes: "",
};

export default function Registration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // Close returns to the page the visitor came from, or home as a fallback.
  const close = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  // Lock the page behind the modal and close on Escape.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const handle = (e) => set(e.target.name, e.target.value);
  const toggleProgram = (p) =>
    setForm((f) => ({
      ...f,
      programs: f.programs.includes(p) ? f.programs.filter((x) => x !== p) : [...f.programs, p],
    }));

  const fee = FEES[form.currency];
  const methods = PAYMENT_METHODS.filter((m) => m.currencies.includes(form.currency));
  const activeMethod = methods.find((m) => m.value === form.payment);

  const validate = (s) => {
    if (s === 1) {
      if (!form.fullName || !form.email || !form.phone || !form.gender || !form.country || !form.address)
        return "Please fill in all required fields.";
    }
    if (s === 2) {
      if (!form.level || !form.institution) return "Please complete your education details.";
      if (form.programs.length === 0) return "Select at least one program.";
      if (!form.mode) return "Choose your preferred mode of learning.";
    }
    if (s === 3) {
      if (!form.payment) return "Choose a payment method.";
      if (!form.agree) return "Please accept the confirmation and agreement.";
    }
    return "";
  };

  const next = () => {
    const msg = validate(step);
    if (msg) return setError(msg);
    setError("");
    setStep((s) => Math.min(3, s + 1));
    document.querySelector("[role=dialog]")?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setError("");
    setStep((s) => Math.max(1, s - 1));
    document.querySelector("[role=dialog]")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = (e) => {
    e.preventDefault();
    const msg = validate(3);
    if (msg) return setError(msg);
    setError("");
    setDone(true);
  };

  /* ---------- small building blocks ---------- */
  const Label = ({ children, required }) => (
    <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">
      {children} {required && <span className="text-blue-600">*</span>}
    </label>
  );

  const Choice = ({ checked, onClick, title, note, multi }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all duration-300 ease-apple hover:-translate-y-0.5 ${
        checked
          ? "border-blue-600 bg-blue-50/70 shadow-soft dark:bg-blue-500/10"
          : "border-slate-200 bg-white hover:border-blue-300 dark:border-white/10 dark:bg-white/5"
      }`}
    >
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center border-2 transition-all duration-200 ${
          multi ? "rounded-md" : "rounded-full"
        } ${checked ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 dark:border-white/20"}`}
      >
        {checked && <IconCheck className="h-3 w-3" />}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-800 dark:text-white">{title}</span>
        {note && <span className="block text-xs text-slate-500 dark:text-slate-400">{note}</span>}
      </span>
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-brand-900/75 p-4 backdrop-blur-md sm:p-6"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Training and internship registration"
    >
      <div
        className="anim-pop relative my-auto w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-lift dark:bg-[#0f1830]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ---------- Modal header ---------- */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 px-7 py-7 sm:px-9">
          <div className="anim-drift pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full border border-white/10 bg-blue-300/25" />
          <div className="anim-drift-b pointer-events-none absolute -bottom-16 -right-14 h-48 w-48 rounded-full border border-white/10 bg-white/10" />

          {/* Close / back */}
          <button
            onClick={close}
            aria-label="Back to previous page"
            className="btn-live-red group/x absolute right-4 top-4 z-20 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white shadow-[0_3px_10px_-3px_rgba(220,38,38,0.8)] transition-all duration-300 ease-apple hover:scale-110 hover:from-red-400 hover:to-red-500 active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 transition-transform duration-300 ease-apple group-hover/x:rotate-90">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="relative pr-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white ring-1 ring-white/25 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Enrollment open
            </span>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight !text-white sm:text-3xl">
              Training & Internship Registration
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-blue-100/90">
              Our programs are continuous, so you can join anytime. Online and on-site, weekdays and
              weekends.
            </p>
          </div>
        </div>

        {/* ---------- Body ---------- */}
        <div className="px-7 py-7 sm:px-9">
          {/* Stepper */}
          <ol className="mb-8 flex items-center">
              {STEPS.map((s, i) => {
                const active = step === s.n;
                const complete = step > s.n;
                return (
                  <li key={s.n} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-full border-2 transition-all duration-500 ease-apple ${
                          complete
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : active
                              ? "border-blue-600 bg-blue-600 text-white shadow-[0_6px_18px_-6px_rgba(37,99,235,0.7)]"
                              : "border-slate-200 bg-white text-slate-400 dark:border-white/15 dark:bg-white/5"
                        }`}
                      >
                        {complete ? <IconCheck className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                      </span>
                      <span className={`text-[11px] font-semibold ${active || complete ? "text-slate-800 dark:text-white" : "text-slate-400"}`}>
                        {s.title}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <span className="mx-2 -mt-6 h-0.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        <span
                          className={`block h-full rounded-full bg-emerald-500 transition-all duration-700 ease-apple ${
                            step > s.n ? "w-full" : "w-0"
                          }`}
                        />
                      </span>
                    )}
                  </li>
                );
              })}
          </ol>

          <form onSubmit={submit} className="relative">

              {/* ---------------- Step 1 ---------------- */}
              {step === 1 && (
                <div className="anim-rise relative space-y-5">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Your details</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Tell us who you are so we can create your trainee profile.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label required>Full name</Label>
                      <input name="fullName" value={form.fullName} onChange={handle} placeholder="Ardent Matabaro" className="input" />
                    </div>
                    <div>
                      <Label required>Email</Label>
                      <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" className="input" />
                    </div>
                    <div>
                      <Label required>Phone number</Label>
                      <input name="phone" value={form.phone} onChange={handle} placeholder="+250 7XX XXX XXX" className="input" />
                    </div>
                    <div>
                      <Label required>Country</Label>
                      <select name="country" value={form.country} onChange={handle} className="input">
                        {AFRICAN_COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label required>Gender</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {GENDERS.map((g) => (
                        <Choice key={g} checked={form.gender === g} onClick={() => set("gender", g)} title={g} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label required>Home address</Label>
                    <input name="address" value={form.address} onChange={handle} placeholder="District, sector, street" className="input" />
                  </div>
                </div>
              )}

              {/* ---------------- Step 2 ---------------- */}
              {step === 2 && (
                <div className="anim-rise relative space-y-5">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Program & education</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Choose what you want to learn and how you want to study.
                    </p>
                  </div>

                  <div>
                    <Label required>Level of study</Label>
                    <div className="grid gap-3 sm:grid-cols-4">
                      {STUDY_LEVELS.map((l) => (
                        <Choice key={l} checked={form.level === l} onClick={() => set("level", l)} title={l} />
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label>Department / field of study</Label>
                      <input name="department" value={form.department} onChange={handle} placeholder="e.g. Information Technology" className="input" />
                    </div>
                    <div>
                      <Label required>School / university / workplace</Label>
                      <input name="institution" value={form.institution} onChange={handle} placeholder="Institution name" className="input" />
                    </div>
                  </div>

                  <div>
                    <Label required>Which program(s) would you like to register for?</Label>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {PROGRAM_OPTIONS.map((p) => (
                        <Choice key={p} multi checked={form.programs.includes(p)} onClick={() => toggleProgram(p)} title={p} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label required>Preferred mode of learning</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {LEARNING_MODES.map((m) => (
                        <Choice key={m.value} checked={form.mode === m.value} onClick={() => set("mode", m.value)} title={m.label} note={m.note} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Where did you hear about us?</Label>
                    <select name="heardFrom" value={form.heardFrom} onChange={handle} className="input">
                      <option value="">Select an option</option>
                      {HEARD_FROM.map((h) => <option key={h}>{h}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* ---------------- Step 3 ---------------- */}
              {step === 3 && (
                <div className="anim-rise relative space-y-5">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Payment & confirmation</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Your registration is confirmed after payment.
                    </p>
                  </div>

                  {/* Currency switch */}
                  <div>
                    <Label required>Currency</Label>
                    <div className="inline-flex rounded-2xl bg-slate-100 p-1 dark:bg-white/10">
                      {Object.keys(FEES).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => { set("currency", c); set("payment", ""); }}
                          className={`rounded-xl px-6 py-2 text-sm font-semibold transition-all duration-300 ${
                            form.currency === c ? "bg-white text-blue-700 shadow-soft dark:bg-blue-600 dark:text-white" : "text-slate-500"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fee card */}
                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 p-5 ring-1 ring-blue-100 dark:from-white/5 dark:to-white/5 dark:ring-white/10">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Registration fee</p>
                    <p className="mt-1 text-3xl font-extrabold tracking-tight text-blue-700 dark:text-blue-400">{fee.label}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      One-time. The monthly program fee is paid separately.
                    </p>
                  </div>

                  {/* Payment method */}
                  <div>
                    <Label required>Payment method</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {methods.map((m) => (
                        <Choice key={m.value} checked={form.payment === m.value} onClick={() => set("payment", m.value)} title={m.label} note={m.note} />
                      ))}
                    </div>
                    {activeMethod && (
                      <p className="anim-rise mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-200 dark:ring-emerald-500/20">
                        {activeMethod.detail}
                      </p>
                    )}
                  </div>

                  {/* Receipt upload */}
                  <div>
                    <Label>Upload payment screenshot</Label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 px-4 py-5 transition-colors duration-300 hover:border-blue-400 hover:bg-blue-50/40 dark:border-white/15 dark:hover:bg-white/5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-white/10 dark:text-blue-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M12 16V4m0 0 4 4m-4-4L8 8" /><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-slate-800 dark:text-white">
                          {form.receipt ? form.receipt.name : "Choose a file"}
                        </span>
                        <span className="block text-xs text-slate-500">PDF or image, up to 10 MB</span>
                      </span>
                      <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => set("receipt", e.target.files?.[0] || null)} />
                    </label>
                  </div>

                  <div>
                    <Label>Any questions or comments?</Label>
                    <textarea name="notes" value={form.notes} onChange={handle} rows={3} placeholder="Optional" className="input resize-none" />
                  </div>

                  {/* Agreement */}
                  <button
                    type="button"
                    onClick={() => set("agree", !form.agree)}
                    className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                      form.agree ? "border-blue-600 bg-blue-50/70 dark:bg-blue-500/10" : "border-slate-200 dark:border-white/10"
                    }`}
                  >
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 ${form.agree ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 dark:border-white/20"}`}>
                      {form.agree && <IconCheck className="h-3 w-3" />}
                    </span>
                    <span className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{AGREEMENT_TEXT}</span>
                  </button>

                  {/* Trainee ID notice */}
                  <div className="flex items-start gap-3 rounded-2xl bg-blue-600 p-4 text-white">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
                      <IconMail className="h-5 w-5" />
                    </span>
                    <p className="text-sm leading-relaxed">
                      After submitting this form, the system will send your <strong>Trainee ID</strong> to your email.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <p className="anim-rise mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-100 dark:bg-red-500/10 dark:text-red-300">
                  {error}
                </p>
              )}

              {/* Navigation */}
              <div className="relative mt-8 flex items-center gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex h-12 flex-1 items-center justify-center rounded-2xl border-2 border-slate-300 bg-white text-sm font-semibold text-slate-700 transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:border-slate-400 active:scale-[0.98] sm:flex-none sm:px-8 dark:border-white/20 dark:bg-white/5 dark:text-slate-200"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="btn-live-blue group/n relative inline-flex h-12 flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-blue-600 text-sm font-semibold text-white shadow-[0_6px_18px_-6px_rgba(37,99,235,0.65)] transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/35" />
                    <span className="relative">Continue</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className="relative h-4 w-4 transition-transform duration-300 group-hover/n:translate-x-1">
                      <path d="M5 12h13M12.5 6l5.5 6-5.5 6" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-live-blue group/s relative inline-flex h-12 flex-1 items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-blue-600 text-sm font-semibold text-white shadow-[0_6px_18px_-6px_rgba(37,99,235,0.65)] transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/35" />
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-apple group-hover/s:translate-x-full" />
                    <span className="relative">Submit registration</span>
                  </button>
                )}
              </div>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Want to post tasks and hire our talent instead?{" "}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">Create an employer account</Link>
          </p>
        </div>
      </div>

      {/* Success */}
      <Modal open={done} onClose={() => setDone(false)} title="Registration received">
        <p className="text-slate-600 dark:text-slate-300">
          Thank you for registering with Up Skills Hub. Once your payment is confirmed, the system
          will send your <strong>Trainee ID</strong> to <strong>{form.email || "your email"}</strong>.
        </p>
        <Link
          to="/"
          onClick={() => { setDone(false); setForm(EMPTY); setStep(1); }}
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-blue-600 text-sm font-semibold text-white transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:bg-blue-700 active:scale-[0.98]"
        >
          Back to home
        </Link>
      </Modal>
    </div>
  );
}
