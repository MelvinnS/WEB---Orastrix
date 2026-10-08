import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LeafIcon from "../icons/LeafIcon";
import ReviewCard from "./ReviewCard";
import { getFeaturedReviews } from "../../lib/reviewStore";

const ease = [0.22, 1, 0.36, 1];

/** Testimoni di beranda: 3 review pilihan admin + tombol ke halaman review. */
export default function TestimonialSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(getFeaturedReviews(3));
  }, []);

  return (
    <div className="w-full mt-20 sm:mt-28 md:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, ease }}
        className="flex flex-col items-center text-center gap-5"
      >
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4336]/10 text-[#1F4336] text-xs font-bold tracking-[0.25em] uppercase border border-[#1F4336]/15 shadow-sm">
          <LeafIcon className="w-3.5 h-3.5 text-[#1F4336]" />
          TESTIMONI
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
          Kata Mereka tentang{" "}
          <span className="relative inline-block text-[#1F4336]">
            Orastrix
            <span className="absolute left-0 right-0 -bottom-1 h-2 bg-[#1F4336]/20 rounded-full -z-10" />
          </span>
        </h2>
      </motion.div>

      <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease, delay: i * 0.13 }}
          >
            <ReviewCard review={review} compact />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        className="mt-10 sm:mt-12 flex justify-center"
      >
        <Link
          to="/review"
          className="inline-flex items-center gap-2 rounded-full bg-[#1F4336] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1F4336]/25 transition-all duration-200 hover:bg-[#173326] hover:scale-105 active:scale-95"
        >
          Tambahkan Review
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}
