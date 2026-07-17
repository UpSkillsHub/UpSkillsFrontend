import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconFacebook, IconInstagram, IconLinkedin, IconWhatsapp, IconTwitter, IconChat, IconMapPin, IconMail, IconPhone } from "./icons.jsx";
import ShareStoryModal from "./ShareStoryModal.jsx";

// Matches the header navigation menu.
const quickLinks = [
  { label: "Home", id: "home" },
  { label: "Courses", id: "courses" },
  { label: "Internship Program", id: "program" },
  { label: "Talent Marketplace", id: "talent" },
  { label: "Services", id: "services" },
  { label: "Success Stories", id: "success" },
  { label: "About Us", id: "about" },
  { label: "Contact", id: "contact" },
];

const services = ["IT Training", "Internship Programs", "Website Development", "Mobile Apps Development"];

const socials = [
  { Icon: IconInstagram, label: "Instagram", color: "#E4405F" },
  { Icon: IconFacebook, label: "Facebook", color: "#1877F2" },
  { Icon: IconLinkedin, label: "LinkedIn", color: "#0A66C2" },
  { Icon: IconWhatsapp, label: "WhatsApp", color: "#25D366" },
  { Icon: IconTwitter, label: "Twitter", color: "#1DA1F2" },
];

// Google Maps embed for the Up Skills Hub address (no API key needed).
const MAP_SRC =
  "https://maps.google.com/maps?q=Up%20Skills%20Hub%2C%20KG%20173%20St%2C%20Remera%2C%20Kigali%2C%20Rwanda&t=&z=16&ie=UTF8&iwloc=&output=embed";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

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
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2 text-lg font-extrabold text-white">
            <img src="/images/logo.png" alt="Up Skills Hub" className="h-11 w-11 rounded-full object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
            Up Skills Hub
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Empowering youth through IT Training, Internships, and Digital Solutions. Learn, Build &amp;
            Grow with us.
          </p>
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-white">Follow Us</h4>
            <div className="mt-3 flex gap-3">
              {socials.map(({ Icon, label, color }, i) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{ color, "--sc": color, animationDelay: `${i * 0.25}s` }}
                  className="social-icon animate-float grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2">
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
        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold text-white">Our Services</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            {services.map((s) => (
              <li key={s} className="transition-colors hover:text-white">{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold text-white">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>KG 173 Street, Remera, Kigali, Rwanda</li>
            <li>Email: upskillshub.info@gmail.com</li>
            <li>Phone: +250 781 796 283</li>
          </ul>
        </div>

        {/* Stay connected */}
        <div className="lg:col-span-2">
          <h4 className="text-sm font-semibold text-white">Stay Connected</h4>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Have a story to share? Inspire future trainees with your Up Skills Hub experience.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
          >
            <IconChat className="h-4 w-4 shrink-0" /> Share Your Story
          </button>
        </div>
      </div>

      {/* Find Us — info + distinctively-shaped map */}
      <div className="container-page pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-5">
          {/* Info */}
          <div className="lg:col-span-2">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-100">Find Us</span>
            <h3 className="mt-3 text-2xl font-extrabold text-white">Visit Up Skills Hub</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              We're in the heart of Remera, Kigali. Come say hello, or reach out to us anytime.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2"><IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" /> KG 173 Street, Remera, Kigali, Rwanda</li>
              <li className="flex items-start gap-2"><IconMail className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" /> upskillshub.info@gmail.com</li>
              <li className="flex items-start gap-2"><IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" /> +250 781 796 283</li>
            </ul>
            <a
              href="https://maps.google.com/?q=Up+Skills+Hub,+KG+173+St,+Remera,+Kigali,+Rwanda"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:scale-105 hover:bg-blue-700"
            >
              <IconMapPin className="h-4 w-4" /> Open in Google Maps
            </a>
          </div>

          {/* Map — organic asymmetric shape + glowing border */}
          <div className="lg:col-span-3">
            <div className="map-glow overflow-hidden rounded-[2rem] rounded-bl-[5rem] rounded-tr-[5rem]">
              <iframe
                title="Up Skills Hub location"
                src={MAP_SRC}
                className="h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Up Skills Hub. All Rights Reserved.
      </div>

      <ShareStoryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  );
}
