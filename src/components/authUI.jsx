import { useState } from "react";
import { Link } from "react-router-dom";
import { IconEye, IconEyeOff, IconCheck, IconHome } from "./icons.jsx";

// Curved split-screen shell used by Login, Register and Forgot-password.
export function AuthShell({ brandTitle, brandText, features = [], ctaText, ctaLabel, ctaTo, children }) {
  return (
    <div className="relative min-h-screen bg-slate-100 dark:bg-brand-dark">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 animate-gradient bg-[length:300%_300%] bg-gradient-to-br from-slate-100 via-brand-50 to-slate-200 dark:from-brand-dark dark:via-brand-900 dark:to-brand-dark" />
        <div className="anim-drift absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl" />
        <div className="anim-drift-b absolute right-0 top-1/3 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="anim-drift absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" style={{ animationDelay: "3s" }} />
        <div className="anim-drift-b absolute -bottom-16 -right-10 h-80 w-80 rounded-full bg-brand-300/25 blur-3xl" style={{ animationDelay: "5s" }} />
        <div className="animate-float absolute left-[12%] top-[20%] h-3 w-3 rounded-full bg-brand-400/50" />
        <div className="animate-float absolute right-[18%] top-[28%] h-2 w-2 rounded-full bg-brand-500/50" style={{ animationDelay: "1.2s" }} />
        <div className="animate-float absolute bottom-[18%] left-[24%] h-2.5 w-2.5 rounded-full bg-brand-300/60" style={{ animationDelay: "2.4s" }} />
        <div className="animate-float absolute bottom-[24%] right-[28%] h-2 w-2 rounded-full bg-brand-400/50" style={{ animationDelay: "0.6s" }} />
      </div>

      {/* Back to home */}
      <Link
        to="/"
        className="absolute left-5 top-5 z-30 inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-brand-dark shadow-soft backdrop-blur transition hover:-translate-y-0.5 hover:bg-white dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
      >
        <IconHome className="h-4 w-4" /> Back to home
      </Link>

      {/* Card */}
      <div className="relative flex min-h-screen items-center justify-center p-4 py-16">
        <div className="anim-pop flex w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-white shadow-lift dark:bg-brand-900">
          {/* Brand panel with curved edge */}
          <div className="anim-slide-left relative hidden w-[46%] flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-600 to-brand-900 p-10 text-white lg:flex lg:rounded-r-[6rem]">
            <div className="pointer-events-none absolute -right-8 top-6 h-56 w-56 animate-float rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 left-0 h-64 w-64 animate-float rounded-full bg-white/5 blur-2xl" style={{ animationDelay: "1.5s" }} />
            <Link to="/" className="relative flex items-center gap-2 text-lg font-extrabold">
              <img src="/images/logo.png" alt="" className="h-10 w-10 rounded-full object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
              Up Skills Hub
            </Link>
            <div className="relative">
              <h2 className="animate-gradient bg-gradient-to-r from-white via-blue-300 to-white bg-[length:200%_auto] bg-clip-text text-4xl font-extrabold leading-tight text-transparent">{brandTitle}</h2>
              <p className="mt-4 max-w-xs text-brand-100">{brandText}</p>
              <ul className="mt-8 space-y-3 text-sm text-brand-50">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20"><IconCheck className="h-3.5 w-3.5" /></span>
                    {f}
                  </li>
                ))}
              </ul>
              {ctaTo && (
                <div className="mt-9">
                  <p className="text-sm text-brand-100">{ctaText}</p>
                  <Link to={ctaTo} className="mt-3 inline-block rounded-full border-2 border-white/70 px-8 py-2.5 text-sm font-semibold uppercase tracking-wide transition hover:bg-white hover:text-brand-700">
                    {ctaLabel}
                  </Link>
                </div>
              )}
            </div>
            <p className="relative text-xs text-brand-100">© {new Date().getFullYear()} Up Skills Hub</p>
          </div>

          {/* Form panel */}
          <div className="flex w-full items-center justify-center p-8 sm:p-12 lg:w-[54%]">
            <div className="w-full max-w-sm">
              <Link to="/" className="mb-6 flex items-center gap-2 font-extrabold text-brand-dark lg:hidden">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">U</span> Up Skills Hub
              </Link>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pill text input with a left icon.
export function Field({ icon: IconC, className = "", style, ...props }) {
  return (
    <div className="anim-rise relative" style={style}>
      {IconC && (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <IconC className="h-5 w-5" />
        </span>
      )}
      <input
        {...props}
        className={`w-full rounded-full border border-transparent bg-slate-100 py-3.5 pl-12 pr-4 text-sm text-slate-800 outline-none transition-all duration-200 ease-apple placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-white/15 dark:focus:ring-white/10 ${className}`}
      />
    </div>
  );
}

// Pill password input with icon + show/hide eye toggle.
export function PasswordField({ icon: IconC, style, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <div className="anim-rise relative" style={style}>
      {IconC && (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <IconC className="h-5 w-5" />
        </span>
      )}
      <input
        {...props}
        type={show ? "text" : "password"}
        className="w-full rounded-full border border-transparent bg-slate-100 py-3.5 pl-12 pr-12 text-sm text-slate-800 outline-none transition-all duration-200 ease-apple placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-100 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-400 dark:focus:bg-white/15 dark:focus:ring-white/10"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-brand-600"
      >
        {show ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
      </button>
    </div>
  );
}
