import { useEffect, useRef, useState } from "react";

// Fades + slides its children into view on scroll (Apple-style easing lives in
// index.css .reveal). Optional stagger via `delay` in ms.
// effect="rich" uses a deeper Apple-style entrance: rise + scale + blur-to-sharp.
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", effect }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Keep observing so the entrance replays when scrolling back up or down.
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`${effect === "rich" ? "reveal-rich" : "reveal"} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
