"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const linkItemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const bottomBarVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.6 },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Beranda" },
    { href: "/paket", label: "Program" },
    { href: "/daftar", label: "Pendaftaran" },
    { href: "/#tentang", label: "Tentang Kami" },
  ];

  const programs = [
    { href: "/paket/paket1", label: "Paket 1" },
    { href: "/paket/paket2", label: "Paket 2" },
    { href: "/paket/paket3", label: "Paket 3" },
    { href: "/paket/paket4", label: "Paket 4" },
    { href: "/paket/paket5", label: "Paket 5" },
  ];

  const contactInfo = {
    address: "Dusun Lendang Bedurik, Kelurahan Sekarteja, Kabupaten Lombok Timur",
    phone: "+62 877-1739-8311",
    email: "info@lpkduaberkah.com",
    hours: "Senin - Jumat: 08.00 - 17.00",
  };

  return (
    <footer className="bg-linear-to-b from-blue-900 to-blue-950 text-white">
      {/* Main Footer */}
      <motion.div
        className="container mx-auto px-4 py-12 lg:py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/img/logo.png"
                  alt="LPK Dua Berkah Logo"
                  width={48}
                  height={48}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-bold">LPK Dua Berkah</span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed">
              Lembaga Pelatihan Kerja yang berkomitmen meningkatkan kualitas
              sumber daya manusia melalui program pelatihan vokasional
              berkualitas.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-blue-700 relative overflow-hidden">
              Tautan Cepat
              <motion.span
                className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-400"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li key={link.href} variants={linkItemVariants}>
                  <Link
                    href={link.href}
                    className="text-blue-200 hover:text-yellow-400 transition-colors duration-300 text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-700 group-hover:bg-yellow-400 transition-colors duration-300" />
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-blue-700 relative overflow-hidden">
              Program Kami
              <motion.span
                className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-400"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </h3>
            <ul className="space-y-3">
              {programs.map((program) => (
                <motion.li key={program.href} variants={linkItemVariants}>
                  <Link
                    href={program.href}
                    className="text-blue-200 hover:text-yellow-400 transition-colors duration-300 text-sm flex items-center space-x-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-700 group-hover:bg-yellow-400 transition-colors duration-300" />
                    <span>{program.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-blue-700 relative overflow-hidden">
              Kontak Kami
              <motion.span
                className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-400"
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </h3>
            <address className="not-italic space-y-3 text-sm">
              <motion.p
                className="text-blue-200 flex items-start space-x-2"
                variants={linkItemVariants}
              >
                <svg
                  className="w-5 h-5 shrink-0 mt-0.5 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{contactInfo.address}</span>
              </motion.p>
              <motion.p
                className="text-blue-200 flex items-center space-x-2"
                variants={linkItemVariants}
              >
                <svg
                  className="w-5 h-5 shrink-0 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  {contactInfo.phone}
                </a>
              </motion.p>
              <motion.p
                className="text-blue-200 flex items-center space-x-2"
                variants={linkItemVariants}
              >
                <svg
                  className="w-5 h-5 shrink-0 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  {contactInfo.email}
                </a>
              </motion.p>
              <motion.p
                className="text-blue-200 pt-2 border-t border-blue-800"
                variants={linkItemVariants}
              >
                <span className="block text-xs text-blue-400 mb-1">
                  Jam Operasional:
                </span>
                {contactInfo.hours}
              </motion.p>
            </address>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-blue-800/50"
        variants={bottomBarVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-300 text-sm">
              &copy; {currentYear} LPK Dua Berkah. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-blue-300 hover:text-yellow-400 transition-colors duration-300 text-sm"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-blue-300 hover:text-yellow-400 transition-colors duration-300 text-sm"
              >
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
