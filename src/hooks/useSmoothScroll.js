import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Instance Lenis aktif, bisa diakses komponen lain (mis. Navbar) via getLenis()
let lenisInstance = null;
export const getLenis = () => lenisInstance;

/**
 * Hook untuk mengaktifkan smooth scroll dengan Lenis.
 * Menghasilkan scroll momentum yang halus, lambat, dan mewah (inertia-based).
 * Sinkron dengan GSAP ScrollTrigger (dipakai oleh ScrollReveal).
 */
export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, []);
}
