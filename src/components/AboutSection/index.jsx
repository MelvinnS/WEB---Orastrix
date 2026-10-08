import React from "react";
import { motion } from "framer-motion";
import LeafIcon from "../icons/LeafIcon";
import QuoteSection from "./QuoteSection";
import ScrollReveal from "../ScrollReveal";

// Container variant untuk stagger reveal anak-anaknya (~120ms per elemen/baris)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.13, // 130ms stagger sesuai instruksi 100-150ms
      delayChildren: 0.15,
    },
  },
};

// Teks paragraf (lorem ipsum) — dianimasikan oleh ScrollReveal (scrub mengikuti scroll)
const ABOUT_PARAGRAPH =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Orastrix memadukan kitosan alami berkualitas tinggi dengan formula larut cepat untuk menjaga kesehatan rongga mulut secara menyeluruh kapan pun Anda membutuhkannya.";

// Item variant untuk fade in + slide up yang halus dengan cubic bezier
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AboutSection() {
  return (
    <div className="relative w-full min-h-screen bg-[#F8FAF7] text-[#1F2937] rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[60px] shadow-[0_-30px_90px_rgba(0,0,0,0.38)] border-t border-white/60 overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 pt-28 sm:pt-36 md:pt-40 pb-20 sm:pb-28 md:pb-36 flex flex-col justify-center">
      {/* Background ambient glow halus bernuansa brand Orastrix */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1F4336]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6E8FB3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: "some" }}
          className="flex flex-col gap-6 md:gap-8"
        >
          {/* Eyebrow Label Kecil "ABOUT" */}
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4336]/10 text-[#1F4336] text-xs font-bold tracking-[0.25em] uppercase border border-[#1F4336]/15 shadow-sm">
              <LeafIcon className="w-3.5 h-3.5 text-[#1F4336]" />
              ABOUT
            </span>
          </motion.div>

          {/* Judul Besar dengan Kata Kunci yang Di-highlight Warna Hijau Brand Orastrix */}
          <motion.div variants={itemVariants} className="overflow-hidden">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              Revolusi Perawatan Mulut dengan Sentuhan{" "}
              <span className="relative inline-block text-[#1F4336]">
                Alami
                <span className="absolute left-0 right-0 -bottom-1 h-2 bg-[#1F4336]/20 rounded-full -z-10" />
              </span>{" "}
              yang Berkelanjutan.
            </h2>
          </motion.div>

          {/* Paragraf Lorem Ipsum — animasi ScrollReveal (React Bits): kata-kata
              menyala + blur hilang bertahap mengikuti scroll */}
          <ScrollReveal
            baseOpacity={0.1}
            enableBlur={true}
            baseRotation={3}
            blurStrength={4}
            wordAnimationEnd="bottom center"
            containerClassName="max-w-3xl text-[#4B5563]"
            textClassName="scroll-reveal-text--body"
          >
            {ABOUT_PARAGRAPH}
          </ScrollReveal>

          {/* 3 Pilar Kartu Pendukung bernuansa minimalis */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-10 mt-2 border-t border-black/10"
          >
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl font-bold text-[#1F4336]">01</span>
              <h3 className="mt-2 text-base font-bold text-[#111827]">
                Ekonomi Sirkular
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
                Pemanfaatan biopolimer kitosan alami ramah lingkungan.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl font-bold text-[#1F4336]">02</span>
              <h3 className="mt-2 text-base font-bold text-[#111827]">
                Instant Dissolving
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
                Langsung larut segar di lidah tanpa memerlukan air berkumur.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl font-bold text-[#1F4336]">03</span>
              <h3 className="mt-2 text-base font-bold text-[#111827]">
                Pocket-Ready Tin
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#6B7280]">
                Kemasan kaleng ramping nan mewah, mudah dibawa ke mana saja.
              </p>
            </div>
          </motion.div>

          {/* Section Tambahan: Quote Banner Persis Referensi Gambar */}
          <QuoteSection />
        </motion.div>
      </div>
    </div>
  );
}
