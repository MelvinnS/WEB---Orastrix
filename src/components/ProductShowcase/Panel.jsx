import React from "react";

/**
 * Satu panel produk:
 * - Desktop (md:flex-row): Horizontal accordion (lebar 62% saat aktif, 19% saat non-aktif, hover/focus/click).
 * - Mobile (flex-col): 3 panel vertikal memenuhi 100% viewport layar penuh (h-full).
 *   - Sama seperti desktop, selalu HANYA 1 produk yang terbuka detailnya (tinggi 62%),
 *     sedangkan 2 produk lainnya tetap tertutup/collapsed (masing-masing tinggi 19%),
 *     sehingga total 62% + 19% + 19% = 100% pas memenuhi layar mobile tanpa terpotong.
 *   - Detail (harga, deskripsi, tombol Buy Now) hanya muncul di panel yang aktif.
 *   - Menekan (tap/klik) panel lain akan meng-expand panel tersebut dan menutup panel sebelumnya.
 */
export default function Panel({
  product,
  index = 0,
  isActive,
  isMobile = false,
  onActivate,
  onBuy,
}) {
  const taglineLines = product.tagline.split("\n");

  // Panel aktif 62%, panel tertutup 19% (total 100% tinggi di mobile atau 100% lebar di desktop)
  const panelStyle = isMobile
    ? {
        flexBasis: isActive ? "62%" : "19%",
        height: isActive ? "62%" : "19%",
        width: "100%",
        flexGrow: 0,
        flexShrink: 0,
        backgroundColor: product.bg,
        transition:
          "flex-basis 550ms cubic-bezier(0.22, 1, 0.36, 1), height 550ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "flex-basis, height",
      }
    : {
        flexBasis: isActive ? "62%" : "19%",
        width: isActive ? "62%" : "19%",
        height: "100%",
        flexGrow: 0,
        flexShrink: 0,
        backgroundColor: product.bg,
        transition:
          "flex-basis 650ms cubic-bezier(0.22, 1, 0.36, 1), width 650ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "flex-basis, width",
      };

  return (
    <div
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onActivate();
      }}
      className="relative cursor-pointer overflow-hidden select-none touch-manipulation border-b md:border-b-0 md:border-r border-black/10 last:border-b-0 last:border-r-0"
      style={panelStyle}
    >
      {/* ========================================================================= */}
      {/* 1. KONDISI TERTUTUP DI MOBILE (Hanya nomor + nama varian + kaleng kecil)   */}
      {/* ========================================================================= */}
      {isMobile && !isActive && (
        <div className="absolute inset-0 z-10 flex items-center justify-between px-6 sm:px-10 transition-opacity duration-300">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
              0{index + 1}
            </span>
            <span className="h-[1px] w-6 bg-white/30" />
            <span className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
              {product.name}
            </span>
          </div>

          <div className="pointer-events-none relative flex items-center justify-end">
            <img
              src={product.image}
              alt={`Orastrix ${product.name}`}
              className="w-[80px] sm:w-[95px] object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] -rotate-6"
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. KONDISI AKTIF: Header Watermark & Label (Sesuai Layout Gambar Referensi) */}
      {/* ========================================================================= */}
      <div
        className={`absolute pointer-events-none select-none z-10 ${
          isMobile
            ? index === 0
              ? "top-14 sm:top-20 left-6 sm:left-10"
              : "top-4 sm:top-6 left-6 sm:left-10"
            : "top-28 md:top-32 left-10 md:left-16"
        }`}
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(-10px)",
          transition:
            "opacity 450ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 450ms cubic-bezier(0.22, 1, 0.36, 1) 100ms",
          willChange: "opacity, transform",
        }}
      >
        {/* Label Header "01 —— PORTABLE ORAL CARE TABLET" persis di gambar */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-white/80">
            0{index + 1}
          </span>
          <span className="h-[1px] w-6 sm:w-8 bg-white/40" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-white/90">
            Portable Oral Care Tablet
          </span>
        </div>

        {/* Teks Tagline / Judul Varian Bold */}
        <div>
          {taglineLines.map((line, idx) => {
            const isOutlined = idx === 0 && taglineLines.length > 1;
            return (
              <span
                key={idx}
                className="block font-black uppercase tracking-tight text-3xl sm:text-4xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.88]"
                style={
                  isOutlined
                    ? {
                        WebkitTextStroke: isMobile
                          ? "1.5px rgba(255, 255, 255, 0.9)"
                          : "2px rgba(255, 255, 255, 0.9)",
                        color: "transparent",
                      }
                    : {
                        color: "#FFFFFF",
                      }
                }
              >
                {line}
              </span>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. KONDISI AKTIF: Gambar Kaleng Produk Terbuka                           */}
      {/* ========================================================================= */}
      <div
        className="absolute z-20 pointer-events-none"
        style={
          isMobile
            ? {
                right: "4%",
                bottom: "10%",
                transform: isActive
                  ? "rotate(-7deg) scale(1)"
                  : "rotate(0deg) scale(0.65)",
                opacity: isActive ? 1 : 0,
                transition: "all 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform, opacity, bottom",
              }
            : {
                left: isActive ? "52%" : "50%",
                bottom: isActive ? "12%" : "22%",
                transform: isActive
                  ? "translate(-25%, 0) rotate(-8deg) scale(1)"
                  : "translate(-50%, 0) rotate(0deg) scale(0.68)",
                transition: "all 650ms cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "transform, left, bottom",
              }
        }
      >
        <img
          src={product.image}
          alt={`Orastrix ${product.name}`}
          className="w-[145px] sm:w-[210px] md:w-[420px] lg:w-[500px] xl:w-[540px] max-w-none object-contain drop-shadow-[0_20px_32px_rgba(0,0,0,0.36)]"
          loading="eager"
        />
      </div>

      {/* ========================================================================= */}
      {/* 4. KONDISI AKTIF: Detail Harga, Deskripsi & Tombol Buy Now               */}
      {/* ========================================================================= */}
      <div
        className={`absolute z-30 flex flex-col gap-1.5 sm:gap-2.5 ${
          isMobile
            ? "left-6 sm:left-10 bottom-3.5 sm:bottom-6 max-w-[200px] sm:max-w-[260px]"
            : "left-10 md:left-16 bottom-12 md:bottom-14 max-w-[260px] md:max-w-[300px]"
        }`}
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(10px)",
          transition:
            "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 150ms",
          pointerEvents: isActive ? "auto" : "none",
          willChange: "opacity, transform",
        }}
      >
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {product.price}
          </span>
          <span className="text-[10px] sm:text-xs text-white/75 font-normal">
            / tin isi 20 tablet
          </span>
        </div>

        <p className="text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed text-white/90 line-clamp-2 md:line-clamp-none">
          {product.description}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBuy?.(product);
          }}
          className="mt-1 self-start bg-white text-[#1F2937] hover:bg-white/95 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
