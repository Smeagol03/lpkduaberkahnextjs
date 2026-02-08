'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'motion/react';

const galleryImages = [
  { src: "/img/galeri/1.webp", alt: "Pelatihan Menjahit", category: "Pelatihan" },
  { src: "/img/galeri/2.webp", alt: "Praktik Mengukur", category: "Praktik" },
  { src: "/img/galeri/3.webp", alt: "Pengguntingan Kain", category: "Teknik" },
  { src: "/img/galeri/4.webp", alt: "Hasil Konveksi", category: "Produk" },
  { src: "/img/galeri/5.webp", alt: "Sertifikasi", category: "Sertifikasi" },
  { src: "/img/galeri/6.webp", alt: "Workshop", category: "Workshop" },
  { src: "/img/galeri/7.webp", alt: "Pembelajaran", category: "Pelatihan" },
  { src: "/img/galeri/8.webp", alt: "Kelulusan", category: "Event" },
];

const categories = [
  { id: 'all', label: 'Semua', icon: '🎨' },
  { id: 'Pelatihan', label: 'Pelatihan', icon: '📚' },
  { id: 'Praktik', label: 'Praktik', icon: '✂️' },
  { id: 'Produk', label: 'Produk', icon: '👗' },
  { id: 'Sertifikasi', label: 'Sertifikasi', icon: '🏆' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, filter: "blur(10px)", transform: "translateY(30px) scale(0.95)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transform: "translateY(0) scale(1)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

function GalleryItem({ image, index, onClick }: { image: typeof galleryImages[0]; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-4/3 relative overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 shadow-lg">
            {image.category}
          </span>
        </div>

        {/* Hover Content */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </motion.div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-semibold text-lg">{image.alt}</p>
          <p className="text-white/70 text-sm">Klik untuk memperbesar</p>
        </div>
      </div>
    </motion.div>
  );
}

function Lightbox({ image, onClose }: { image: typeof galleryImages[0] | null; onClose: () => void }) {
  useEffect(() => {
    if (image) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [image]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-50"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Category Badge */}
          <motion.div
            className="absolute top-6 left-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="px-4 py-2 bg-green-500 rounded-full text-sm font-semibold text-white shadow-lg">
              {image.category}
            </span>
          </motion.div>

          {/* Image Container */}
          <motion.div
            className="relative max-w-5xl max-h-[80vh] w-full mx-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1000}
              height={750}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl shadow-2xl"
              priority
            />
            <div className="absolute -bottom-16 left-0 right-0 text-center">
              <p className="text-white text-xl font-semibold">{image.alt}</p>
              <p className="text-white/60 text-sm mt-1">Galeri LPK Dua Berkah</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white/60 text-sm">
              Tekan ESC atau klik luar untuk menutup
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [filteredImages, setFilteredImages] = useState(galleryImages);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="galeri" className="relative py-24 bg-linear-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-green-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Dokumentasi Kegiatan
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Galeri <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Kegiatan</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            dokumentasi kegiatan pelatihan, sertifikasi, dan pencapaian LPK & LKP DUA BERKAH
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                  : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0.2 }}
          key={`grid-${activeCategory}`}
        >
          {filteredImages.map((image, index) => (
            <GalleryItem
              key={image.src}
              image={image}
              index={index}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">📷</div>
            <p className="text-gray-500 text-lg">Tidak ada gambar dalam kategori ini</p>
          </motion.div>
        )}

      </div>

      {/* Lightbox Modal */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}
