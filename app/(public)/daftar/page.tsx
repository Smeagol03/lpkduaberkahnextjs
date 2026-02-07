'use client';

import { useState } from 'react';
import { addPendaftar } from '@/services/pendaftarService';

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
      // Validate form
      if (!formData.informasiPribadi.namaLengkap.trim()) {
        throw new Error('Nama lengkap wajib diisi');
      }
      
      if (!formData.informasiPribadi.nik.trim()) {
        throw new Error('NIK wajib diisi');
      }
      
      if (!/^\d{16}$/.test(formData.informasiPribadi.nik)) {
        throw new Error('NIK harus terdiri dari 16 digit angka');
      }
      
      if (!formData.informasiPribadi.tempatLahir.trim()) {
        throw new Error('Tempat lahir wajib diisi');
      }
      
      if (!formData.informasiPribadi.tanggalLahir) {
        throw new Error('Tanggal lahir wajib diisi');
      }
      
      if (!formData.informasiPribadi.jenisKelamin) {
        throw new Error('Jenis kelamin wajib dipilih');
      }
      
      if (!formData.informasiPribadi.noHP.trim()) {
        throw new Error('Nomor HP wajib diisi');
      }
      
      if (!/^08\d{8,11}$/.test(formData.informasiPribadi.noHP)) {
        throw new Error('Nomor HP tidak valid. Gunakan format 08xxxxxxxxx');
      }
      
      if (!formData.informasiPribadi.alamat.trim()) {
        throw new Error('Alamat wajib diisi');
      }
      
      if (!formData.pendidikanPekerjaan.pendidikanTerakhir) {
        throw new Error('Pendidikan terakhir wajib dipilih');
      }
      
      if (!formData.paketPelatihan) {
        throw new Error('Paket pelatihan wajib dipilih');
      }
      
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

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-teal-800 mb-8">Formulir Pendaftaran</h1>

          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>Pendaftaran berhasil dikirim! Kami akan menghubungi Anda segera.</p>
              </div>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informasi Pribadi */}
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-teal-500">
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

                {/* Pendidikan & Pekerjaan */}
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
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

                {/* Pilihan Paket Pelatihan */}
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-purple-500">
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

                {/* Motivasi & Referensi */}
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-amber-500">
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

                {/* File Upload */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Berkas</h3>
                  <p className="text-sm text-gray-600 mb-4">Peserta wajib membawa berkas berikut saat proses pendaftaran:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Fotocopy KTP</li>
                    <li>Pas foto 4 x 6 sebanyak 2 lembar</li>
                  </ul>
                </div>

                {/* Persetujuan */}
                <div className="flex items-start space-x-3 pb-8">
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    required
                    className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500 mt-1"
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-700">
                    Saya menyatakan bahwa data yang saya isikan adalah benar dan bersedia mengikuti seluruh proses pelatihan.
                  </label>
                </div>

                {/* Submit */}
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-linear-to-r from-teal-500 to-green-500 text-white font-medium rounded-lg shadow-lg hover:from-teal-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Kirim Pendaftaran</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}