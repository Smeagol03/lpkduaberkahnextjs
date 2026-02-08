// app/admin/peserta/[id]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPesertaById, updatePesertaById } from '@/services/pesertaService';

export default function EditPesertaPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    informasiPribadi: {
      namaLengkap: '',
      nik: '',
      noHP: '',
      alamat: '',
      jenisKelamin: '',
      tempatLahir: '',
      tanggalLahir: '',
    },
    pendidikanPekerjaan: {
      pendidikanTerakhir: '',
      pekerjaanSaatIni: '',
    },
    motivasiReferensi: {
      alasanMengikuti: '',
      sumberInformasi: '',
    },
    paketPelatihan: '',
    statusPendaftaran: 'menunggu' as 'menunggu' | 'disetujui' | 'ditolak',
    statusPeserta: 'baru' as 'baru' | 'aktif' | 'lulus' | 'ditolak',
    tanggalDaftar: '',
    tanggalDiterima: '',
    validasi: {
      inputDivalidasi: false,
      waktuValidasi: ''
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('adminUser');
    if (!adminStatus) {
      router.push('/admin/login');
    }

    const fetchPeserta = async () => {
      try {
        console.log('[DEBUG] EditPesertaPage - Fetching peserta with ID:', id);
        if (typeof id === 'string') {
          const data = await getPesertaById(id);
          console.log('[DEBUG] EditPesertaPage - Response:', data);
          
          if (data && data.success && data.data) {
            console.log('[DEBUG] EditPesertaPage - Peserta data:', JSON.stringify(data.data, null, 2));
            
            // Properly merge nested objects
            setFormData(prev => ({
              ...prev,
              ...data.data,
              informasiPribadi: {
                ...prev.informasiPribadi,
                ...(data.data as any).informasiPribadi
              },
              pendidikanPekerjaan: {
                ...prev.pendidikanPekerjaan,
                ...(data.data as any).pendidikanPekerjaan
              },
              motivasiReferensi: {
                ...prev.motivasiReferensi,
                ...(data.data as any).motivasiReferensi
              },
              validasi: {
                ...prev.validasi,
                ...(data.data as any).validasi
              }
            }));
            
            console.log('[DEBUG] EditPesertaPage - Form data after merge:', JSON.stringify(formData, null, 2));
          } else {
            console.error('[DEBUG] EditPesertaPage - Error:', data.error);
            setError(data.error || 'Peserta tidak ditemukan');
          }
        }
      } catch (err: any) {
        console.error('[DEBUG] EditPesertaPage - Exception:', err);
        setError(err.message || 'Terjadi kesalahan saat mengambil data peserta');
      } finally {
        setLoading(false);
      }
    };

    fetchPeserta();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties using dot notation
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      if (typeof id === 'string') {
        // Extract only the fields we want to update, excluding system-generated fields
        const { tanggalDaftar, ...updateData } = formData;
        const result = await updatePesertaById(id, updateData);
        if (result.success) {
          setSuccess('Data peserta berhasil diperbarui!');
          setTimeout(() => {
            router.push(`/admin/peserta/${id}`);
          }, 1500);
        } else {
          setError(result.error || 'Gagal memperbarui data peserta');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat memperbarui data peserta');
    }
  };

  if (loading) return <div className="text-center py-8">Memuat data peserta...</div>;
  if (error && !loading) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Kembali
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit Peserta</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Informasi Pribadi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="informasiPribadi.namaLengkap">
                Nama Lengkap *
              </label>
              <input
                type="text"
                id="informasiPribadi.namaLengkap"
                name="informasiPribadi.namaLengkap"
                value={formData.informasiPribadi.namaLengkap}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="informasiPribadi.nik">
                NIK *
              </label>
              <input
                type="text"
                id="informasiPribadi.nik"
                name="informasiPribadi.nik"
                value={formData.informasiPribadi.nik}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="informasiPribadi.noHP">
                Nomor HP *
              </label>
              <input
                type="tel"
                id="informasiPribadi.noHP"
                name="informasiPribadi.noHP"
                value={formData.informasiPribadi.noHP}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="informasiPribadi.alamat">
                Alamat *
              </label>
              <textarea
                id="informasiPribadi.alamat"
                name="informasiPribadi.alamat"
                value={formData.informasiPribadi.alamat}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="informasiPribadi.jenisKelamin">
                Jenis Kelamin *
              </label>
              <select
                id="informasiPribadi.jenisKelamin"
                name="informasiPribadi.jenisKelamin"
                value={formData.informasiPribadi.jenisKelamin}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="informasiPribadi.tempatLahir">
                Tempat Lahir *
              </label>
              <input
                type="text"
                id="informasiPribadi.tempatLahir"
                name="informasiPribadi.tempatLahir"
                value={formData.informasiPribadi.tempatLahir}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="informasiPribadi.tanggalLahir">
                Tanggal Lahir *
              </label>
              <input
                type="date"
                id="informasiPribadi.tanggalLahir"
                name="informasiPribadi.tanggalLahir"
                value={formData.informasiPribadi.tanggalLahir}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pendidikan & Pekerjaan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pendidikanPekerjaan.pendidikanTerakhir">
                Pendidikan Terakhir *
              </label>
              <select
                id="pendidikanPekerjaan.pendidikanTerakhir"
                name="pendidikanPekerjaan.pendidikanTerakhir"
                value={formData.pendidikanPekerjaan.pendidikanTerakhir}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Pilih Pendidikan Terakhir</option>
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

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pendidikanPekerjaan.pekerjaanSaatIni">
                Pekerjaan Saat Ini
              </label>
              <input
                type="text"
                id="pendidikanPekerjaan.pekerjaanSaatIni"
                name="pendidikanPekerjaan.pekerjaanSaatIni"
                value={formData.pendidikanPekerjaan.pekerjaanSaatIni}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Motivasi & Referensi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="motivasiReferensi.alasanMengikuti">
                Alasan Mengikuti Pelatihan *
              </label>
              <textarea
                id="motivasiReferensi.alasanMengikuti"
                name="motivasiReferensi.alasanMengikuti"
                value={formData.motivasiReferensi.alasanMengikuti}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="motivasiReferensi.sumberInformasi">
                Sumber Informasi *
              </label>
              <select
                id="motivasiReferensi.sumberInformasi"
                name="motivasiReferensi.sumberInformasi"
                value={formData.motivasiReferensi.sumberInformasi}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

              >
                <option value="">Pilih Sumber Informasi</option>
                <option value="social_media">Media Sosial</option>
                <option value="friend">Teman/Keluarga</option>
                <option value="website">Website</option>
                <option value="event">Event/Pameran</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Informasi Pelatihan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paketPelatihan">
                Paket Pelatihan *
              </label>
              <select
                id="paketPelatihan"
                name="paketPelatihan"
                value={formData.paketPelatihan}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Pilih Paket Pelatihan</option>
                <option value="paket1">PAKET 1</option>
                <option value="paket2">PAKET 2</option>
                <option value="paket3">PAKET 3</option>
                <option value="paket4">PAKET 4</option>
                <option value="paket5">PAKET 5</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="statusPendaftaran">
                Status Pendaftaran *
              </label>
              <select
                id="statusPendaftaran"
                name="statusPendaftaran"
                value={formData.statusPendaftaran}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                
              >
                <option value="menunggu">Menunggu</option>
                <option value="disetujui">Disetujui</option>
                <option value="ditolak">Ditolak</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="statusPeserta">
                Status Peserta *
              </label>
              <select
                id="statusPeserta"
                name="statusPeserta"
                value={formData.statusPeserta}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

              >
                <option value="baru">Baru</option>
                <option value="aktif">Aktif</option>
                <option value="lulus">Lulus</option>
                <option value="ditolak">Ditolak</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tanggalDiterima">
                Tanggal Diterima
              </label>
              <input
                type="date"
                id="tanggalDiterima"
                name="tanggalDiterima"
                value={formData.tanggalDiterima}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Simpan Perubahan'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}