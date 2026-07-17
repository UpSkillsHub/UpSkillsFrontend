import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "./Logo.jsx";
import { IconSun, IconMoon } from "./icons.jsx";

// The header menu items are sections of the single-page home.
const sections = [
  { id: "home", label: "Home" },
  { id: "courses", label: "Courses" },
  { id: "program", label: "Internship Program" },
  { id: "talent", label: "Talent Marketplace" },
  { id: "services", label: "Services" },
  { id: "success", label: "Success Stories" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
];

// Application / training-join form (also used by the home ticker's "Apply Now").
const APPLY_URL = "https://docs.google.com/forms/d/e/1FAIpQLScMG7St3ye7JU7viFJFU1mZdXQcbZDuZ9F9wBiByiVek5SCdQ/viewform";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Toggle light/dark; persist the choice so it survives reloads. Default is light.
  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch (e) {}
    setDark(next);
  };

  // Smooth-scroll to a section; if we're on another route, go home first.
  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 140);
    } else {
      scroll();
    }
  };

  const ThemeToggle = ({ className = "" }) => (
    <button
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`group grid h-10 w-10 place-items-center rounded-xl border-2 border-brand-600 text-brand-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-white/10 ${className}`}
    >
      <span className="relative h-[17px] w-[17px] transition-transform duration-500 ease-apple group-hover:rotate-45">
        <IconSun className={`absolute inset-0 h-[17px] w-[17px] transition-all duration-500 ease-apple ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
        <IconMoon className={`absolute inset-0 h-[17px] w-[17px] transition-all duration-500 ease-apple ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
      </span>
    </button>
  );

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ease-apple ${
        scrolled
          ? "border-b border-slate-100 bg-white/85 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-brand-dark/85"
          : "border-b border-transparent bg-white dark:bg-brand-dark"
      }`}
    >
      <nav className="container-page flex h-[72px] items-center justify-between">
        <Logo />

        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={go(s.id)}
                className="link-underline text-sm font-semibold text-brand-dark transition-colors duration-200 hover:text-brand-600 dark:text-slate-200 dark:hover:text-blue-400"
              >
                {s.label}
              </a>
            </li>
          ))}
          {!user && (
            <li>
              <Link to="/login" className="link-underline text-sm font-semibold text-brand-dark transition-colors duration-200 hover:text-brand-600 dark:text-slate-200 dark:hover:text-blue-400">
                Login
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {user ? (
            <>
              {(user.role === "admin" || user.role === "super_admin") && (
                <Link to="/dashboard" className="text-sm font-semibold text-brand-dark hover:text-brand-600 dark:text-slate-200">Dashboard</Link>
              )}
              <button onClick={logout} className="btn-primary rounded-full px-7 py-2.5">Log out</button>
            </>
          ) : (
            <>
              <a
                href="#talent"
                onClick={go("talent")}
                className="inline-flex items-center rounded-xl border-2 border-brand-600 px-4 py-2 text-xs font-bold tracking-wide text-brand-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-white/10"
              >
                Hire Talent
              </a>
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-brand-600 px-4 py-2 text-xs font-bold tracking-wide text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-brand-700"
              >
                Apply / Join Training
              </a>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-brand-dark transition-all duration-300 dark:bg-white ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-brand-dark transition-all duration-300 dark:bg-white ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-brand-dark transition-all duration-300 dark:bg-white ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="animate-fadeIn border-t border-slate-100 bg-white lg:hidden dark:border-white/10 dark:bg-brand-dark">
          <ul className="container-page flex flex-col py-3">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={go(s.id)} className="block py-2.5 text-sm font-semibold text-brand-dark dark:text-slate-200">
                  {s.label}
                </a>
              </li>
            ))}
            {!user && (
              <li>
                <Link to="/login" onClick={() => setOpen(false)} className="block py-2.5 text-sm font-semibold text-brand-dark dark:text-slate-200">
                  Login
                </Link>
              </li>
            )}
            <li className="mt-3 flex flex-col gap-2">
              <a href="#talent" onClick={go("talent")} className="rounded-xl border-2 border-brand-600 py-2.5 text-center text-sm font-bold text-brand-600 dark:border-blue-400 dark:text-blue-300">
                Hire Talent
              </a>
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-brand-600 py-2.5 text-center text-sm font-bold text-white shadow-glow" onClick={() => setOpen(false)}>
                Apply / Join Training
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
