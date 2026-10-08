import React, { useState } from "react";

const STAR_PATH =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

/** Bintang tampilan saja (readOnly) atau input interaktif (onChange). */
export default function StarRating({ value = 0, onChange, size = "w-5 h-5", className = "" }) {
  const [hover, setHover] = useState(0);
  const interactive = typeof onChange === "function";
  const shown = interactive && hover ? hover : value;

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role={interactive ? "radiogroup" : "img"}
      aria-label={`Rating ${value} dari 5`}
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= shown;
        const star = (
          <svg
            className={`${size} transition-colors duration-150 ${
              filled ? "text-[#F59E0B]" : "text-black/15"
            } fill-current`}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d={STAR_PATH} />
          </svg>
        );
        return interactive ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} bintang`}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            className="p-1 -m-0.5 rounded-md transition-transform hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F4336]/40"
          >
            {star}
          </button>
        ) : (
          <span key={n}>{star}</span>
        );
      })}
    </div>
  );
}
