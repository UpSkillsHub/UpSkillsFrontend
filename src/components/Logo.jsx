import { useState } from "react";
import { Link } from "react-router-dom";

// Tries the real exported crest first (/images/logo.png), then the built-in
// SVG emblem, then a monogram — so a logo always renders.
const sources = ["/images/logo.png", "/images/logo.svg"];

export default function Logo({ className = "h-11 w-11" }) {
  const [idx, setIdx] = useState(0);
  return (
    <Link to="/" aria-label="Up Skills Hub home" className="flex items-center gap-2">
      {idx < sources.length ? (
        <img
          src={sources[idx]}
          alt="Up Skills Hub"
          className={`${className} rounded-full object-contain`}
          onError={() => setIdx((i) => i + 1)}
        />
      ) : (
        <span className={`${className} grid place-items-center rounded-full bg-brand-600 font-extrabold text-white`}>
          U
        </span>
      )}
    </Link>
  );
}
