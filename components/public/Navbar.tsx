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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-linear-to-r from-blue-900 via-blue-800 to-blue-900"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center space-x-3 group transition-all duration-300 ${
              scrolled ? "hover:scale-[1.02]" : ""
            }`}
          >
            <Image
              src="/img/logo.png"
              alt="LPK Dua Berkah Logo"
              width={48}
              height={48}
              className={`object-contain transition-all duration-300 ${
                scrolled ? "" : "drop-shadow-lg"
              } group-hover:scale-110`}
            />
            <div className="flex flex-col">
              <span
                className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-blue-900" : "text-white"
                }`}
              >
                LPK Dua Berkah
              </span>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  scrolled ? "text-blue-600" : "text-yellow-400"
                }`}
              >
                Pelatihan Kerja Profesional
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`relative px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    isActiveLink(link.href)
                      ? scrolled
                        ? "bg-blue-900 text-white shadow-lg"
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
              </div>
            ))}

            {/* CTA Button */}
            <Link
              href="/daftar"
              className={`ml-4 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                scrolled
                  ? "bg-linear-to-r from-yellow-400 to-yellow-500 text-blue-900"
                  : "bg-linear-to-r from-yellow-400 to-yellow-500 text-blue-900"
              }`}
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
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
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`px-4 pb-4 space-y-2 ${
            scrolled ? "bg-white" : "bg-blue-900"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActiveLink(link.href)
                  ? scrolled
                    ? "bg-blue-900 text-white"
                    : "bg-white text-blue-900"
                  : scrolled
                  ? "text-gray-700 hover:bg-blue-50"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href="/daftar"
            onClick={toggleMenu}
            className="block w-full px-4 py-3 mt-4 rounded-xl font-semibold text-center bg-linear-to-r from-yellow-400 to-yellow-500 text-blue-900 shadow-lg"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </nav>
  );
}
