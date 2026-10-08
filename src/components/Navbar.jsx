import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import LeafIcon from "./icons/LeafIcon";
import { getLenis } from "../hooks/useSmoothScroll";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Product", href: "#product" },
  { label: "Contact", href: "#contact" },
];

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Satu baris navbar. Dirender dua kali (tone "dark" & "light") dengan layout
 * identik, supaya lapisan terang bisa di-clip persis di atas lapisan gelap.
 */
function NavRow({
  tone,
  interactive,
  currentActive,
  mobileMenuOpen,
  onLinkClick,
  onToggleMenu,
}) {
  const isLight = tone === "light";
  const tabIndex = interactive ? undefined : -1;

  return (
    <div className="flex items-center justify-between py-4 md:py-6 px-6 md:px-14">
      {/* Brand Logo */}
      <a
        href="#home"
        tabIndex={tabIndex}
        onClick={(e) => onLinkClick(e, "#home")}
        className={`flex items-center gap-2.5 group ${
          isLight ? "text-[#1F4336]" : "text-white"
        }`}
      >
        <LeafIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:rotate-12 duration-300" />
        <span className="tracking-[0.25em] text-sm md:text-base font-bold">
          ORASTRIX
        </span>
      </a>

      {/* Desktop Navigation Links */}
      <nav
        className={`hidden md:flex items-center gap-10 text-sm font-medium ${
          isLight ? "text-[#4B5563]" : "text-white/85"
        }`}
      >
        {NAV_LINKS.map((link) => {
          const isActive = link.href === currentActive;
          return (
            <a
              key={link.href}
              href={link.href}
              tabIndex={tabIndex}
              onClick={(e) => onLinkClick(e, link.href)}
              className={`relative pb-1 tracking-wide transition-colors duration-200 ${
                isActive
                  ? isLight
                    ? "text-[#1F4336] font-bold"
                    : "text-white font-bold"
                  : isLight
                  ? "hover:text-[#111827]"
                  : "hover:text-white text-white/75"
              }`}
            >
              {link.label}
              {isActive && (
                <span
                  className={`absolute left-0 right-0 -bottom-1 h-[2px] rounded-full ${
                    isLight ? "bg-[#1F4336]" : "bg-white"
                  }`}
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Mobile Hamburger Toggle Button */}
      <button
        type="button"
        tabIndex={tabIndex}
        onClick={onToggleMenu}
        aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
        className={`md:hidden p-2 -mr-2 rounded-lg focus:outline-none ${
          isLight ? "text-[#1F4336]" : "text-white"
        }`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>
  );
}

/**
 * Navbar adaptif.
 *
 * theme="auto"  : lapisan terang di-clip mengikuti tepi atas & bawah section
 *                 #about, sehingga warna navbar berubah tepat di garis kartu
 *                 saat kartu naik / turun (bukan lompat di titik ambang).
 * theme="light" : selalu terang.   theme="dark": selalu transparan + teks putih.
 */
export default function Navbar({ activeHref = "#home", theme = "auto" }) {
  const [currentActive, setCurrentActive] = useState(activeHref);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const lightRef = useRef(null);

  useEffect(() => {
    setCurrentActive(activeHref);
  }, [activeHref]);

  // Clip lapisan terang + deteksi section aktif, sinkron dengan scroll
  useLayoutEffect(() => {
    const header = headerRef.current;
    const light = lightRef.current;
    if (!header || !light) return;

    const update = () => {
      const navH = header.offsetHeight;

      if (theme === "light") {
        light.style.clipPath = "inset(0px)";
        return;
      }
      if (theme === "dark") {
        light.style.clipPath = `inset(${navH}px 0px 0px 0px)`;
        return;
      }

      const aboutElem = document.getElementById("about");
      const productElem = document.getElementById("product");

      // Pita area navbar yang sedang berada di atas kartu About: [top, bottom]
      let top = navH;
      let bottom = navH;
      if (aboutElem) {
        const r = aboutElem.getBoundingClientRect();
        top = clamp(r.top, 0, navH);
        bottom = clamp(r.bottom, 0, navH);
      }
      light.style.clipPath = `inset(${top}px 0px ${navH - bottom}px 0px)`;

      // Section aktif (untuk underline menu)
      if (aboutElem || productElem) {
        const vh = window.innerHeight;
        let active = "#home";
        if (productElem && productElem.getBoundingClientRect().top <= vh * 0.45) {
          active = "#product";
        } else if (aboutElem && aboutElem.getBoundingClientRect().top <= vh * 0.45) {
          active = "#about";
        }
        setCurrentActive(active);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [theme]);

  const scrollToTarget = (target) => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.6, easing: easeInOutCubic });
    } else if (target === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (href === "#home") {
      e.preventDefault();
      scrollToTarget(0);
      setCurrentActive(href);
      return;
    }
    if (href.startsWith("#")) {
      const elem = document.getElementById(href.substring(1));
      if (elem) {
        e.preventDefault();
        scrollToTarget(elem);
        setCurrentActive(href);
      } else {
        // Sedang di halaman lain (mis. /review): kembali ke beranda + anchor
        e.preventDefault();
        window.location.href = "/" + href;
      }
    }
  };

  const rowProps = {
    currentActive,
    mobileMenuOpen,
    onLinkClick: handleNavClick,
    onToggleMenu: () => setMobileMenuOpen((prev) => !prev),
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 select-none transition-colors duration-300 ${
        mobileMenuOpen
          ? "bg-[#111827]/95 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      {/* Lapisan gelap/transparan (teks putih) — lapisan yang bisa diklik */}
      <div style={{ opacity: theme === "light" ? 0 : 1 }}>
        <NavRow tone="dark" interactive {...rowProps} />
      </div>

      {/* Lapisan terang — di-clip persis mengikuti kartu About di bawahnya */}
      <div
        ref={lightRef}
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none bg-[#F8FAF7]/90 backdrop-blur-md border-b border-black/5 ${
          mobileMenuOpen ? "invisible" : ""
        }`}
      >
        <NavRow tone="light" interactive={false} {...rowProps} />
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-full bg-[#111827]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-6 px-8 flex flex-col gap-4 md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === currentActive;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-2 text-base font-semibold transition-colors flex items-center justify-between ${
                  isActive ? "text-white font-bold" : "text-white/70 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-white" />}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
