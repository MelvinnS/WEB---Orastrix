import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LeafIcon from "../icons/LeafIcon";

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800; // 1.8 detik durasi animasi loading yang pas dan dinamis
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // Kurva easing cubic in-out yang mulus
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const currentProgress = Math.min(100, Math.round(eased * 100));
      setProgress(currentProgress);

      if (t < 1) {
        requestAnimationFrame(update);
      } else {
        // Beri jeda sangat singkat di 100% sebelum transisi selesai
        const timer = setTimeout(() => {
          onComplete?.();
        }, 250);
        return () => clearTimeout(timer);
      }
    };

    const frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 w-full h-full min-h-screen bg-white text-[#111827] flex flex-col items-center justify-center select-none z-50 px-6">
      <div className="flex flex-col items-center justify-center text-center gap-7 max-w-sm mx-auto">
        {/* Logo & Teks Brand ORASTRIX (Minimalis, Elegan, Bersih di atas Background Putih Polos) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2.5">
            <LeafIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[#1F4336]" />
            <h1 className="text-3xl sm:text-4xl font-black tracking-[0.32em] uppercase text-[#111827]">
              ORASTRIX
            </h1>
          </div>
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#6B7280]">
            Portable Oral Care Tablet
          </p>
        </motion.div>

        {/* Animasi Garis Loading Unik: Jalan dari 0% ke 100% */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-56 sm:w-64 md:w-72 flex flex-col gap-3 mt-4"
        >
          {/* Track Garis Loading */}
          <div className="relative w-full h-[3px] bg-black/5 rounded-full overflow-hidden">
            {/* Garis Progress Berjalan */}
            <div
              className="h-full bg-[#1F4336] rounded-full transition-all duration-75 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Ujung titik garis loading bercahaya lembut */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1F4336] shadow-[0_0_10px_rgba(31,67,54,0.7)]" />
            </div>
          </div>

          {/* Indikator Persentase Angka 0% - 100% */}
          <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#6B7280]">
            <span className="uppercase text-[10px] font-semibold text-black/40">Loading</span>
            <span className="font-bold text-[#1F4336]">{progress}%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
