import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import lemonMintImg from "../../assets/products/lemon-mint.png";
import berryImg from "../../assets/products/berry.png";
import freshMintImg from "../../assets/products/fresh-mint.png";

const VARIANTS = [
  {
    id: "lemon-mint",
    name: "Lemon Mint",
    keyword: "LEMON",
    color: "#6E8FB3",
    glowColor: "rgba(110, 143, 179, 0.5)",
    bgGradient:
      "radial-gradient(circle at 50% 50%, #87a9ce 0%, #57789a 48%, #2e445b 100%)",
    image: lemonMintImg || "/products/lemon-mint.png",
    description:
      "Segar citrus zesty berpadu mint klasik. Diformulasikan untuk mengembalikan kesegaran alami mulut dan meningkatkan rasa percaya diri seketika.",
    price: "Rp 20.000",
  },
  {
    id: "berry",
    name: "Berry",
    keyword: "BERRY",
    color: "#7A2142",
    glowColor: "rgba(122, 33, 66, 0.5)",
    bgGradient:
      "radial-gradient(circle at 50% 50%, #a2355e 0%, #6f1b39 48%, #3c0c1e 100%)",
    image: berryImg || "/products/berry.png",
    description:
      "Sentuhan rasa berry manis-asam yang lembut nan menyegarkan, menjaga napas tetap wangi tanpa sensasi menyengat yang berlebihan.",
    price: "Rp 20.000",
  },
  {
    id: "fresh-mint",
    name: "Fresh Mint",
    keyword: "FRESH",
    color: "#1F4336",
    glowColor: "rgba(31, 67, 54, 0.5)",
    bgGradient:
      "radial-gradient(circle at 50% 50%, #2e6653 0%, #1a3c30 48%, #0d221b 100%)",
    image: freshMintImg || "/products/fresh-mint.png",
    description:
      "Mint murni yang tajam dan tahan lama. Memberikan proteksi antibakteri kitosan alami serta ledakan kesegaran dingin kapan saja.",
    price: "Rp 20.000",
  },
];

export default function ProductInteractive({ onBuy }) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const currentVariant = VARIANTS[activeVariantIndex];

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white flex flex-col justify-between select-none pt-24 sm:pt-28 md:pt-32">
      {/* ========================================================================= */}
      {/* 1. BACKGROUND LAYERS: Radial gradient cross-fade halus antar varian       */}
      {/* ========================================================================= */}
      {VARIANTS.map((v, idx) => (
        <div
          key={v.id}
          className="absolute inset-0 transition-opacity duration-500 ease-in-out pointer-events-none"
          style={{
            background: v.bgGradient,
            opacity: idx === activeVariantIndex ? 1 : 0,
            zIndex: 0,
          }}
        />
      ))}

      {/* Subtle particle / splatter texture overlay bernuansa dinamis */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          zIndex: 1,
        }}
      />

      {/* ========================================================================= */}
      {/* 2. MAIN INTERACTIVE STAGE: Kiri, Tengah (Teks di Atas + Kaleng), Kanan   */}
      {/* ========================================================================= */}
      <main className="relative z-10 w-full flex-1 px-6 sm:px-10 md:px-16 py-6 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* KOLOM KIRI: Judul Headline + Deskripsi Singkat */}
        <div className="w-full lg:w-1/4 flex flex-col gap-3 sm:gap-4 text-center lg:text-left z-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black uppercase tracking-tight text-white leading-[0.95]">
            ELEVATE
            <br />
            YOUR
            <br />
            FRESHNESS
          </h2>

          <AnimatePresence mode="wait">
            <motion.p
              key={currentVariant.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs sm:text-sm text-white/85 leading-relaxed max-w-sm mx-auto lg:mx-0 font-normal"
            >
              {currentVariant.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* TENGAH: Teks Varian di ATAS + Foto Kaleng Produk di Bawahnya */}
        <div className="relative flex-1 w-full flex flex-col items-center justify-center gap-3 sm:gap-5 z-10">
          {/* Teks Varian (LEMON / BERRY / FRESH) tepat di ATAS foto produk */}
          <div className="h-16 sm:h-20 md:h-24 flex items-center justify-center overflow-visible">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentVariant.keyword}
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="font-black tracking-tight text-white select-none text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none drop-shadow-[0_12px_25px_rgba(0,0,0,0.3)] uppercase text-center"
              >
                {currentVariant.keyword}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Gambar Kaleng Produk Orastrix — ukuran proporsional dan lebih besar */}
          <div className="relative flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentVariant.id}
                src={currentVariant.image}
                alt={`Orastrix ${currentVariant.name}`}
                initial={{ opacity: 0, scale: 0.85, rotate: -20, y: 20 }}
                animate={{ opacity: 1, scale: 1, rotate: -12, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, rotate: -4, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-[240px] sm:w-[340px] md:w-[420px] lg:w-[480px] xl:w-[520px] object-contain drop-shadow-[0_35px_50px_rgba(0,0,0,0.5)] max-w-none"
                loading="eager"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* KOLOM KANAN: Label "Choose Your Variant" + 3 Lingkaran Warna Saja */}
        <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-end gap-3 sm:gap-4 z-20">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/80">
            Choose Your Variant
          </span>

          {/* 3 Lingkaran Warna: Biru (Lemon Mint), Merah Marun (Berry), Hijau (Fresh Mint) */}
          <div className="flex items-center gap-3.5">
            {VARIANTS.map((v, idx) => {
              const isSelected = idx === activeVariantIndex;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveVariantIndex(idx)}
                  aria-label={`Pilih varian ${v.name}`}
                  className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300 transform cursor-pointer focus:outline-none ${
                    isSelected
                      ? "scale-115 ring-3 ring-white ring-offset-3 ring-offset-black/20 shadow-lg"
                      : "opacity-75 hover:opacity-100 hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: v.color,
                    boxShadow: isSelected
                      ? `0 0 22px ${v.glowColor}`
                      : undefined,
                  }}
                >
                  {isSelected && (
                    <span className="absolute inset-0 rounded-full border-2 border-white/70" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 3. BOTTOM BAR: Keterangan isi tablet center & Tombol Pill kanan bawah    */}
      {/* ========================================================================= */}
      <footer className="relative z-20 w-full px-6 sm:px-10 md:px-16 pb-8 sm:pb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Placeholder kiri kosong untuk penyeimbang tata letak */}
        <div className="hidden sm:block w-32" />

        {/* Center: "— 30 Chewable Tablets per Pocket Tin —" */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-white/80 tracking-wider uppercase">
          <span className="h-[1px] w-6 sm:w-12 bg-white/40" />
          <span>— 30 Chewable Tablets per Pocket Tin —</span>
          <span className="h-[1px] w-6 sm:w-12 bg-white/40" />
        </div>

        {/* Kanan Bawah: Tombol Pill "Beli Produk Ini ↗" */}
        <button
          type="button"
          onClick={() => onBuy?.(currentVariant)}
          className="bg-white text-[#111827] hover:bg-white/95 text-xs sm:text-sm font-bold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2"
        >
          <span>Beli Produk Ini</span>
          <span className="text-sm">↗</span>
        </button>
      </footer>
    </div>
  );
}
