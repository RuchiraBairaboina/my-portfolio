import { useEffect, useRef } from "react";

/** A soft neon glow that follows the mouse (desktop only). */
export default function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
