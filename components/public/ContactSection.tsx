'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [pesan, setPesan] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format pesan untuk dikirim ke WhatsApp
    const phoneNumber = "6287717398311"; // Nomor WhatsApp
    const message = encodeURIComponent(pesan);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Buka link WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setPesan('');
  };

  return (
    <section id="layanan">
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Jangan Ragu Untuk Mendaftar
            </h2>

            <p className="text-gray-500 sm:mt-4 dark:text-gray-400">
              Ajukan Pertanyaan Kepada Kami
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <form onSubmit={handleSubmit} className="sm:flex sm:gap-4">
              <div className="sm:flex-1">
                <label htmlFor="pesan" className="sr-only">pesan</label>

                <input 
                  type="text" 
                  id="pesanInput" 
                  name="pesan" 
                  placeholder="pesan"
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  className="w-full rounded-md border-gray-200 bg-white p-3 shadow-xs transition focus:border-white focus:ring-3 focus:ring-yellow-400"
                />
              </div>

              <button type="submit"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-rose-600 px-5 py-3 text-white transition focus:ring-3 focus:ring-yellow-400 focus:outline-hidden sm:mt-0 sm:w-auto">
                <span className="text-sm font-medium"> Kirim </span>

                <svg className="size-5 shadow-sm" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </form>
          </div>
          <div className="flex justify-center mt-4 md:mt-8">
            <a href="/daftar"
              className="inline-block rounded-sm bg-green-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-500 focus:ring-3 focus:ring-yellow-400 focus:outline-hidden">
              Daftar Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}