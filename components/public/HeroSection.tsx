"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const badgeVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const headingVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.1 },
    },
  };

  const paragraphVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.2 },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" as const, delay: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.2 },
    },
  };

  const floatingCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const, delay: 0.9 },
    },
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-linear-to-b from-green-50 to-white"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-400/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            variants={itemVariants}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6"
              variants={badgeVariants}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Pelatihan Terakreditasi
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              variants={headingVariants}
            >
              Selamat Datang di{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-800 to-green-600">
                LPK Dua Berkah
              </span>
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed"
              variants={paragraphVariants}
            >
              Bergabunglah bersama kami untuk pengalaman belajar yang transformatif
              dan skill yang relevan dengan industri. Wujudkan karir impian Anda
              bersama tenaga pengajar profesional.
            </motion.p>

            {/* CTA Button */}
            <motion.div className="mt-8" variants={buttonVariants}>
              <Link
                href="/daftar"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-yellow-400 to-yellow-500 text-green-900 font-semibold shadow-lg shadow-yellow-400/30 hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300"
              >
                <span>Daftar Sekarang</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative order-1 lg:order-2"
            variants={imageVariants}
          >
            <div className="relative">
              <Image
                src="/img/galeri/1.webp"
                alt="Pelatihan di LPK Dua Berkah"
                width={600}
                height={450}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-tr from-green-900/10 to-transparent rounded-2xl" />
            </div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 hidden sm:block"
              variants={floatingCardVariants}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sertifikasi</p>
                  <p className="text-sm text-gray-500">Resmi & Terakreditasi</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
