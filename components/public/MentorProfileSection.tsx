'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
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

const cardVariants = {
  hidden: { opacity: 0, transform: "translateY(30px) scale(0.98)" },
  visible: {
    opacity: 1,
    transform: "translateY(0) scale(1)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const skillVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, transform: "scale(0.9)" },
  visible: {
    opacity: 1,
    transform: "scale(1)",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      const steps = 45;
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

const skills = [
  { icon: "🧵", name: "Konveksi & Pemasaran", level: 98 },
  { icon: "📐", name: "Konveksi Pesanan", level: 95 },
  { icon: "✂️", name: "Semi & Full Tailor", level: 97 },
  { icon: "👗", name: "Busana Butik", level: 92 },
  { icon: "🎨", name: "Tata Busana", level: 90 },
  { icon: "🏭", name: "Mekanisme Garmen", level: 94 },
];

const achievements = [
  { year: "2003", title: "Berdiri", desc: "Memulai lembaga pelatihan" },
  { year: "2010", title: "Akreditasi", desc: "Terakreditasi resmi" },
  { year: "2015", title: "Ekspansi", desc: "500+ alumni sukses" },
  { year: "2023", title: "Prestasi", desc: "Lembaga terbaik NTB" },
];

const quickStats = [
  { value: 22, suffix: "+", label: "Tahun", sublabel: "Pengalaman" },
  { value: 250, suffix: "+", label: "Alumni", sublabel: "Terlatih" },
  { value: 100, suffix: "%", label: "Komitmen", sublabel: "Kualitas" },
];

export default function MentorProfileSection() {
  return (
    <section className="relative py-24 bg-linear-to-b from-gray-50 to-white overflow-hidden" id="profil">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl" />
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.span 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Pemimpin & Founder
          </motion.span>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          >
            Kenali <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Mentor Anda</span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Belajar langsung dari praktisi berpengalaman dengan rekam jejak 22 tahun di industri konveksi
          </motion.p>
        </motion.div>

        {/* Quick Stats Bar */}
        <motion.div 
          className="mb-12"
          variants={statsVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statItemVariants}
                className="text-center px-8 py-4 bg-white rounded-2xl shadow-lg shadow-green-100/50 border border-green-100"
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-green-600">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Side - Profile */}
              <div className="lg:col-span-5 relative">
                <div className="h-full bg-linear-to-br from-green-600 via-green-700 to-emerald-800 p-8 lg:p-12 flex flex-col items-center justify-center text-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                    <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full opacity-20" />
                  </div>

                  {/* Profile Image */}
                  <motion.div
                    className="relative mb-8"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl relative z-10">
                      <Image 
                        src="/img/harlin.JPG" 
                        alt="Harlin - Direktur LPK Dua Berkah" 
                        width={224}
                        height={224}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    {/* Decorative Ring */}
                    <motion.div 
                      className="absolute -inset-3 rounded-full border-2 border-dashed border-white/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>

                  {/* Name & Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-center">HARLIN, S.AP</h3>
                  <p className="text-green-100 text-center mb-6">Direktur Utama & Founder</p>

                  {/* Experience Badge */}
                  <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">🏆</span>
                      <div>
                        <p className="text-2xl font-medium">{new Date().getFullYear() - 2003}+</p>
                        <p className="text-sm text-green-100">Tahun Pengalaman</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    <motion.a 
                      href="https://www.facebook.com/lpk.berkahterakreditasi.9" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </motion.a>
                    <motion.a 
                      href="https://wa.me/6287717398311" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="WhatsApp"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="lg:col-span-7 p-8 lg:p-12">
                {/* Quote */}
                <motion.div 
                  className="mb-8 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <svg className="absolute -top-4 -left-2 w-12 h-12 text-green-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-xl lg:text-2xl text-gray-700 italic pl-10">
                    "Mencetak generasi terampil dan berdaya mandiri adalah komitmen kami sejak 2003. Setiap alumni adalah bukti nyata dedikasi kami."
                  </p>
                  <p className="text-green-600 font-semibold mt-4 pl-10">— Harlin, S.AP</p>
                </motion.div>

                {/* Skills */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </span>
                    Keahlian Utama
                  </h4>
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        <span className="text-2xl">{skill.icon}</span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{skill.name}</p>
                          <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                            <motion.div 
                              className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Achievement Timeline */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Perjalanan Kami
                  </h4>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-linear-to-b from-green-400 to-emerald-600" />
                    <div className="space-y-4">
                      {achievements.map((item, index) => (
                        <motion.div
                          key={item.year}
                          className="relative pl-12"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 }}
                        >
                          <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-md" />
                          <div className="bg-gray-50 rounded-lg p-3 hover:bg-green-50 transition-colors">
                            <span className="text-sm font-bold text-green-600">{item.year}</span>
                            <h5 className="font-semibold text-gray-900">{item.title}</h5>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href="/daftar">
                    <motion.span
                      className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-green-500/30"
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.4)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Mulai Belajar Bersama Kami</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.span>
                  </Link>
                  <motion.a
                    href="#layanan"
                    className="inline-flex items-center justify-center gap-2 text-green-600 font-semibold py-3 px-6 hover:text-green-700"
                    whileHover={{ x: 4 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Konsultasi Gratis</span>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
