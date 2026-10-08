import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import ProductShowcase from "../components/ProductShowcase";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function Home() {
  // Aktifkan smooth inertial scrolling via Lenis
  useSmoothScroll();

  const handleBuy = (product) => {
    console.log("Buy:", product.id);
  };

  const containerRef = useRef(null);

  // Scroll progress untuk efek Scroll-Stack ala React Bits
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animasi hero section saat kartu About naik menutup di atasnya
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.75]);
  const heroBorderRadius = useTransform(scrollYProgress, [0, 0.5], ["0px", "24px"]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#111827]">
      {/* Global Fixed Navbar dengan deteksi tema otomatis */}
      <Navbar />

      {/* SECTION 1: HOME PRODUCT SHOWCASE (STICKY CARD 1) */}
      <div className="relative h-screen w-full">
        <motion.div
          id="home"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            borderRadius: heroBorderRadius,
          }}
          className="sticky top-0 h-screen w-full overflow-hidden z-10 origin-top select-none"
        >
          <ProductShowcase onBuy={handleBuy} />
        </motion.div>
      </div>

      {/* SECTION 2: ABOUT SECTION (OVERLAY CARD 2 NAIK MENUTUP HERO) */}
      <section id="about" className="relative z-20 w-full min-h-screen">
        <AboutSection />
      </section>

      {/* FOOTER */}
      <div className="relative z-20 bg-[#F8FAF7]">
        <Footer />
      </div>
    </div>
  );
}
