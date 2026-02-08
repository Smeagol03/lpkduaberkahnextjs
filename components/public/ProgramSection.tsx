'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import PaketCard from './PaketCard';

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
  hidden: { opacity: 0, filter: 'blur(10px)', transform: 'translateY(20px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transform: 'translateY(0)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, transform: 'translateY(40px) scale(0.9)', rotateY: -10 },
  visible: {
    opacity: 1,
    transform: 'translateY(0) scale(1) rotateY(0)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function ProgramSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Sertifikasi Profesional',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Job Placement Support',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Flexible Learning',
      color: 'from-purple-400 to-violet-500',
    },
  ];

  const paketData = [
    { title: 'Paket 1', price: 'Rp. 2.000.000', trainingsCount: '5 Pelatihan', coverImage: '/img/paket/cover/Paket1.jpg', slug: 'paket1', popular: false },
    { title: 'Paket 2', price: 'Rp. 3.500.000', trainingsCount: '11 Pelatihan', coverImage: '/img/paket/cover/Paket2.jpg', slug: 'paket2', popular: false },
    { title: 'Paket 3', price: 'Rp. 6.000.000', trainingsCount: '24 Pelatihan', coverImage: '/img/paket/cover/Paket3.jpg', slug: 'paket3', popular: false },
    { title: 'Paket 4', price: 'Rp. 14.000.000', trainingsCount: '26 Pelatihan', coverImage: '/img/paket/cover/Paket4.jpg', slug: 'paket4', popular: false },
    { title: 'Paket 5', price: 'Rp. 16.000.000', trainingsCount: 'Lengkap', coverImage: '/img/paket/cover/Paket5.jpg', slug: 'paket5', popular: true },
  ];

  return (
    <section ref={sectionRef} id="program" className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <div className="absolute top-20 left-0 w-96 h-96 bg-green-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 bg-linear-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/30 text-green-700 dark:text-green-300 px-6 py-3 rounded-full text-sm font-semibold mb-6"
          >
            <motion.div
              className="relative flex h-3 w-3"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
            </motion.div>
            Program Unggulan
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
          >
            Tingkatkan Skill & Karier Anda dengan{' '}
            <span className="bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent relative">
              Program Pelatihan
              <motion.svg
                className="absolute -bottom-2 left-0 w-full h-3 text-green-400/50"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <path
                  d="M0,8 Q50,12 100,8 T200,8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </motion.svg>
            </span>{' '}
            Terbaik
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8"
          >
            Temukan berbagai program pelatihan intensif yang dirancang oleh industri,
            dengan kurikulum terkini dan instruktur berpengalaman untuk mempersiapkan
            Anda menghadapi tantangan dunia kerja modern.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group flex items-center gap-3 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.03,
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -6px rgb(0 0 0 / 0.1)'
                }}
              >
                <motion.div 
                  className={`p-2 rounded-lg bg-linear-to-br ${feature.color} text-white shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {feature.icon}
                </motion.div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {paketData.map((paket, index) => (
            <motion.div
              key={paket.slug}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ perspective: '1000px' }}
            >
              <div className="relative h-full">
                {paket.popular && (
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                  >
                    <span className="bg-linear-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      Paling Populer
                    </span>
                  </motion.div>
                )}
                <PaketCard
                  title={paket.title}
                  price={paket.price}
                  trainingsCount={paket.trainingsCount}
                  coverImage={paket.coverImage}
                  slug={paket.slug}
                  index={index}
                  popular={paket.popular}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Tidak yakin program mana yang cocok untuk Anda?
          </p>
          <motion.a
            href="#layanan"
            className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors"
            whileHover={{ x: 5 }}
          >
            Konsultasi Gratis dengan Tim Kami
            <motion.svg 
              className="w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              whileHover={{ x: 3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}