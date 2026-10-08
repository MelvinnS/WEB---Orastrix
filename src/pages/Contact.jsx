import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen w-full bg-[#EDEDED] flex flex-col">
      <Navbar activeHref="#contact" />

      <main
        id="contact"
        className="relative flex-1 flex flex-col items-center justify-center px-6 md:px-16 py-28 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-[#1F4336] max-w-2xl">
          Hubungi Kami
        </h1>
        <p className="mt-4 text-sm md:text-base text-black/60 max-w-xl">
          {/* TODO: isi form kontak atau info email/sosial media. */}
          Konten halaman Contact — isi di sini.
        </p>
      </main>

      <Footer />
    </div>
  );
}
