import { useNavigate, useLocation } from "react-router-dom";
import { IconFacebook, IconInstagram, IconLinkedin, IconWhatsapp, IconTwitter } from "./icons.jsx";

const quickLinks = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Contact", id: "contact" },
];

const services = [
  "IT Training",
  "Internship Programs",
  "Website Development",
  "Mobile Apps Development",
];

const socials = [
  { Icon: IconInstagram, label: "Instagram", color: "#E4405F" },
  { Icon: IconFacebook, label: "Facebook", color: "#1877F2" },
  { Icon: IconLinkedin, label: "LinkedIn", color: "#0A66C2" },
  { Icon: IconWhatsapp, label: "WhatsApp", color: "#25D366" },
  { Icon: IconTwitter, label: "Twitter", color: "#1DA1F2" },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Same behaviour as the header nav: scroll to a section, going home first if needed.
  const go = (id) => (e) => {
    e.preventDefault();
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 140);
    } else scroll();
  };

  return (
    <footer className="bg-brand-dark text-slate-300">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="max-w-xs">
          <div className="flex items-center gap-2 text-lg font-extrabold text-white">
            <img src="/images/logo.png" alt="Up Skills Hub" className="h-11 w-11 rounded-full object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
            Up Skills Hub
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Empowering youth through IT Training, Internships, and Digital Solutions. Learn, Build &amp;
            Grow with us.
          </p>
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-white">Follow Us</h4>
            <div className="mt-3 flex gap-3">
              {socials.map(({ Icon, label, color }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{ color }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm transition hover:-translate-y-0.5 hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <a href={`#${l.id}`} onClick={go(l.id)} className="transition-colors hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold text-white">Our Services</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {services.map((s) => (
              <li key={s} className="transition-colors hover:text-white">{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold text-white">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>KG 173 Street, Remera, Kigali, Rwanda</li>
            <li>Email: upskillshub.info@gmail.com</li>
            <li>Phone: +250 781 796 283</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Up Skills Hub. All Rights Reserved.
      </div>
    </footer>
  );
}
