import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import ProductShowcase from "../components/ProductShowcase";
import AboutSection from "../components/AboutSection";
import ProductInteractive from "../components/ProductInteractive";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import useSmoothScroll, { getLenis } from "../hooks/useSmoothScroll";
import SplashScreen from "../components/SplashScreen/SplashScreen";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  // Aktifkan smooth inertial scrolling via Lenis
  useSmoothScroll();

  // State untuk splash screen loader
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSplashComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      const lenis = getLenis();
      if (lenis) {
        lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 150);
  };

  const handleBuy = (product) => {
    console.log("Buy:", product.id);
  };

  const heroTrackRef = useRef(null);

  // Progress selama Home "menempel" (sticky): 0 saat awal, 1 saat About sudah menutup penuh
  const { scrollYProgress } = useScroll({
    target: heroTrackRef,
    offset: ["start start", "end end"],
  });

  // Home overlay gelap halus saat scroll
  const dimOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

  return (
    <div className="relative w-full bg-[#F8FAF7]">
      {/* 1. SPLASH SCREEN DENGAN ANIMASI FADE TRANSISI HALUS */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="splash-overlay"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-50 pointer-events-auto"
          >
            <SplashScreen onComplete={handleSplashComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HALAMAN UTAMA (NATIVE RENDER, SMOOTH & RESPONSIVE) */}
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

      {/* SECTION 4: CONTACT US */}
      <section
        id="contact"
        className="relative z-20 w-full bg-[#F8FAF7] py-16 sm:py-24 px-4 sm:px-6 md:px-8"
      >
        <ContactSection />
      </section>

      {/* FOOTER */}
      <div className="relative z-20 bg-[#F8FAF7]">
        <Footer />
      </div>
    </div>
  );
}
