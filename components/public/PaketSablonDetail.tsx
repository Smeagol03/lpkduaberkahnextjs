"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const materials = [
  {
    num: "01",
    title: "Pengenalan Teknologi Sablon DTF",
    desc: "Pemahaman konsep dasar Direct to Film, perbandingan dengan sablon manual/DTG, serta prospek bisnis sablon digital.",
    icon: "✨",
  },
  {
    num: "02",
    title: "Keselamatan & Kesehatan Kerja (K3)",
    desc: "Prosedur keselamatan kerja menggunakan mesin heat press suhu tinggi, printer besar, serta penanganan powder lem.",
    icon: "🛡️",
  },
  {
    num: "03",
    title: "Desain Grafis Digital untuk Sablon",
    desc: "Penguasaan software CorelDraw & Photoshop khusus untuk layout sablon, pengaturan resolusi tinggi, dan color profile.",
    icon: "🎨",
  },
  {
    num: "04",
    title: "Pembuatan Desain Vektor & Tipografi",
    desc: "Praktik membuat logo premium, desain kaos tipografi estetik, dan merapikan tracing gambar berformat vektor.",
    icon: "✒️",
  },
  {
    num: "05",
    title: "Pengenalan Media Cetak Film PET",
    desc: "Pemahaman karakteristik PET Film (single/double matte, hot/cold peel) untuk hasil transfer warna yang presisi.",
    icon: "🎞️",
  },
  {
    num: "06",
    title: "Pengoperasian & Manajemen Tinta Printer",
    desc: "Pengenalan mesin printer DTF, pengelolaan sirkulasi tinta putih (white ink circulation), dan setting software RIP.",
    icon: "⚙️",
  },
  {
    num: "07",
    title: "Proses Cetak Desain ke Film PET",
    desc: "Setting layout cetak, mirroring gambar, mencetak warna CMYK bersamaan dengan tinta putih (underbase/overprint).",
    icon: "🖨️",
  },
  {
    num: "08",
    title: "Pemeliharaan & Perawatan Printer DTF",
    desc: "Langkah praktis harian dan mingguan untuk merawat printhead dari penyumbatan, pembersihan wiper blade, dan capping.",
    icon: "🔧",
  },
  {
    num: "09",
    title: "Teknik Penaburan Powder & Curing",
    desc: "Metode menabur lem powder TPU secara merata dan teknik curing menggunakan oven/heater hingga matang sempurna.",
    icon: "🔥",
  },
  {
    num: "10",
    title: "Transfer Desain dengan Heat Press",
    desc: "Pengaturan suhu, tekanan, dan durasi mesin heat press untuk memindahkan desain dari PET film ke media kaos katun.",
    icon: "👕",
  },
  {
    num: "11",
    title: "Transfer ke Berbagai Media Kreatif",
    desc: "Eksperimen menyablon di berbagai bahan berbeda seperti Totebag kanvas, kaos polo lacoste, topi, jaket, dan polo.",
    icon: "👜",
  },
  {
    num: "12",
    title: "Pengendalian Mutu (Quality Control)",
    desc: "Standar penilaian hasil sablon (kepekatan warna, kelenturan, ketahanan cuci) dan pengujian kekuatan rekat sablon.",
    icon: "🎯",
  },
  {
    num: "13",
    title: "Perbaikan Hasil Produksi (Rework)",
    desc: "Teknik membenahi sablon yang kurang sempurna, trik membersihkan sisa lem powder, dan penyelamatan bahan produk.",
    icon: "🔄",
  },
  {
    num: "14",
    title: "Teknik Finishing & Pengemasan",
    desc: "Proses pressing akhir (finishing press) untuk kelenturan maksimal, pelipatan profesional, dan pengemasan premium siap jual.",
    icon: "📦",
  },
  {
    num: "15",
    title: "Perhitungan HPP & Harga Jual",
    desc: "Rumus menghitung modal kaos, tinta, PET film, listrik, tenaga kerja, hingga penentuan harga jual komersial yang menguntungkan.",
    icon: "📊",
  },
  {
    num: "16",
    title: "Pemasaran Digital & Simulasi Produksi",
    desc: "Simulasi menerima pesanan riil, manajemen produksi skala besar, pembuatan konten promosi sosial media, dan pemasaran digital.",
    icon: "🚀",
  },
];

