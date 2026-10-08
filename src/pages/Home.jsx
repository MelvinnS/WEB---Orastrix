import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import ProductShowcase from "../components/ProductShowcase";
import AboutSection from "../components/AboutSection";
import ProductInteractive from "../components/ProductInteractive";
import Footer from "../components/Footer";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function Home() {
  // Aktifkan smooth inertial scrolling via Lenis
  useSmoothScroll();

  const handleBuy = (product) => {
    console.log("Buy:", product.id);
  };

  const heroTrackRef = useRef(null);

  // Progress selama Home "menempel" (sticky): 0 saat awal, 1 saat About sudah menutup penuh
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  // Home TIDAK di-scale / di-fade / di-rounded (itu yang membuat background
  // hijau bocor di tepi). Kesan kedalaman cukup lewat overlay gelap halus.
  const dimOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

  return (
    <div className="relative w-full bg-[#F8FAF7]">
      {/* Global Fixed Navbar: warna berubah mengikuti tepi kartu About */}
      <Navbar />

      {/* TRACK SCROLL: Home sticky diam, About naik menutupinya */}
      <div ref={heroTrackRef} className="relative w-full h-[200vh]">
        {/* SECTION 1: HOME PRODUCT SHOWCASE (sticky, tidak bergerak/scale) */}
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden z-10">
          <div id="home" className="w-full h-full select-none">
            <ProductShowcase onBuy={handleBuy} />
          </div>

          {/* Overlay gelap halus (pengganti scale/opacity) */}
          <motion.div
            style={{ opacity: dimOpacity }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        </div>
      </div>

      {/* SECTION 2: ABOUT (naik 1:1 dengan scroll, menutup Home penuh saat sticky selesai) */}
      <section
        id="about"
        className="relative z-20 w-full min-h-screen -mt-[100vh] bg-[#F8FAF7] shadow-[0_-30px_90px_rgba(0,0,0,0.35)]"
      >
        <AboutSection />
      </section>

      {/* SECTION 3: PRODUCT INTERACTIVE */}
      <section id="product" className="relative z-20 w-full min-h-screen">
        <ProductInteractive onBuy={handleBuy} />
      </section>

      {/* FOOTER */}
      <div className="relative z-20 bg-[#F8FAF7]">
        <Footer />
      </div>
    </div>
  );
}
