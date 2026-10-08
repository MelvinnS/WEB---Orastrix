import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PRODUCTS } from "../data/products";

export default function Product() {
  return (
    <div className="min-h-screen w-full bg-[#EDEDED] flex flex-col">
      <Navbar activeHref="#product" />

      <main
        id="product"
        className="relative flex-1 px-6 md:px-16 py-28 md:py-32"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-[#1F4336] text-center mb-12">
          Semua Varian Orastrix
        </h1>

        {/* TODO: ganti grid sederhana ini dengan layout detail produk
            (galeri foto, komposisi, cara pakai, dll) sesuai kebutuhan. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl p-6 flex flex-col gap-3"
              style={{ backgroundColor: product.bg, color: product.textColor }}
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm opacity-80">{product.description}</p>
              <span className="text-lg font-semibold mt-2">{product.price}</span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