const benefits = [
  {
    title: "Mesin DTF Standar Industri",
    desc: "Praktik langsung menggunakan printer DTF Large Format dan software RIP profesional untuk hasil kualitas pabrik.",
    icon: "🏗️",
  },
  {
    title: "Mentorship Wirausaha",
    desc: "Tidak hanya belajar menyablon, Anda dibimbing langsung cara membangun brand kaos dan menghitung keuntungan bisnis.",
    icon: "🤝",
  },
  {
    title: "Sertifikat Resmi Terakreditasi",
    desc: "Mendapatkan sertifikat resmi dari LPK Dua Berkah yang diakui secara nasional untuk melamar kerja atau legalitas usaha.",
    icon: "📜",
  },
  {
    title: "Bahan Praktik Melimpah",
    desc: "Seluruh PET film, tinta, powder, kaos katun, totebag, dan topi untuk praktik telah disediakan tanpa biaya tambahan.",
    icon: "🎁",
  },
];

export default function PaketSablonDetail() {
  return (
    <div className="bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/20 dark:bg-green-900/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-900/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold"
              >
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Program Spesialis Terbaru
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
              >
                Paket Komplit Wirausaha{" "}
                <span className="bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Sablon DTF
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl"
              >
                Kuasai teknologi sablon digital terpopuler saat ini. Dirancang
                khusus untuk melatih Anda menjadi operator printer DTF ahli
                sekaligus wirausahawan kaos mandiri yang siap bersaing di pasar
                industri kreatif nasional.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 items-center"
              >
                {/* <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 px-6 py-4 rounded-2xl">
                  <span className="text-xs uppercase text-gray-500 font-bold block mb-1">Investasi Program</span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">Rp 4.500.000</span>
                </div> */}
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 px-6 py-4 rounded-2xl">
                  <span className="text-xs uppercase text-gray-500 font-bold block mb-1">
                    Materi Pembelajaran
                  </span>
                  <span className="text-3xl font-black text-green-600 dark:text-green-400">
                    16 Modul Praktik
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4"
              >
                <Link
                  href="/daftar?paket=paket-sablon-dtf"
                  className="inline-flex items-center justify-center bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:from-green-600 hover:to-emerald-700 transform hover:-y-1 hover:shadow-xl transition-all duration-300"
                >
                  Daftar Kelas Sablon DTF Sekarang
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-square w-full max-w-[420px] mx-auto overflow-hidden rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800">
                <Image
                  src="/img/paket/cover/PaketSablon.webp"
                  alt="Paket Sablon DTF LPK Dua Berkah"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transform hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                    Kelas Spesialisasi
                  </span>
                  <h4 className="text-xl font-bold">Wirausaha Sablon DTF</h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Mengapa Memilih Program Sablon LPK Dua Berkah?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Fasilitas terbaik dan metode pembelajaran yang fokus pada praktik
              industri nyata.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum / Materials Grid */}
      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-extrabold text-green-600 dark:text-green-400 tracking-wider uppercase block mb-2">
              Kurikulum Terarah
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              16 Materi Kursus Terpadu
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
              Kurikulum dirancang step-by-step dari pengenalan alat dasar,
              teknik produksi, kalkulasi bisnis, hingga pemasaran komersial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {materials.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 12px 20px -3px rgba(16,185,129,0.1), 0 4px 6px -2px rgba(16,185,129,0.05)",
                }}
                className="relative bg-white dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-md">
                      Modul {m.num}
                    </span>
                    <span className="text-2xl">{m.icon}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-2 leading-snug">
                    {m.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment CTA Banner */}
      <section className="py-12 bg-linear-to-br from-emerald-600 to-green-700 text-white max-w-7xl mx-auto px-6 md:px-12 mb-20 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-black">
              Siap Memulai Bisnis Kaos Sablon Anda Sendiri?
            </h3>
            <p className="text-emerald-100 max-w-2xl text-sm sm:text-base">
              Belajar langsung dengan modul komersial, bimbingan setup printer,
              kalkulasi biaya cetak harian, hingga trik penjualan kaos beromset
              tinggi.
            </p>
          </div>
          <Link
            href="/daftar?paket=paket-sablon-dtf"
            className="shrink-0 bg-white text-green-700 font-extrabold text-base px-8 py-4 rounded-xl shadow-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-300"
          >
            Mulai Belajar Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
