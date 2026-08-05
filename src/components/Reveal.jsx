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
    // "rich" reveals replay in both scroll directions; the default reveal fires
    // once and stays, which keeps busy pages (like Home) smooth and stable.
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (effect === "rich") {
          setVisible(entry.isIntersecting);
        } else if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [effect]);

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
