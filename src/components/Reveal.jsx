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
    // Bidirectional replay with hysteresis: the entrance fires crisply once the
    // element is properly inside the viewport, but it only resets after the
    // element has fully left (plus a margin), so nothing flickers at the edges.
    const showObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    const hideObs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setVisible(false);
      },
      { threshold: 0, rootMargin: "140px 0px 140px 0px" },
    );
    showObs.observe(el);
    hideObs.observe(el);
    return () => {
      showObs.disconnect();
      hideObs.disconnect();
    };
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
