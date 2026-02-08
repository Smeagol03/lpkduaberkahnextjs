'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function ServiceCTASection() {
  const [pesan, setPesan] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Contoh integrasi WhatsApp
    const whatsappUrl = `https://wa.me/6287717398311?text=${encodeURIComponent(pesan)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="layanan" className="relative py-20 bg-white overflow-hidden">
      {/* Dekorasi Latar Belakang */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-green-200 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            
            {/* Dekorasi Garis Halus */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="white">
                <circle cx="50" cy="50" r="40" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="relative z-10 text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Siap Memulai Karir di Dunia Fashion?
              </motion.h2>
              <p className="text-slate-400 mb-10 max-w-md mx-auto">
                Punya pertanyaan seputar kurikulum atau jadwal? Tim kami siap membantu Anda kapan saja.
              </p>

              {/* Form Pesan WhatsApp */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="max-w-lg mx-auto bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Tulis pertanyaan Anda..."
                    value={pesan}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPesan(e.target.value)}
                    className="flex-1 bg-transparent px-6 py-4 text-white placeholder-slate-500 outline-none border-none focus:ring-0"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-400 text-slate-900 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Tanya Kami</span>
                    <svg 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </motion.div>

              {/* Separator */}
              <div className="flex items-center my-10 px-10">
                <div className="flex-1 h-px bg-linear-to-r from-transparent to-slate-700"></div>
                <span className="px-4 text-slate-600 text-sm font-medium uppercase tracking-widest">Atau</span>
                <div className="flex-1 h-px bg-linear-to-l from-transparent to-slate-700"></div>
              </div>

              {/* Link Pendaftaran Utama */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a
                  href="/daftar"
                  className="inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-lg shadow-xl hover:shadow-white/5 transition-all"
                >
                  <span className="relative">
                    DAFTAR SEKARANG
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-500"></span>
                  </span>
                </a>
              </motion.div>
              
              <p className="text-slate-500 text-xs mt-6">
                *Pendaftaran gelombang ini ditutup dalam waktu terbatas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}