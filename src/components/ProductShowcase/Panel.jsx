import React from "react";

/**
 * Satu panel produk. Lebar diatur lewat flex-grow, sehingga transisi
 * antar-state otomatis smooth berkat CSS transition (tidak perlu
 * library animasi tambahan).
 */
export default function Panel({ product, isActive, onActivate, onBuy }) {
  const taglineLines = product.tagline.split("\n");

  return (
    <div
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
      onMouseEnter={onActivate}
      onTouchStart={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onActivate();
      }}
      className="relative h-full cursor-pointer overflow-hidden select-none touch-manipulation"
      style={{
        flexBasis: isActive ? "62%" : "19%",
        width: isActive ? "62%" : "19%",
        flexGrow: 0,
        flexShrink: 0,
        backgroundColor: product.bg,
        transition:
          "flex-basis 650ms cubic-bezier(0.22, 1, 0.36, 1), width 650ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "flex-basis, width",
      }}
    >
      {/* Tipografi Judul Besar (Watermark) Sesuai Referensi */}
      <div
        className="absolute left-4 sm:left-10 md:left-16 top-20 sm:top-28 md:top-32 pointer-events-none select-none z-10"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(-12px)",
          transition:
            "opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 100ms",
          willChange: "opacity, transform",
        }}
      >
        {taglineLines.map((line, idx) => {
          const isOutlined = idx === 0 && taglineLines.length > 1;
          return (
            <span
              key={idx}
              className="block font-black uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.88]"
              style={
                isOutlined
                  ? {
                      WebkitTextStroke: "2px rgba(255, 255, 255, 0.9)",
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

      {/* Foto Produk Kaleng — posisi & skala teranimasi via GPU transform */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          left: isActive ? "52%" : "50%",
          bottom: isActive ? "12%" : "22%",
          transform: isActive
            ? "translate(-25%, 0) rotate(-8deg) scale(1)"
            : "translate(-50%, 0) rotate(0deg) scale(0.68)",
          transition:
            "all 650ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform, left, bottom",
        }}
      >
        <img
          src={product.image}
          alt={`Orastrix ${product.name}`}
          className="w-[230px] sm:w-[320px] md:w-[420px] lg:w-[500px] xl:w-[540px] max-w-none object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.32)]"
          loading="eager"
        />
      </div>

      {/* Info Produk (Deskripsi & Buy Button) — ramah mobile dengan safe area bawah */}
      <div
        className="absolute left-4 sm:left-10 md:left-16 bottom-20 sm:bottom-12 md:bottom-14 z-30 flex flex-col gap-1.5 sm:gap-2 max-w-[200px] sm:max-w-[260px] md:max-w-[300px]"
        style={{
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(12px)",
          transition:
            "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 150ms",
          pointerEvents: isActive ? "auto" : "none",
          willChange: "opacity, transform",
        }}
      >
        <span
          className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium"
          style={{ color: product.textColor, opacity: 0.75 }}
        >
          Portable Oral Care Tablet
        </span>
        <span
          className="text-base sm:text-xl md:text-2xl font-bold"
          style={{ color: product.textColor }}
        >
          {product.price}
        </span>
        <p
          className="text-[11px] sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none"
          style={{ color: product.textColor, opacity: 0.8 }}
        >
          {product.description}
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onBuy?.(product);
          }}
          className="mt-1 sm:mt-2 self-start bg-white text-[#1F2937] hover:bg-white/95 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-1.5 sm:py-2.5 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
