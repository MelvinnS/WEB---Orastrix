import React from "react";
import { motion } from "framer-motion";
import freshMintImg from "../../assets/products/fresh-mint.png";
import LeafIcon from "../icons/LeafIcon";

export default function SplashScreen() {
  return (
    <div className="relative w-full h-full min-h-screen bg-[#0F1412] text-white flex flex-col items-center justify-center overflow-hidden select-none px-6">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] bg-[#1F4336]/35 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#2E6653]/25 rounded-full blur-[90px] pointer-events-none" />

      {/* Decorative radar concentric circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full border border-white/20 animate-[spin_40s_linear_infinite]" />
        <div className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-[#4ADE80]/30" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 sm:gap-8 max-w-md mx-auto">
        {/* Floating Product Tin: Fresh Mint with spring & subtle float */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 30, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: -6 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex items-center justify-center"
        >
          {/* Subtle glow behind the tin */}
          <div className="absolute w-44 h-44 rounded-full bg-[#1F4336] blur-2xl opacity-60" />

          <motion.img
            src={freshMintImg || "/products/fresh-mint.png"}
            alt="Orastrix Fresh Mint"
            animate={{
              y: [0, -10, 0],
              rotate: [-6, -4, -6],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            }}
            className="relative w-44 sm:w-56 md:w-64 object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)] pointer-events-none"
          />
        </motion.div>

        {/* Text Orastrix & Tagline */}
        <div className="flex flex-col items-center gap-2.5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5"
          >
            <LeafIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#4ADE80]" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.28em] uppercase text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
              ORASTRIX
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-xs sm:text-sm font-medium tracking-[0.22em] uppercase text-[#4ADE80]/90"
          >
            Portable Oral Care Tablet
          </motion.p>
        </div>

        {/* Minimal loading progress indicator */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "120px" }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#4ADE80] to-transparent rounded-full mt-2"
        />
      </div>
    </div>
  );
}
