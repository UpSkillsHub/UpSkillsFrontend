import { useEffect, useRef } from "react";

// Scales its child based on how centered it is in the viewport: smaller near the
// top/bottom edges, full size when centered. So it grows as you scroll it toward
// the middle and shrinks as it moves away — smooth in both directions.
export default function ScrollScale({ children, className = "", min = 0.82 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const elCenter = rect.top + rect.height / 2;
      const dist = Math.min(1, Math.abs(elCenter - vh / 2) / (vh / 2));
      const s = Math.max(min, 1 - dist * (1 - min));
      el.style.transform = `scale(${s.toFixed(3)})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [min]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
