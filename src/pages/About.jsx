import React from "react";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import useSmoothScroll from "../hooks/useSmoothScroll";

export default function About() {
  useSmoothScroll();

  return (
    <div className="min-h-screen w-full bg-[#F8FAF7] flex flex-col">
      <Navbar activeHref="#about" theme="light" />

      <main className="flex-1 pt-20">
        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}
