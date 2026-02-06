'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Gambar-gambar untuk galeri
  const galleryImages = [
    { src: "/img/galeri/1.webp", alt: "Galeri 1" },
    { src: "/img/galeri/2.webp", alt: "Galeri 2" },
    { src: "/img/galeri/3.webp", alt: "Galeri 3" },
    { src: "/img/galeri/4.webp", alt: "Galeri 4" },
    { src: "/img/galeri/5.webp", alt: "Galeri 5" },
    { src: "/img/galeri/6.webp", alt: "Galeri 6" },
    { src: "/img/galeri/7.webp", alt: "Galeri 7" },
    { src: "/img/galeri/8.webp", alt: "Galeri 8" },
  ];

  // Fungsi untuk pindah ke gambar berikutnya
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Fungsi untuk pindah ke gambar sebelumnya
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="galeri" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Galeri Kegiatan</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Dokumentasi kegiatan pelatihan dan sertifikasi di LPK
            & LKP 2 BERKAH</p>
        </div>

        <div className="relative carousel-container overflow-hidden rounded-xl shadow-lg">
          {/* Carousel wrapper */}
          <div className="carousel-items relative h-[500px] overflow-hidden">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-300 focus:outline-none z-10"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-300 focus:outline-none z-10"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}