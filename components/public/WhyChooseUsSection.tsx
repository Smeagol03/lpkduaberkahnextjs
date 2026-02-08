'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function WhyChooseUsSection() {
  const features = [
    {
      title: 'Profesional',
      text: 'Instruktur berpengalaman & praktisi industri.',
      icon: '🎓',
      color: 'bg-blue-500',
    },
    {
      title: 'Fasilitas',
      text: 'Mesin standar industri & ruang belajar nyaman.',
      icon: '✨',
      color: 'bg-emerald-500',
    },
    {
      title: 'Garansi Kerja',
      text: 'Program rekrutmen tim produksi internal.',
      icon: '💼',
      color: 'bg-amber-500',
    },
    {
      title: 'Networking',
      text: 'Jaringan luas di ekosistem fashion & konveksi.',
      icon: '🌐',
      color: 'bg-purple-500',
    },
  ];

  return (
    <section id="kenapa" className="relative py-24 overflow-hidden bg-slate-50">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-green-100 blur-[120px] opacity-60" />
        <div className="absolute bottom-[10%] right-0 w-[30%] h-[30%] rounded-full bg-emerald-100 blur-[100px] opacity-60" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Visual & Image */}
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="/img/galeri/5.webp"
                alt="Proses Belajar Menjahit"
                width={800}
                height={1000}
                className="w-full h-125 object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-6 -right-6 md:right-0 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-50"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-green-600 font-bold text-lg leading-tight">250+ Alumni Sukses</p>
              <p className="text-slate-500 text-xs mt-1">Telah bergabung dan merintis karir fashion.</p>
            </motion.div>
          </motion.div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-wider text-green-700 uppercase bg-green-100 rounded-full">
                Why Us?
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Bukan Sekadar <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-500">Kursus Biasa</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Kami menggabungkan teknik menjahit tradisional dengan standar industri modern untuk memastikan Anda siap bersaing.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className={`w-12 h-12 ${item.color} bg-opacity-10 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="mt-12 flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/daftar" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all active:scale-95">
                  Mulai Belajar Sekarang
                </button>
              </Link>
              <p className="text-slate-400 text-sm italic">
                *Tersedia kelas weekend & intensif
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}