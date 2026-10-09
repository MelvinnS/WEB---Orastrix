import React from "react";
import StarRating from "./StarRating";

const AVATAR_COLORS = ["#1F4336", "#6E8FB3", "#7A2142", "#B45309", "#4B5563"];

export const colorFor = (name) => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 997;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
};

export default function ReviewCard({ review, compact = false, highlight = false }) {
  const initial = (review.name.trim()[0] || "?").toUpperCase();
  return (
    <article
      className={`flex h-full flex-col rounded-2xl bg-white p-4 sm:p-6 border-2 border-[#121417] shadow-[3px_6px_0_0_#121417] sm:shadow-[4px_8px_0_0_#121417] ${
        highlight ? "ring-4 ring-[#1F4336]/25" : ""
      }`}
    >
      <StarRating value={review.rating} size="w-4 h-4 sm:w-5 sm:h-5" />
      <p
        className={`mt-3 sm:mt-4 flex-1 text-xs sm:text-sm leading-relaxed text-[#4B5563] ${
          compact ? "" : "sm:text-[15px]"
        }`}
      >
        {review.comment}
      </p>
      <div className="mt-4 sm:mt-6 flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-black/5">
        <span
          className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-bold text-white"
          style={{ backgroundColor: colorFor(review.name) }}
          aria-hidden="true"
        >
          {initial}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs sm:text-sm font-bold text-[#111827]">{review.name}</p>
          {highlight && (
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#1F4336]">
              Review kamu
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
