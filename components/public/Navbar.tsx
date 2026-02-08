"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scroll for anchor links
  useEffect(() => {
    const handleScrollLinks = () => {
      const scrollLinks = document.querySelectorAll(".scroll-link");

      const handleClick = (e: Event) => {
        e.preventDefault();

        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute(
          "href"
        );
        if (targetId) {
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            window.scrollTo({
              top: (targetElement as HTMLElement).offsetTop - 80,
              behavior: "smooth",
            });
          }
        }
      };

      scrollLinks.forEach((link) => {
        link.addEventListener("click", handleClick);
      });

      return () => {
        scrollLinks.forEach((link) => {
          link.removeEventListener("click", handleClick);
        });
      };
    };

    handleScrollLinks();
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/paket", label: "Program" },
    { href: "/daftar", label: "Pendaftaran" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-blue-900/10"
          : "bg-linear-to-r from-blue-900 via-blue-800 to-blue-900"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/img/logo.png"
              alt="LPK Dua Berkah Logo"
              width={48}
              height={48}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span
                className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                  scrolled
                    ? "text-blue-900"
                    : "text-white"
                }`}
              >
                LPK Dua Berkah
              </span>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-blue-600"
                    : "text-yellow-400"
                }`}
              >
                Pelatihan Kerja Profesional
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  isActiveLink(link.href)
                    ? scrolled
                      ? "bg-blue-900 text-white shadow-lg shadow-blue-900/30"
                      : "bg-white text-blue-900 shadow-lg"
                    : scrolled
                    ? "text-gray-700 hover:text-blue-900 hover:bg-blue-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
                {isActiveLink(link.href) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-yellow-400" />
                )}
              </Link>
            ))}
            
            {/* CTA Button */}
            <Link
              href="/daftar"
              className={`ml-4 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                scrolled
                  ? "bg-linear-to-r from-yellow-400 to-yellow-500 text-blue-900 shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50"
                  : "bg-linear-to-r from-yellow-400 to-yellow-500 text-blue-900 shadow-lg hover:shadow-yellow-400/40"
              }`}
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled
                ? "bg-blue-50 text-blue-900 hover:bg-blue-100"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 origin-center ${
                  scrolled ? "bg-blue-900" : "bg-white"
                } ${isOpen ? "rotate-45 translate-y-1.75" : ""}`}
              />
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                  scrolled ? "bg-blue-900" : "bg-white"
                } ${isOpen ? "opacity-0 scale-0" : ""}`}
              />
              <span
                className={`w-full h-0.5 rounded-full transition-all duration-300 origin-center ${
                  scrolled ? "bg-blue-900" : "bg-white"
                } ${isOpen ? "-rotate-45 -translate-y-1.75" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`px-4 pb-6 pt-2 space-y-2 ${
            scrolled ? "bg-white" : "bg-blue-900/95 backdrop-blur-md"
          }`}
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 transform ${
                isActiveLink(link.href)
                  ? scrolled
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-900"
                  : scrolled
                  ? "text-gray-700 hover:bg-blue-50 hover:text-blue-900"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <span className="flex items-center space-x-3">
                {link.href === "/" && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )}
                {link.href === "/paket" && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )}
                {link.href === "/daftar" && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )}
                <span>{link.label}</span>
              </span>
            </Link>
          ))}
          
          {/* Mobile CTA Button */}
          <div className="pt-4">
            <Link
              href="/daftar"
              onClick={toggleMenu}
              className="block w-full px-4 py-3.5 rounded-xl font-semibold text-center bg-linear-to-r from-yellow-400 to-yellow-500 text-blue-900 shadow-lg hover:shadow-yellow-400/40 transition-all duration-300"
            >
              🎓 Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
}
