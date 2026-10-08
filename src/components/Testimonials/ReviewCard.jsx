import React from "react";
import StarRating from "./StarRating";

const AVATAR_COLORS = ["#1F4336", "#6E8FB3", "#7A2142", "#B45309", "#4B5563"];

const colorFor = (name) => {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) % 997;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
};

export default function ReviewCard({ review, compact = false, highlight = false }) {
  const initial = (review.name.trim()[0] || "?").toUpperCase();
  return (
    <article
      className={`flex h-full flex-col rounded-2xl bg-white p-6 border shadow-[0_8px_30px_rgba(17,24,39,0.08)] transition-shadow hover:shadow-[0_14px_40px_rgba(17,24,39,0.12)] ${
        highlight ? "border-[#1F4336]/40 ring-2 ring-[#1F4336]/10" : "border-black/5"
      }`}
    >
      <StarRating value={review.rating} size="w-5 h-5" />
      <p
        className={`mt-4 flex-1 text-sm leading-relaxed text-[#4B5563] ${
          compact ? "" : "sm:text-[15px]"
        }`}
      >
        {review.comment}
      </p>
      <div className="mt-6 flex items-center gap-3 pt-4 border-t border-black/5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: colorFor(review.name) }}
          aria-hidden="true"
        >
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-[#111827]">{review.name}</p>
          {highlight && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1F4336]">
              Review kamu
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
