import React from "react";
import Panel from "./Panel";
import ScrollIndicator from "./ScrollIndicator";
import useActivePanel from "../../hooks/useActivePanel";
import { PRODUCTS } from "../../data/products";

export default function ProductShowcase({ onBuy }) {
  const { activeIndex, activate } = useActivePanel(0);

  return (
    <div
      className="relative flex w-full h-full overflow-hidden"
      role="tablist"
      aria-label="Pilihan varian Orastrix"
    >
      {PRODUCTS.map((product, index) => (
        <Panel
          key={product.id}
          product={product}
          isActive={index === activeIndex}
          onActivate={() => activate(index)}
          onBuy={onBuy}
        />
      ))}

      {/* Indikator scroll down dengan bounce halus mengarahkan ke section About */}
      <ScrollIndicator targetId="about" />
    </div>
  );
}
