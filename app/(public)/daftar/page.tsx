'use client';

import { useState } from 'react';
import { addPendaftar } from '@/services/pendaftarService';
import { motion } from 'framer-motion';

export default function DaftarPage() {
  const [formData, setFormData] = useState({
    informasiPribadi: {
      namaLengkap: '',
      nik: '',
      tempatLahir: '',
      tanggalLahir: '',
      jenisKelamin: '',
      noHP: '',
      alamat: '',
    },
    pendidikanPekerjaan: {
      pendidikanTerakhir: '',
      pekerjaanSaatIni: '',
    },
    paketPelatihan: '',
    motivasiReferensi: {
      alasanMengikuti: '',
      sumberInformasi: '',
    },
    statusPendaftaran: 'menunggu' as const,
    tanggalDaftar: new Date().toISOString(),
    validasi: {
      inputDivalidasi: true,
      waktuValidasi: new Date().toISOString(),
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof formData] as Record<string, any>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.informasiPribadi.namaLengkap.trim()) {
        setError('Nama lengkap wajib diisi');
        setLoading(false);
        return;
      }
      if (!formData.informasiPribadi.nik.trim() || !/^\d{16}$/.test(formData.informasiPribadi.nik)) {
        setError('NIK harus terdiri dari 16 digit angka');
        setLoading(false);
        return;
      }
      if (!formData.pendidikanPekerjaan.pendidikanTerakhir) {
        setError('Pendidikan terakhir wajib dipilih');
        setLoading(false);
        return;
      }
      if (!formData.paketPelatihan) {
        setError('Paket pelatihan wajib dipilih');
        setLoading(false);
        return;
      }

      const dataToSubmit = {
        ...formData,
        pendidikanPekerjaan: {
          ...formData.pendidikanPekerjaan,
          pekerjaanSaatIni: formData.pendidikanPekerjaan.pekerjaanSaatIni || 'Tidak ada'
        },
        motivasiReferensi: {
          ...formData.motivasiReferensi,
          alasanMengikuti: formData.motivasiReferensi.alasanMengikuti || 'Tidak diisi',
          sumberInformasi: formData.motivasiReferensi.sumberInformasi || 'Tidak diisi'
        }
      };

      const result = await addPendaftar(dataToSubmit);

      if (result.success) {
        setSuccess(true);
        setFormData({
          informasiPribadi: {
            namaLengkap: '',
            nik: '',
            tempatLahir: '',
            tanggalLahir: '',
            jenisKelamin: '',
            noHP: '',
            alamat: '',
          },
          pendidikanPekerjaan: {
            pendidikanTerakhir: '',
            pekerjaanSaatIni: '',
          },
          paketPelatihan: '',
          motivasiReferensi: {
            alasanMengikuti: '',
            sumberInformasi: '',
          },
          statusPendaftaran: 'menunggu',
          tanggalDaftar: new Date().toISOString(),
          validasi: {
            inputDivalidasi: true,
            waktuValidasi: new Date().toISOString(),
          }
        });
      } else {
        throw new Error(result.error || 'Gagal mengirim pendaftaran');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat mengirim pendaftaran');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-green-50 py-12 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-200/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-teal-600 to-green-600 p-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-4"
            >
              <div className="bg-white/20 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Formulir Pendaftaran
            </motion.h1>
            
            <motion.p 
              className="text-teal-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Bergabunglah bersama ribuan alumni kami
            </motion.p>
          </div>

          <div className="px-8 py-8">
            {success ? (
              <motion.div 
                className="bg-linear-to-r from-green-100 to-teal-100 border border-green-400 text-green-700 px-6 py-8 rounded-xl text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-green-500 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Pendaftaran Berhasil!</h3>
                <p className="text-green-700 mb-4">Terima kasih telah mendaftar. Kami akan segera menghubungi Anda.</p>
                
              </motion.div>
            ) : (
              <>
                {error && (
                  <motion.div 
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 mt-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>{error}</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                  <div className="bg-linear-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                    <h3 className="text-xl font-semibold text-teal-700 mb-5 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Informasi Pribadi
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                        <input
                          type="text"
                          name="informasiPribadi.namaLengkap"
                          value={formData.informasiPribadi.namaLengkap}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">NIK *</label>
                        <input
                          type="text"
                          name="informasiPribadi.nik"
                          value={formData.informasiPribadi.nik}
                          onChange={handleChange}
                          maxLength={16}
                          inputMode="numeric"
                          className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="16 digit angka"
                        />
                        <p className="mt-1 text-xs text-gray-500">Harus 16 digit angka</p>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir *</label>
                        <input
                          type="text"
                          name="informasiPribadi.tempatLahir"
                          value={formData.informasiPribadi.tempatLahir}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Tempat lahir"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir *</label>
                        <input
                          type="date"
                          name="informasiPribadi.tanggalLahir"
                          value={formData.informasiPribadi.tanggalLahir}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin *</label>
                        <select
                          name="informasiPribadi.jenisKelamin"
                          value={formData.informasiPribadi.jenisKelamin}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Pilih</option>
                          <option value="L">Laki-laki</option>
                          <option value="P">Perempuan</option>
                        </select>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. HP / WhatsApp *</label>
                        <input
                          type="tel"
                          name="informasiPribadi.noHP"
                          value={formData.informasiPribadi.noHP}
                          onChange={handleChange}
                          placeholder="Contoh: 087717398311"
                          maxLength={13}
                          inputMode="numeric"
                          className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label>
                      <textarea
                        name="informasiPribadi.alamat"
                        value={formData.informasiPribadi.alamat}
                        onChange={handleChange}
                        rows={3}
                        className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Alamat lengkap"
                      ></textarea>
                    </div>
                  </div>

                  <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h3 className="text-xl font-semibold text-blue-700 mb-5 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      Pendidikan & Pekerjaan
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan Terakhir *</label>
                        <select
                          name="pendidikanPekerjaan.pendidikanTerakhir"
                          value={formData.pendidikanPekerjaan.pendidikanTerakhir}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Pilih</option>
                          <option value="SD">SD / Sederajat</option>
                          <option value="SMP">SMP / Sederajat</option>
                          <option value="SMA">SMA / Sederajat</option>
                          <option value="D1">D1</option>
                          <option value="D2">D2</option>
                          <option value="D3">D3</option>
                          <option value="D4">D4</option>
                          <option value="S1">S1</option>
                          <option value="S2">S2</option>
                        </select>
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Saat Ini</label>
                        <input
                          type="text"
                          name="pendidikanPekerjaan.pekerjaanSaatIni"
                          value={formData.pendidikanPekerjaan.pekerjaanSaatIni}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Opsional"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-r from-purple-50 to-fuchsia-50 rounded-xl p-6 border border-purple-100">
                    <h3 className="text-xl font-semibold text-purple-700 mb-5 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Pilihan Paket Pelatihan
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { value: 'paket1', label: 'PAKET 1', price: 'Rp. 2.000.000' },
                        { value: 'paket2', label: 'PAKET 2', price: 'Rp. 3.500.000' },
                        { value: 'paket3', label: 'PAKET 3', price: 'Rp. 6.000.000' },
                        { value: 'paket4', label: 'PAKET 4', price: 'Rp. 14.000.000' },
                        { value: 'paket5', label: 'PAKET 5', price: 'Rp. 16.000.000' },
                      ].map((paket) => (
                        <label
                          key={paket.value}
                          className={`flex items-start p-4 border rounded-lg transition-colors cursor-pointer ${
                            formData.paketPelatihan === paket.value
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:bg-purple-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paketPelatihan"
                            value={paket.value}
                            checked={formData.paketPelatihan === paket.value}
                            onChange={handleRadioChange}
                            className="mt-1 h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                          />
                          <div className="ml-3">
                            <span className="font-medium text-gray-800 block">{paket.label}</span>
                            <p className="text-sm text-gray-600">{paket.price}</p>
                          </div>
                        </label>
                      ))}
                      <div className="mt-4 p-4 bg-linear-to-r from-yellow-100 to-amber-100 border border-amber-300 rounded-lg">
                        <p className="text-sm font-semibold text-amber-800">
                          💡 Promo: Bayar penuh sekarang dan dapatkan diskon 13%!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
                    <h3 className="text-xl font-semibold text-amber-700 mb-5 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Motivasi & Referensi
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alasan Mengikuti Pelatihan</label>
                        <textarea
                          name="motivasiReferensi.alasanMengikuti"
                          value={formData.motivasiReferensi.alasanMengikuti}
                          onChange={handleChange}
                          rows={3}
                          className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Ceritakan mengapa Anda tertarik mengikuti pelatihan ini..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Darimana Anda Mengetahui Program Ini?</label>
                        <select
                          name="motivasiReferensi.sumberInformasi"
                          value={formData.motivasiReferensi.sumberInformasi}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Pilih</option>
                          <option value="social_media">Media Sosial</option>
                          <option value="friend">Teman/Keluarga</option>
                          <option value="website">Website</option>
                          <option value="event">Event/Pameran</option>
                          <option value="other">Lainnya</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-linear-to-r from-teal-600 to-green-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Mengirim...
                      </span>
                    ) : (
                      'Kirim Pendaftaran'
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
