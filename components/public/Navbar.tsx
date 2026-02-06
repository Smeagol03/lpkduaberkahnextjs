'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScrollLinks = () => {
      const scrollLinks = document.querySelectorAll('.scroll-link');
      
      const handleClick = (e: Event) => {
        e.preventDefault();
        
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: (targetElement as HTMLElement).offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }
      };

      scrollLinks.forEach(link => {
        link.addEventListener('click', handleClick);
      });

      return () => {
        scrollLinks.forEach(link => {
          link.removeEventListener('click', handleClick);
        });
      };
    };

    handleScrollLinks();
  }, []);

  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">LPK Dua Berkah</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-yellow-400 transition-colors">Beranda</Link>
            <Link href="/paket" className="hover:text-yellow-400 transition-colors">Program</Link>
            <Link href="/daftar" className="hover:text-yellow-400 transition-colors">Pendaftaran</Link>
            <a href="#tentang" className="scroll-link hover:text-yellow-400 transition-colors">Tentang</a>
            <a href="#kontak" className="scroll-link hover:text-yellow-400 transition-colors">Kontak</a>
          </div>

          <div className="hidden md:block">
            <Link 
              href="/admin/login" 
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold py-2 px-6 rounded-full transition duration-300"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="block py-2 hover:text-yellow-400" onClick={toggleMenu}>Beranda</Link>
              <Link href="/paket" className="block py-2 hover:text-yellow-400" onClick={toggleMenu}>Program</Link>
              <Link href="/daftar" className="block py-2 hover:text-yellow-400" onClick={toggleMenu}>Pendaftaran</Link>
              <a href="#tentang" className="block py-2 hover:text-yellow-400 scroll-link" onClick={toggleMenu}>Tentang</a>
              <a href="#kontak" className="block py-2 hover:text-yellow-400 scroll-link" onClick={toggleMenu}>Kontak</a>
              <Link 
                href="/admin/login" 
                className="block py-2 text-center bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold rounded"
                onClick={toggleMenu}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}