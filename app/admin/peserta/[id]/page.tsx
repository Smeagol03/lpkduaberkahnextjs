// app/admin/peserta/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getPesertaById, movePesertaToProgram } from '@/services/pesertaService';
import { useRouter } from 'next/navigation';

// Helper function to get nested property values
function getNestedProperty(obj: any, path: string): any {
  if (!obj) return null;
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

export default function PesertaDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [peserta, setPeserta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [graduationLoading, setGraduationLoading] = useState(false);

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('admin');
    if (!adminStatus) {
      router.push('/admin/login');
    }

    const fetchPeserta = async () => {
      try {
        if (typeof id === 'string') {
          const data = await getPesertaById(id);
          if (data && data.success) {
            setPeserta(data.data);
          } else {
            setError(data.error || 'Peserta tidak ditemukan');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data peserta');
      } finally {
        setLoading(false);
      }
    };

    fetchPeserta();
  }, [id, router]);

  const handleGraduate = async () => {
    if (!confirm('Apakah Anda yakin ingin meluluskan peserta ini dan memindahkannya ke data program?')) {
      return;
    }

    setGraduationLoading(true);
    setError('');

    try {
      const result = await movePesertaToProgram(id as string);
      if (result.success) {
        alert('Peserta berhasil diluluskan dan dipindahkan ke data program!');
        router.push('/admin/peserta'); // Navigate back to the peserta list
      } else {
        setError(result.error || 'Gagal meluluskan peserta');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat meluluskan peserta');
    } finally {
      setGraduationLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Memuat data peserta...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!peserta) return <div className="text-center py-8">Peserta tidak ditemukan</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Peserta</h1>
        <button
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Kembali
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Informasi Pribadi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Nama Lengkap</p>
            <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.namaLengkap')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">NIK</p>
            <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.nik')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Nomor HP</p>
            <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.noHP')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Alamat</p>
            <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.alamat')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Jenis Kelamin</p>
            <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.jenisKelamin')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tempat Lahir</p>
            <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.tempatLahir')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tanggal Lahir</p>
            <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.tanggalLahir') ? new Date(getNestedProperty(peserta, 'informasiPribadi.tanggalLahir')).toLocaleDateString('id-ID') : '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Pendidikan & Pekerjaan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Pendidikan Terakhir</p>
            <p className="font-medium">{getNestedProperty(peserta, 'pendidikanPekerjaan.pendidikanTerakhir')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Pekerjaan Saat Ini</p>
            <p className="font-medium">{getNestedProperty(peserta, 'pendidikanPekerjaan.pekerjaanSaatIni')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Motivasi & Referensi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Alasan Mengikuti</p>
            <p className="font-medium">{getNestedProperty(peserta, 'motivasiReferensi.alasanMengikuti')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Sumber Informasi</p>
            <p className="font-medium">{getNestedProperty(peserta, 'motivasiReferensi.sumberInformasi')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Informasi Pelatihan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Paket Pelatihan</p>
            <p className="font-medium">{peserta.paketPelatihan}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Status Pendaftaran</p>
            <p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                peserta.statusPendaftaran === 'menunggu' ? 'bg-yellow-100 text-yellow-800' :
                peserta.statusPendaftaran === 'disetujui' ? 'bg-green-100 text-green-800' :
                peserta.statusPendaftaran === 'ditolak' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {peserta.statusPendaftaran ? peserta.statusPendaftaran.charAt(0).toUpperCase() + peserta.statusPendaftaran.slice(1) : '-'}
              </span>
            </p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Status Peserta</p>
            <p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                peserta.statusPeserta === 'baru' ? 'bg-yellow-100 text-yellow-800' :
                peserta.statusPeserta === 'aktif' ? 'bg-green-100 text-green-800' :
                peserta.statusPeserta === 'lulus' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {peserta.statusPeserta ? peserta.statusPeserta.charAt(0).toUpperCase() + peserta.statusPeserta.slice(1) : '-'}
              </span>
            </p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tanggal Daftar</p>
            <p className="font-medium">{peserta.tanggalDaftar ? new Date(peserta.tanggalDaftar).toLocaleDateString('id-ID') : '-'}</p>
          </div>
          {peserta.tanggalDiterima && (
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Tanggal Diterima</p>
              <p className="font-medium">{new Date(peserta.tanggalDiterima).toLocaleDateString('id-ID')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Aksi</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => router.push(`/admin/peserta/${id}/edit`)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={handleGraduate}
            disabled={graduationLoading || peserta.statusPeserta === 'lulus'}
            className={`${
              peserta.statusPeserta === 'lulus' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-700'
            } text-white font-bold py-2 px-4 rounded`}
          >
            {graduationLoading 
              ? 'Memproses...' 
              : peserta.statusPeserta === 'lulus' 
                ? 'Sudah Lulus' 
                : 'Lulus'}
          </button>
          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin menghapus peserta ini?')) {
                // Implementasi hapus peserta
              }
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}