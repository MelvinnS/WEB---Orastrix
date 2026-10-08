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
      
      // Beralih ke tema light ketika About card mulai menutupi layar (> 35% height)
      setIsScrolled(scrollY > windowHeight * 0.35);

      // Otomatis update active link berdasarkan posisi scroll
      if (scrollY >= windowHeight * 0.6) {
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

  const isLight = isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 pointer-events-auto select-none ${
        isLight
          ? "bg-white/85 backdrop-blur-md py-4 md:py-5 px-8 md:px-14 shadow-sm border-b border-black/5"
          : "bg-transparent py-6 md:py-8 px-8 md:px-14"
      }`}
    >
      <a
        href="#home"
        onClick={(e) => handleNavClick(e, "#home")}
        className={`flex items-center gap-3 transition-colors duration-300 group ${
          isLight ? "text-[#1F4336]" : "text-white"
        }`}
      >
        <LeafIcon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:rotate-12 duration-300" />
        <span className="tracking-[0.25em] text-sm md:text-base font-semibold">
          ORASTRIX
        </span>
      </a>

      <nav
        className={`flex items-center gap-6 md:gap-10 text-sm font-medium transition-colors duration-300 ${
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
    </header>
  );
}
