"use client";

import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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

const visionCardVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const missionCardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: 0.2 },
  },
};

const missionItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function VisionMissionSection() {
  return (
    <section
      id="vision"
      className="bg-linear-to-b from-green-50 to-white py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-gray-900"
            variants={itemVariants}
          >
            Visi &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-700 to-green-500">
              Misi
            </span>
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-600 leading-relaxed"
            variants={itemVariants}
          >
            Kami berkomitmen untuk menjadi lembaga pelatihan terdepan yang
            menghasilkan tenaga kerja profesional, beretika, dan unggul dalam
            kompetensi global.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Card */}
          <motion.div
            className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-green-100 overflow-hidden"
            variants={visionCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative background */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full opacity-50" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-100 rounded-full opacity-50" />

            <div className="relative flex items-start gap-5">
              <motion.div
                className="shrink-0 w-16 h-16 rounded-2xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </motion.div>
              <div className="flex-1">
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-gray-900"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Visi
                </motion.h3>
                <motion.p
                  className="mt-4 text-lg text-gray-700 leading-relaxed font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  "Terciptanya Generasi Yang Kompeten, Berdaya Mandiri,
                  Terampil, Berkualitas, Dengan Kreatifitas Tinggi"
                </motion.p>
              </div>
            </div>

            {/* Vision icon decoration */}
            <motion.div
              className="absolute bottom-4 right-4 text-green-100"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <svg
                className="w-24 h-24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-yellow-100 overflow-hidden"
            variants={missionCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative background */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-100 rounded-full opacity-50" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-100 rounded-full opacity-50" />

            <div className="relative">
              <motion.div
                className="shrink-0 w-16 h-16 rounded-2xl bg-linear-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-400/30 mb-5"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-8 h-8 text-yellow-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </motion.div>

              <motion.h3
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Misi
              </motion.h3>

              <motion.ul
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.li
                  className="flex items-start gap-3"
                  variants={missionItemVariants}
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    Mencetak generasi yang terampil, kompeten, beriman dan
                    bertaqwa serta mengurangi tingkat pengangguran.
                  </span>
                </motion.li>

                <motion.li
                  className="flex items-start gap-3"
                  variants={missionItemVariants}
                  transition={{ delay: 0.1 }}
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    Menumbuhan semangat muda dengan jiwa wirausaha, sehingga
                    terciptanya lapangan pekerjaan.
                  </span>
                </motion.li>

                <motion.li
                  className="flex items-start gap-3"
                  variants={missionItemVariants}
                  transition={{ delay: 0.2 }}
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    Menjadi tenaga terampil yang kompeten, produktif dan
                    profesional sesuai kebutuhan di bidang wirausaha dan
                    dunia industri.
                  </span>
                </motion.li>
              </motion.ul>
            </div>

            {/* Mission icon decoration */}
            <motion.div
              className="absolute bottom-4 right-4 text-yellow-100"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <svg
                className="w-24 h-24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
