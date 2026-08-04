import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "./Logo.jsx";
import { IconSun, IconMoon } from "./icons.jsx";

// Each menu item is its own page — no scrolling to home sections.
const menu = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/internship", label: "Internship Program" },
  { to: "/talent", label: "Talent Marketplace" },
  { to: "/services", label: "Services" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  const { user, logout } = useAuth();

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

        <ul className="hidden items-center gap-1 lg:flex xl:gap-1.5">
          {menu.map((m) => (
            <li key={m.to}>
              <NavLink
                to={m.to}
                end={m.to === "/"}
                className={({ isActive }) =>
                  `relative block rounded-full px-3 py-2 text-[13px] font-semibold tracking-wide transition-all duration-300 ease-apple xl:px-3.5 ${
                    isActive
                      ? "bg-brand-50 text-brand-700 shadow-inner dark:bg-white/10 dark:text-blue-300"
                      : "text-slate-600 hover:-translate-y-0.5 hover:bg-slate-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-blue-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {m.label}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-500 transition-all duration-300 dark:bg-blue-400 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
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
            <Link
              to="/login"
              className="btn-cta group/login relative inline-flex items-center gap-2.5 rounded-full py-2.5 pl-7 pr-2 text-sm font-bold tracking-wide text-white shadow-glow transition-all duration-300 ease-apple hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.97]"
            >
              LOGIN
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/25 transition-all duration-500 ease-apple group-hover/login:-rotate-45 group-hover/login:bg-white group-hover/login:text-brand-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
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

      {/* Fine gradient hairline under the header */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-300/50 to-transparent dark:via-blue-400/30" />

      {open && (
        <div className="animate-fadeIn border-t border-slate-100 bg-white lg:hidden dark:border-white/10 dark:bg-brand-dark">
          <ul className="container-page flex flex-col py-3">
            {menu.map((m) => (
              <li key={m.to}>
                <NavLink
                  to={m.to}
                  end={m.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `my-0.5 block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                      isActive
                        ? "bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-blue-300"
                        : "text-slate-600 dark:text-slate-300"
                    }`
                  }
                >
                  {m.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-3">
              <Link to="/login" className="btn-cta block w-full rounded-full py-3 text-center text-sm font-bold tracking-wide text-white shadow-glow" onClick={() => setOpen(false)}>LOGIN</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
