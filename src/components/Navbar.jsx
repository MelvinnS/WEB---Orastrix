import React, { useState, useEffect } from "react";
import LeafIcon from "./icons/LeafIcon";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Product", href: "#product" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ activeHref = "#home", theme = "auto" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentActive, setCurrentActive] = useState(activeHref);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    setCurrentActive(activeHref);
  }, [activeHref]);

  useEffect(() => {
    if (theme !== "auto") {
      setIsScrolled(theme === "light");
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const productElem = document.getElementById("product");
      const aboutElem = document.getElementById("about");

      if (productElem) {
        const rect = productElem.getBoundingClientRect();
        // Sembunyikan global navbar saat di dalam section Product (karena punya inner navbar sendiri)
        const isInsideProduct = rect.top <= 80 && rect.bottom >= 150;
        setIsHidden(isInsideProduct);
      } else {
        setIsHidden(false);
      }
      
      // Beralih ke tema light ketika About card mulai menutupi layar (> 35% height)
      setIsScrolled(scrollY > windowHeight * 0.35);

      // Otomatis update active link berdasarkan posisi scroll
      if (productElem && productElem.getBoundingClientRect().top <= windowHeight * 0.4) {
        setCurrentActive("#product");
      } else if (aboutElem && aboutElem.getBoundingClientRect().top <= windowHeight * 0.4) {
        setCurrentActive("#about");
      } else {
        setCurrentActive("#home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (href === "#home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentActive(href);
      return;
    }
    if (href.startsWith("#")) {
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth" });
        setCurrentActive(href);
      }
    }
  };

  const isLight = isScrolled || mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 pointer-events-auto select-none ${
        isHidden ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100 translate-y-0"
      } ${
        isLight
          ? "bg-white/95 backdrop-blur-md py-4 md:py-5 px-6 md:px-14 shadow-sm border-b border-black/5"
          : "bg-transparent py-5 md:py-8 px-6 md:px-14"
      }`}
    >
      {/* Brand Logo */}
      <a
        href="#home"
        onClick={(e) => handleNavClick(e, "#home")}
        className={`flex items-center gap-2.5 transition-colors duration-300 group z-50 ${
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
        className={`hidden md:flex items-center gap-10 text-sm font-medium transition-colors duration-300 ${
          isLight ? "text-[#4B5563]" : "text-white/80"
        }`}
      >
        {NAV_LINKS.map((link) => {
          const isActive = link.href === currentActive;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative pb-1 tracking-wide transition-colors duration-200 ${
                isActive
                  ? isLight
                    ? "text-[#1F4336] font-semibold"
                    : "text-white font-semibold"
                  : isLight
                  ? "hover:text-[#111827]"
                  : "hover:text-white"
              }`}
            >
              {link.label}
              {isActive && (
                <span
                  className={`absolute left-0 right-0 -bottom-1 h-[2px] rounded-full transition-colors duration-300 ${
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
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
        className={`md:hidden z-50 p-2 -mr-2 rounded-lg transition-colors focus:outline-none ${
          isLight ? "text-[#1F4336]" : "text-white"
        }`}
      >
        <svg
          className="w-6 h-6 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          {mobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown / Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-full bg-white/95 backdrop-blur-xl border-b border-black/10 shadow-xl py-6 px-8 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {NAV_LINKS.map((link) => {
            const isActive = link.href === currentActive;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`py-2 text-base font-semibold transition-colors flex items-center justify-between ${
                  isActive
                    ? "text-[#1F4336]"
                    : "text-[#4B5563] hover:text-[#111827]"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#1F4336]" />
                )}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
