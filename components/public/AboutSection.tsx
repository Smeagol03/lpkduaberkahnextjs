"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const headingVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const imageVariants = {
  hidden: { x: 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.2 },
  },
};

const badgeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "backOut" as const, delay: 0.5 },
  },
};

export default function AboutSection() {
  return (
    <section id="about" className="bg-linear-to-b from-white to-green-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-extrabold text-gray-900"
              variants={headingVariants}
            >
              Tentang{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-700 to-green-500">
                Kami
              </span>
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-gray-600 leading-relaxed"
              variants={textVariants}
            >
              LPK & LKP DUA BERKAH adalah lembaga pelatihan kursus menjahit yang berlokasi
              di{" "}
              <span className="font-semibold text-green-700">
                Dusun Lendang Bedurik, Kelurahan Sekarteja, Kabupaten Lombok Timur
              </span>
              . Kami menyediakan kursus menjahit bagi pemula hingga mahir, serta kursus
              wirausaha konveksi.
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-gray-600 leading-relaxed"
              variants={textVariants}
            >
              Dengan bergabung di LPK & LKP DUA BERKAH, Anda akan mendapatkan pengalaman
              belajar yang menyenangkan dan mendidik. Instruktur kami adalah para ahli
              di bidangnya, sehingga Anda akan mendapatkan pembelajaran yang berkualitas.
            </motion.p>

            {/* Feature Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
              variants={cardVariants}
            >
              <motion.div
                className="p-5 bg-white rounded-xl shadow-lg shadow-green-100 text-center hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-3">
                  <Image
                    src="/img/instructor.png"
                    alt="Instruktur Ahli"
                    width={40}
                    height={40}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h5 className="text-base font-bold text-gray-900">Instruktur Ahli</h5>
                <p className="text-sm text-gray-500 mt-1">Pelatihan profesional</p>
              </motion.div>

              <motion.div
                className="p-5 bg-white rounded-xl shadow-lg shadow-green-100 text-center hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-3">
                  <Image
                    src="/img/certificate.png"
                    alt="Bersertifikat"
                    width={40}
                    height={40}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h5 className="text-base font-bold text-gray-900">Bersertifikat</h5>
                <p className="text-sm text-gray-500 mt-1">Sertifikat diakui industri</p>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={textVariants}
            >
              <motion.a
                href="#program"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-500 px-6 py-3 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Lihat Program Kami</span>
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
              </motion.a>
              <motion.a
                href="#layanan"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-gray-900 font-semibold shadow-lg hover:shadow-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hubungi Kami
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative">
              <Image
                src="/img/galeri/8.webp"
                alt="Tentang Kami"
                width={600}
                height={450}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-tr from-green-900/10 to-transparent rounded-2xl" />
            </div>

            {/* Experience Badge */}
            <motion.div
              className="absolute -bottom-5 -left-5 bg-linear-to-br from-green-600 to-green-500 text-white p-5 rounded-2xl shadow-xl"
              variants={badgeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold opacity-90">Terpercaya Sejak</p>
              <p className="text-3xl font-bold">2003</p>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-green-100 rounded-full -z-10"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
