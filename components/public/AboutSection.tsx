"use client";

import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, filter: "blur(8px)", transform: "translateY(20px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transform: "translateY(0)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95, transform: "translateY(30px)" },
  visible: {
    opacity: 1,
    scale: 1,
    transform: "translateY(0)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring" as const, stiffness: 200 },
  },
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, transform: "translateY(20px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Instruktur Ahli",
    description: "Pelatihan profesional dengan instruktur berpengalaman",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Sertifikat Resmi",
    description: "Sertifikat industri yang diakui secara nasional",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Jaminan Kerja",
    description: "Program rekrutmen untuk lulusan terbaik",
  },
];

const stats = [
  { value: 22, suffix: "+", label: "Tahun Pengalaman" },
  { value: 250, suffix: "+", label: "Alumni Sukses" },
  { value: 10, suffix: "+", label: "Mitra Industri" },
  { value: 98, suffix: "%", label: "Tingkat Kepuasan" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-150 h-150 bg-linear-to-bl from-green-100/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-linear-to-tr from-emerald-100/40 to-transparent rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* Stats Section */}
        <motion.div
          className="mb-20"
          variants={statsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statItemVariants}
                className="group text-center p-6 bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </motion.div>
                <p className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Section Label */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Tentang LPK Dua Berkah
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6"
            >
              Membangun Generasi{" "}
              <span className="bg-linear-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Berdaya & Terampil
              </span>{" "}
              Sejak {new Date().getFullYear() - 2003}
            </motion.h2>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                Berdiri sejak tahun 2003, LPK & LKP DUA BERKAH telah menjadi pelopor pendidikan vokasional di Lombok Timur. Berlokasi di{" "}
                <span className="font-semibold text-green-700">Dusun Lendang Bedurik, Kelurahan Sekarteja</span>
                , kami berkomitmen mencetak tenaga kerja profesional yang kompeten dan berdaya mandiri.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Dengan fasilitas lengkap dan instruktur berpengalaman, kami menyediakan program pelatihan menjahit dari level pemula hingga mahir, serta kursus wirausaha konveksi yang siap membantu Anda memulai karir atau bisnis sendiri.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-green-200 shadow-sm hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center mb-3 shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#program"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-emerald-600 px-8 py-4 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Lihat Program</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
              <motion.a
                href="#layanan"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-8 py-4 text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Konsultasi Gratis</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="order-1 lg:order-2 relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Background Shape */}
              <motion.div
                className="absolute -inset-4 bg-linear-to-br from-green-100 to-emerald-100 rounded-3xl -z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />

              {/* Main Image */}
              <motion.div
                className="relative overflow-hidden rounded-2xl shadow-2xl shadow-green-900/10"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/img/galeri/8.webp"
                  alt="Kegiatan Pelatihan LPK Dua Berkah"
                  width={600}
                  height={450}
                  className="w-full h-100 lg:h-125 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-green-900/30 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Badge - Experience */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 z-10"
                variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">{new Date().getFullYear() - 2003}+</p>
                    <p className="text-sm text-gray-500">Tahun Berdiri</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge - Rating */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 z-10"
                variants={badgeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">4.9/5</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">500+ Review</p>
              </motion.div>

              {/* Decorative Dots */}
              <motion.div
                className="absolute -bottom-8 right-12 grid grid-cols-3 gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-green-300/50" />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
