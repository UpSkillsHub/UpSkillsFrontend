import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "./Logo.jsx";

// The header menu items are sections of the single-page home.
const sections = [
  { id: "home", label: "Home" },
  { id: "courses", label: "Courses" },
  { id: "program", label: "Program" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ease-apple ${
        scrolled ? "border-b border-slate-100 bg-white/85 shadow-soft backdrop-blur-xl" : "border-b border-transparent bg-white"
      }`}
    >
      <nav className="container-page flex h-[72px] items-center justify-between">
        <Logo />

        <ul className="hidden items-center gap-9 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={go(s.id)}
                className="link-underline text-sm font-semibold text-brand-dark transition-colors duration-200 hover:text-brand-600"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-semibold text-brand-dark hover:text-brand-600">Dashboard</Link>
              <button onClick={logout} className="btn-primary rounded-full px-7 py-2.5">Log out</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary btn-glow rounded-full px-8 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lift">LOGIN</Link>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-brand-dark transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-brand-dark transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-brand-dark transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </nav>

      {open && (
        <div className="animate-fadeIn border-t border-slate-100 bg-white md:hidden">
          <ul className="container-page flex flex-col py-3">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={go(s.id)} className="block py-2.5 text-sm font-semibold text-brand-dark">
                  {s.label}
                </a>
              </li>
            ))}
            <li className="mt-3">
              <Link to="/login" className="btn-primary w-full rounded-full py-2.5" onClick={() => setOpen(false)}>LOGIN</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
