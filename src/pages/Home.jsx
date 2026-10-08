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

  // Scroll progress untuk transisi stacked-card dari Home ke About
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end start"],
  });

  // Animasi Home saat About naik: Home tetap diam/fixed di posisinya (sticky top-0),
  // dengan efek scale down, opacity, dan border radius halus (kedalaman efek stacked-card)
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const heroBorderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "28px"]);

  // Animasi section About saat discroll:
  // Muncul dari bawah layar menutupi Home secara lambat, halus, dan elegan (overlay penuh)
  const aboutY = useTransform(scrollYProgress, [0, 1], ["30vh", "0vh"]);

  return (
    <div className="relative w-full bg-[#F8FAF7]">
      {/* Global Fixed Navbar dengan deteksi tema otomatis & mobile hamburger */}
      <Navbar />

      {/* TRACK SCROLL-TRIGGER: Hero sticky tetap diam/fixed sementara About naik menutupi */}
      <div ref={heroTrackRef} className="relative w-full h-[200vh]">
        {/* SECTION 1: HOME PRODUCT SHOWCASE (STICKY FIXED-IN-PLACE CARD 1) */}
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden z-10 bg-[#1F4336]">
          <motion.div
            id="home"
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              borderRadius: heroBorderRadius,
            }}
            className="w-full h-full origin-top select-none"
          >
            <ProductShowcase onBuy={handleBuy} />
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: ABOUT SECTION (OVERLAY CARD 2 NAIK DARI BAWAH MENUTUPI HOME) */}
      <motion.section
        id="about"
        style={{
          y: aboutY,
        }}
        className="relative z-20 w-full min-h-screen -mt-[100vh] bg-[#F8FAF7] shadow-[0_-30px_90px_rgba(0,0,0,0.35)]"
      >
        <AboutSection />
      </motion.section>

      {/* SECTION 3: PRODUCT INTERACTIVE (SHOWCASE INTERAKTIF DENGAN VARIANT SWITCHER) */}
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
