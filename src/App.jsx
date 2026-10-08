import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";

/**
 * Routing utama. Kalau project-mu belum pakai React Router:
 *   npm install react-router-dom
 *
 * Kalau tim memilih single-page (semua section di satu halaman,
 * navigasi pakai anchor #about / #product / #contact), App.jsx ini
 * bisa disederhanakan jadi langsung render <Home /> saja, lalu
 * tiap section (About/Product/Contact) ditaruh sebagai <section>
 * di dalam Home.jsx. Struktur folder pages/ tetap kepakai kalau nanti
 * ingin pecah jadi halaman terpisah.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
