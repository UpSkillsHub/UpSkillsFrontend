import { Link } from "react-router-dom";
import { IconHome } from "../components/icons.jsx";

export default function ComingSoon() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-dark px-4 text-center text-white">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="anim-drift absolute -left-20 top-10 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="anim-drift-b absolute -bottom-16 -right-10 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="animate-float absolute left-[15%] top-[25%] h-3 w-3 rounded-full bg-brand-300/60" />
        <div className="animate-float absolute right-[20%] top-[35%] h-2 w-2 rounded-full bg-brand-200/60" style={{ animationDelay: "1.4s" }} />
      </div>

      <div className="anim-pop relative max-w-lg">
        <img
          src="/images/logo.png"
          alt="Up Skills Hub"
          className="mx-auto h-20 w-20 animate-float rounded-full object-contain"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <span className="mt-6 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-100">
          Coming soon
        </span>
        <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl">We're still working on it</h1>
        <p className="mt-4 leading-relaxed text-brand-100">
          Thank you for signing up! The student area is under active development, please bear with us,
          it will be ready very soon.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/" className="btn rounded-full bg-white px-8 text-brand-dark transition hover:-translate-y-0.5 hover:bg-brand-50">
            <IconHome className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
