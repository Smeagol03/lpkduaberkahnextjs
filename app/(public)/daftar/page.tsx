'use client';

import { useState, useRef } from 'react';
import { addPendaftar } from '@/services/pendaftarService';
import { motion, AnimatePresence } from 'motion/react';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1]);

  const totalSteps = 4;

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

  const validateStep = (step: number) => {
    switch(step) {
      case 1: // Informasi Pribadi
        if (!formData.informasiPribadi.namaLengkap.trim()) {
          setError('Nama lengkap wajib diisi');
          return false;
        }
        if (!formData.informasiPribadi.nik.trim()) {
          setError('NIK wajib diisi');
          return false;
        }
        if (!/^\d{16}$/.test(formData.informasiPribadi.nik)) {
          setError('NIK harus terdiri dari 16 digit angka');
          return false;
        }
        if (!formData.informasiPribadi.tempatLahir.trim()) {
          setError('Tempat lahir wajib diisi');
          return false;
        }
        if (!formData.informasiPribadi.tanggalLahir) {
          setError('Tanggal lahir wajib diisi');
          return false;
        }
        if (!formData.informasiPribadi.jenisKelamin) {
          setError('Jenis kelamin wajib dipilih');
          return false;
        }
        if (!formData.informasiPribadi.noHP.trim()) {
          setError('Nomor HP wajib diisi');
          return false;
        }
        if (!/^08\d{8,11}$/.test(formData.informasiPribadi.noHP)) {
          setError('Nomor HP tidak valid. Gunakan format 08xxxxxxxxx');
          return false;
        }
        if (!formData.informasiPribadi.alamat.trim()) {
          setError('Alamat wajib diisi');
          return false;
        }
        return true;
        
      case 2: // Pendidikan & Pekerjaan
        if (!formData.pendidikanPekerjaan.pendidikanTerakhir) {
          setError('Pendidikan terakhir wajib dipilih');
          return false;
        }
        return true;
        
      case 3: // Paket Pelatihan
        if (!formData.paketPelatihan) {
          setError('Paket pelatihan wajib dipilih');
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setError('');
      if (currentStep < totalSteps) {
        const next = currentStep + 1;
        setCurrentStep(next);
        if (!visitedSteps.includes(next)) {
          setVisitedSteps([...visitedSteps, next]);
        }
      } else {
        // On the last step, we don't navigate further, just allow form submission
        // The submit button is already displayed separately
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Add default values for optional fields if empty
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
        // Reset form after successful submission
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

  const getStepPercentage = () => {
    return ((currentStep - 1) / (totalSteps - 1)) * 100;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-green-50 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-teal-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-200/30 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
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

          {/* Progress Bar */}
          <div className="px-8 pt-6">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= step 
                        ? 'bg-teal-600 text-white' 
                        : visitedSteps.includes(step) 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  <span className="text-xs mt-1 text-gray-500 capitalize">
                    {step === 1 && 'Pribadi'}
                    {step === 2 && 'Pendidikan'}
                    {step === 3 && 'Paket'}
                    {step === 4 && 'Motivasi'}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <motion.div 
                className="bg-linear-to-r from-teal-500 to-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getStepPercentage()}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 pb-8">
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
                <button
                  onClick={() => {
                    setSuccess(false);
                    setCurrentStep(1);
                    setVisitedSteps([1]);
                  }}
                  className="bg-linear-to-r from-teal-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-green-700 transition-all"
                >
                  Daftar Lagi
                </button>
              </motion.div>
            ) : (
              <>
                {error && (
                  <motion.div 
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>{error}</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Informasi Pribadi */}
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="bg-linear-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                          <h3 className="text-xl font-semibold text-teal-700 mb-5 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Informasi Pribadi
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                              <input
                                type="text"
                                id="fullName"
                                name="informasiPribadi.namaLengkap"
                                value={formData.informasiPribadi.namaLengkap}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ease-in-out"
                                placeholder="Masukkan nama lengkap"
                              />
                            </div>
                            <div className="relative">
                              <label htmlFor="nik" className="block text-sm font-medium text-gray-700 mb-1">NIK *</label>
                              <input
                                type="text"
                                id="nik"
                                name="informasiPribadi.nik"
                                value={formData.informasiPribadi.nik}
                                onChange={handleChange}
                                required
                                pattern="\d{16}"
                                maxLength={16}
                                inputMode="numeric"
                                title="NIK harus 16 digit angka"
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ease-in-out"
                                placeholder="16 digit angka"
                              />
                              <p className="mt-1 text-xs text-gray-500">Harus 16 digit angka</p>
                            </div>
                            <div className="relative">
                              <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir *</label>
                              <input
                                type="text"
                                id="birthPlace"
                                name="informasiPribadi.tempatLahir"
                                value={formData.informasiPribadi.tempatLahir}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ease-in-out"
                                placeholder="Tempat lahir"
                              />
                            </div>
                            <div className="relative">
                              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir *</label>
                              <input
                                type="date"
                                id="birthDate"
                                name="informasiPribadi.tanggalLahir"
                                value={formData.informasiPribadi.tanggalLahir}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ease-in-out"
                              />
                            </div>
                            <div className="relative">
                              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin *</label>
                              <select
                                id="gender"
                                name="informasiPribadi.jenisKelamin"
                                value={formData.informasiPribadi.jenisKelamin}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ease-in-out appearance-none"
                              >
                                <option value="">Pilih</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                              </select>
                            </div>
                            <div className="relative">
                              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">No. HP / WhatsApp *</label>
                              <input
                                type="tel"
                                id="phone"
                                name="informasiPribadi.noHP"
                                value={formData.informasiPribadi.noHP}
                                onChange={handleChange}
                                required
                                placeholder="Contoh: 087717398311"
                                pattern="^\d{10,13}$"
                                maxLength={13}
                                inputMode="numeric"
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ease-in-out"
                              />
                              <p className="mt-1 text-xs text-gray-500">Format: 10-13 digit angka tanpa spasi atau karakter khusus</p>
                            </div>
                          </div>
                          <div className="mt-6">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label>
                            <textarea
                              id="address"
                              name="informasiPribadi.alamat"
                              value={formData.informasiPribadi.alamat}
                              onChange={handleChange}
                              required
                              rows={3}
                              className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200 ease-in-out"
                              placeholder="Alamat lengkap"
                            ></textarea>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 2: Pendidikan & Pekerjaan */}
                  <AnimatePresence mode="wait">
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                          <h3 className="text-xl font-semibold text-blue-700 mb-5 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M12 14l9-5-9-5-9 5 9 5z" />
                              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                            Pendidikan & Pekerjaan
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Pendidikan Terakhir *</label>
                              <select
                                id="education"
                                name="pendidikanPekerjaan.pendidikanTerakhir"
                                value={formData.pendidikanPekerjaan.pendidikanTerakhir}
                                onChange={handleChange}
                                required
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out appearance-none"
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
                              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Saat Ini</label>
                              <input
                                type="text"
                                id="occupation"
                                name="pendidikanPekerjaan.pekerjaanSaatIni"
                                value={formData.pendidikanPekerjaan.pekerjaanSaatIni}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                                placeholder="Opsional"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 3: Pilihan Paket Pelatihan */}
                  <AnimatePresence mode="wait">
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="bg-linear-to-r from-purple-50 to-fuchsia-50 rounded-xl p-6 border border-purple-100">
                          <h3 className="text-xl font-semibold text-purple-700 mb-5 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Pilihan Paket Pelatihan
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                              <input
                                type="radio"
                                name="paketPelatihan"
                                value="paket1"
                                checked={formData.paketPelatihan === 'paket1'}
                                onChange={handleRadioChange}
                                required
                                className="mt-1 h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                              />
                              <div className="ml-3">
                                <span className="font-medium text-gray-800 block mb-1">PAKET 1</span>
                                <p className="text-sm text-gray-600">Rp. 2.000.000</p>
                              </div>
                            </label>
                            <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                              <input
                                type="radio"
                                name="paketPelatihan"
                                value="paket2"
                                checked={formData.paketPelatihan === 'paket2'}
                                onChange={handleRadioChange}
                                required
                                className="mt-1 h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                              />
                              <div className="ml-3">
                                <span className="font-medium text-gray-800 block mb-1">PAKET 2</span>
                                <p className="text-sm text-gray-600">Rp. 3.500.000</p>
                              </div>
                            </label>
                            <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                              <input
                                type="radio"
                                name="paketPelatihan"
                                value="paket3"
                                checked={formData.paketPelatihan === 'paket3'}
                                onChange={handleRadioChange}
                                required
                                className="mt-1 h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                              />
                              <div className="ml-3">
                                <span className="font-medium text-gray-800 block mb-1">PAKET 3</span>
                                <p className="text-sm text-gray-600">Rp. 6.000.000</p>
                              </div>
                            </label>
                            <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                              <input
                                type="radio"
                                name="paketPelatihan"
                                value="paket4"
                                checked={formData.paketPelatihan === 'paket4'}
                                onChange={handleRadioChange}
                                required
                                className="mt-1 h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                              />
                              <div className="ml-3">
                                <span className="font-medium text-gray-800 block mb-1">PAKET 4</span>
                                <p className="text-sm text-gray-600">Rp. 14.000.000</p>
                              </div>
                            </label>
                            <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                              <input
                                type="radio"
                                name="paketPelatihan"
                                value="paket5"
                                checked={formData.paketPelatihan === 'paket5'}
                                onChange={handleRadioChange}
                                required
                                className="mt-1 h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                              />
                              <div className="ml-3">
                                <span className="font-medium text-gray-800 block mb-1">PAKET 5</span>
                                <p className="text-sm text-gray-600">Rp. 16.000.000</p>
                              </div>
                            </label>
                            <div className="mt-4 p-4 bg-linear-to-r from-yellow-100 to-amber-100 border border-amber-300 rounded-lg shadow-sm">
                              <p className="text-sm font-semibold text-amber-800">
                                💡 Promo Spesial: Bayar penuh sekarang dan dapatkan diskon <span className="text-amber-900">13%</span>!
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 4: Motivasi & Referensi */}
                  <AnimatePresence mode="wait">
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
                          <h3 className="text-xl font-semibold text-amber-700 mb-5 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Motivasi & Referensi
                          </h3>
                          <div className="space-y-6">
                            <div>
                              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">Alasan Mengikuti Pelatihan</label>
                              <textarea
                                id="motivation"
                                name="motivasiReferensi.alasanMengikuti"
                                value={formData.motivasiReferensi.alasanMengikuti}
                                onChange={handleChange}
                                rows={3}
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200 ease-in-out"
                                placeholder="Ceritakan mengapa Anda tertarik mengikuti pelatihan ini..."
                              ></textarea>
                            </div>
                            <div>
                              <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">Darimana Anda Mengetahui Program Ini?</label>
                              <select
                                id="reference"
                                name="motivasiReferensi.sumberInformasi"
                                value={formData.motivasiReferensi.sumberInformasi}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200 ease-in-out appearance-none"
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
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`px-6 py-3 rounded-lg font-semibold ${
                        currentStep === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Kembali
                    </button>

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-linear-to-r from-teal-600 to-green-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-green-700 transition-all"
                      >
                        Lanjutkan
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-linear-to-r from-teal-600 to-green-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-green-700 transition-all flex items-center"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mengirim...
                          </>
                        ) : (
                          'Kirim Pendaftaran'
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}