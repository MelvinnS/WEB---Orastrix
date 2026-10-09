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
 * Sinkron dengan GSAP ScrollTrigger.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    // Reset scroll posisi awal
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
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

    // Auto-update limit scroll Lenis saat ukuran window/DOM berubah
    const handleResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Amati perubahan ukuran elemen body (misal setelah SplashScreen selesai atau image dimuat)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    // Refresh secara bertahap untuk memastikan ukuran akhir halaman terhitung sempurna
    const timer1 = setTimeout(handleResize, 300);
    const timer2 = setTimeout(handleResize, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, []);
}
