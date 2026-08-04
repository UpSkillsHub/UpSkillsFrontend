import { Link } from "react-router-dom";
import Reveal from "../components/Reveal.jsx";

// Temporary page shown for menus whose dedicated pages are still being built.
// Each will be replaced with its full page following the website document.
export default function UnderConstruction({ title }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-white dark:from-white/5 dark:to-transparent" />
      <div className="container-page relative flex min-h-[55vh] flex-col items-center justify-center py-24 text-center">
        <Reveal>
          <span className="badge">Coming soon</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            This page is being built. In the meantime, explore our courses or get in touch.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/courses" className="btn-primary rounded-full px-8 py-3">Explore Courses</Link>
            <Link to="/contact" className="rounded-full border-2 border-brand-600 px-8 py-3 text-sm font-bold text-brand-600 transition-colors hover:bg-brand-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-white/10">Contact Us</Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
