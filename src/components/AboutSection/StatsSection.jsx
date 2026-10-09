import React from "react";
import { motion } from "framer-motion";
import CountUp from "../CountUp";

const statsContainerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const STATS_DATA = [
  {
    id: "tablets",
    number: 20,
    suffix: "",
    label: "TABLET / PACK",
    labelColor: "#1F4336",
  },
  {
    id: "price",
    prefix: "Rp ",
    number: 20,
    suffix: "k",
    label: "HARGA / PACK",
    labelColor: "#1F4336",
  },
  {
    id: "kitosan",
    number: 100,
    suffix: "%",
    label: "KITOSAN ALAMI",
    labelColor: "#1F4336",
  },
  {
    id: "beban",
    from: 100,
    to: 0,
    direction: "down",
    suffix: "%",
    label: "BEBAN HIDUP",
    labelColor: "#D97706",
  },
];

export default function StatsSection() {
  return (
    <motion.div
      variants={statsContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full mt-10 sm:mt-14 md:mt-16 rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-white/90 backdrop-blur-md border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] px-6 sm:px-10 md:px-14 py-10 sm:py-12 md:py-14"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center items-center justify-center">
        {STATS_DATA.map((item) => (
          <motion.div
            key={item.id}
            variants={statItemVariants}
            className="flex flex-col items-center justify-center gap-2 sm:gap-3"
          >
            {/* Angka Raksasa Bold (dengan CountUp) */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111827] leading-none flex items-baseline justify-center">
              {item.prefix && <span>{item.prefix}</span>}
              <CountUp
                from={item.from !== undefined ? item.from : 0}
                to={item.to !== undefined ? item.to : item.number}
                direction={item.direction || "up"}
                duration={2.2}
              />
              {item.suffix && <span>{item.suffix}</span>}
            </div>

            {/* Label Kecil di Bawah Angka (Uppercase Bold Accent) */}
            <span
              className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em]"
              style={{ color: item.labelColor }}
            >
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
