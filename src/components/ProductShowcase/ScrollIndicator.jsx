import React from "react";
import { getLenis } from "../../hooks/useSmoothScroll";

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export default function ScrollIndicator({ targetId = "about" }) {
  const handleScroll = () => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4, easing: easeInOutCubic });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={handleScroll}
      aria-label="Scroll ke bagian About"
      className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors duration-300 group cursor-pointer focus:outline-none"
    >
      <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-white/70 group-hover:text-white transition-colors">
        Scroll Down
      </span>
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all border border-white/20 shadow-md">
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </button>
  );
}
