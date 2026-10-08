import { useState } from "react";

/**
 * Mengelola index panel yang sedang aktif/melebar pada ProductShowcase.
 * Dipisah jadi hook sendiri supaya logic-nya gampang dipakai ulang
 * (misal kalau nanti section serupa dipakai di halaman Product).
 */
export default function useActivePanel(initialIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const activate = (index) => {
    setActiveIndex(index);
  };

  const setExplicit = (index) => setActiveIndex(index);

  return { activeIndex, activate, setExplicit };
}
