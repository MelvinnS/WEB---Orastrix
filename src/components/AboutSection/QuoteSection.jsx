import React from "react";
import { motion } from "framer-motion";

const quoteContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const quoteItemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function QuoteSection() {
  return (
    <div className="relative w-full mt-16 sm:mt-24 md:mt-28 overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-[#121417] text-white px-6 sm:px-12 md:px-16 lg:px-20 py-14 sm:py-20 md:py-24 shadow-2xl border border-white/5">
      {/* Concentric circular radar lines di sebelah kanan persis seperti di gambar referensi */}
      <div className="absolute -right-16 sm:-right-8 md:right-10 top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
          {/* Outer dashed circle */}
          <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_60s_linear_infinite]" />
          {/* Middle circle with subtle gold tint */}
          <div className="absolute inset-8 sm:inset-10 rounded-full border border-white/10" />
          <div className="absolute inset-16 sm:inset-20 rounded-full border border-amber-500/20" />
          {/* Inner circle */}
          <div className="absolute inset-24 sm:inset-28 rounded-full border border-dashed border-white/10" />
          {/* Ambient center glow */}
          <div className="w-32 h-32 rounded-full bg-amber-500/5 blur-2xl" />
        </div>
      </div>

      {/* Ambient background glow halus */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#1F4336]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={quoteContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center md:items-start text-center md:text-left gap-6 sm:gap-8"
      >
        {/* 5 Bintang Emas/Amber (★★★★★) di bagian atas */}
        <motion.div variants={quoteItemVariants} className="flex items-center gap-1.5 sm:gap-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B] fill-current drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </motion.div>

        {/* Quote Utama dengan animasi timbul dari bawah & highlight italic serif */}
        <motion.div variants={quoteItemVariants}>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.25] sm:leading-[1.3]">
            “Psikolog itu mahal, jadi saya duduk di kursi indomart sambil makan{" "}
            <span className="italic font-serif font-bold text-[#F59E0B] underline decoration-[#F59E0B]/30 underline-offset-4">
              Orastrix
            </span>
            , beban hidup hilang.”
          </blockquote>
        </motion.div>

        {/* Attribution / Penulis Quote */}
        <motion.div
          variants={quoteItemVariants}
          className="flex items-center gap-3 pt-2"
        >
          <span className="h-[1px] w-6 bg-white/20 hidden md:inline-block" />
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-white/50">
            — ISAAC NEWTON
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
