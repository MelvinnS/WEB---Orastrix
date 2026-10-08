import React from "react";

/**
 * Panel produk khusus MOBILE (< 768px).
 *
 * Aturan tinggi (semua dalam satuan panjang supaya bisa di-transition mulus):
 * - Panel tertutup  : tinggi --c (clamp berdasarkan tinggi layar)
 *                     (panel pertama + NAV_H karena tertutup navbar fixed)
 * - Panel aktif     : sisa layar = 100% - 2*--c - NAV_H
 * Total selalu = 100% tinggi layar -> tidak pernah terpotong / overflow.
 *
 * Hanya 1 panel yang terbuka. Tap panel lain -> panel itu terbuka,
 * panel sebelumnya otomatis menutup.
 */
export const NAV_H = "64px"; // tinggi area navbar fixed di mobile

export default function MobilePanel({
  product,
  index = 0,
  isActive,
  onActivate,
  onBuy,
}) {
  const lines = product.tagline.split("\n");
  const isFirst = index === 0;
  const topOffset = isFirst ? NAV_H : "0px";

  const height = isActive
    ? `calc(100% - 2 * var(--c) - ${NAV_H})`
    : isFirst
    ? `calc(var(--c) + ${NAV_H})`
    : "var(--c)";

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <div
      role="tab"
      aria-selected={isActive}
      aria-label={product.name}
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      className="relative w-full shrink-0 grow-0 overflow-hidden cursor-pointer select-none touch-manipulation"
      style={{
        height,
        backgroundColor: product.bg,
        transition: `height 550ms ${ease}`,
        willChange: "height",
      }}
    >
      {/* ================= TERTUTUP: nomor + nama + kaleng kecil ================= */}
      <div
        className="absolute left-0 right-0 bottom-0 z-10 flex items-center justify-between px-6"
        style={{
          height: "var(--c)",
          opacity: isActive ? 0 : 1,
          pointerEvents: isActive ? "none" : "auto",
          transition: `opacity ${isActive ? 150 : 350}ms ease ${
            isActive ? 0 : 200
          }ms`,
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-bold tracking-[0.25em] text-white/70">
            0{index + 1}
          </span>
          <span className="h-px w-8 shrink-0 bg-white/35" />
          <span className="truncate text-xl font-black uppercase tracking-tight text-white">
            {product.name}
          </span>
        </div>
        <img
          src={product.image}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none shrink-0 object-contain -rotate-6 drop-shadow-[0_8px_14px_rgba(0,0,0,0.3)]"
          style={{ height: "62%", width: "auto", maxWidth: "26vw" }}
        />
      </div>

      {/* ================= AKTIF: layout penuh ================= */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col px-6 pb-5"
        style={{
          top: topOffset,
          paddingTop: isFirst ? "4px" : "18px",
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
          transition: `opacity ${isActive ? 400 : 120}ms ease ${
            isActive ? 220 : 0
          }ms`,
        }}
      >
        {/* Label + judul */}
        <div className="shrink-0">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-[0.25em] text-white/85">
              0{index + 1}
            </span>
            <span className="h-px w-7 bg-white/40" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/90">
              Portable Oral Care Tablet
            </span>
          </div>
          {lines.map((line, i) => {
            const outlined = i === 0 && lines.length > 1;
            return (
              <span
                key={i}
                className="block font-black uppercase leading-[0.9] tracking-tight"
                style={{
                  fontSize: "clamp(1.9rem, 5.4dvh, 2.8rem)",
                  ...(outlined
                    ? {
                        WebkitTextStroke: "1.5px rgba(255,255,255,0.9)",
                        color: "transparent",
                      }
                    : { color: "#fff" }),
                }}
              >
                {line}
              </span>
            );
          })}
        </div>

        {/* Gambar kaleng: mengisi ruang tengah & menyesuaikan tinggi */}
        <div className="relative my-2 min-h-0 flex-1 flex items-center justify-center pointer-events-none">
          <img
            src={product.image}
            alt={`Orastrix ${product.name}`}
            draggable={false}
            className="max-h-full max-w-[78%] object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.38)]"
            style={{
              transform: isActive
                ? "rotate(-7deg) scale(1)"
                : "rotate(0deg) scale(0.7)",
              transition: `transform 550ms ${ease}`,
            }}
          />
        </div>

        {/* Harga, deskripsi, tombol */}
        <div className="shrink-0 flex flex-col gap-1.5">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold tracking-tight text-white">
              {product.price}
            </span>
            <span className="text-[11px] text-white/75">/ tin isi 30 tablet</span>
          </div>
          <p className="text-[13px] leading-snug text-white/90 line-clamp-3">
            {product.description}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBuy?.(product);
            }}
            className="mt-1 self-start rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#1F2937] shadow-md active:scale-95 transition-transform duration-200"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
