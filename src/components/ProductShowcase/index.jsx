import React, { useState, useEffect } from "react";
import Panel from "./Panel";
import ScrollIndicator from "./ScrollIndicator";
import useActivePanel from "../../hooks/useActivePanel";
import { PRODUCTS } from "../../data/products";

export default function ProductShowcase({ onBuy }) {
  const [isMobile, setIsMobile] = useState(false);
  const { activeIndex, activate, setExplicit } = useActivePanel(0);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (activeIndex === -1) {
        setExplicit(0);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [activeIndex]);

  return (
    <div
      className="relative flex flex-col md:flex-row w-full h-full overflow-hidden select-none"
      role="tablist"
      aria-label="Pilihan varian Orastrix"
    >
      {PRODUCTS.map((product, index) => (
        <Panel
          key={product.id}
          product={product}
          index={index}
          isActive={index === activeIndex}
          isMobile={isMobile}
          onActivate={() => activate(index)}
          onBuy={onBuy}
        />
      ))}

      {/* Indikator scroll down dengan bounce halus khusus desktop/tablet */}
      <div className="hidden md:block">
        <ScrollIndicator targetId="about" />
      </div>
    </div>
  );
}
