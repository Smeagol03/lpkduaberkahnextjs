// app/admin/pendaftar/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getPendaftarById } from '@/services/pendaftarService';
import { useRouter } from 'next/navigation';
import { getNestedProperty } from '@/lib/utils';


export default function PendaftarDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pendaftar, setPendaftar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('adminUser');
    if (!adminStatus) {
      router.push('/admin/login');
    }

    const fetchPendaftar = async () => {
      try {
        if (typeof id === 'string') {
          const data = await getPendaftarById(id);
          if (data && data.success) {
            setPendaftar(data.data);
          } else {
            setError(data.error || 'Pendaftar tidak ditemukan');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data pendaftar');
      } finally {
        setLoading(false);
      }
    };

    fetchPendaftar();
  }, [id, router]);

  if (loading) return <div className="text-center py-8">Memuat data pendaftar...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!pendaftar) return <div className="text-center py-8">Pendaftar tidak ditemukan</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Pendaftar</h1>
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
            <p className="font-medium">{getNestedProperty(pendaftar, 'informasiPribadi.namaLengkap')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">NIK</p>
            <p className="font-medium">{getNestedProperty(pendaftar, 'informasiPribadi.nik')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Nomor HP</p>
            <p className="font-medium">{getNestedProperty(pendaftar, 'informasiPribadi.noHP')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Alamat</p>
            <p className="font-medium">{getNestedProperty(pendaftar, 'informasiPribadi.alamat')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Jenis Kelamin</p>
            <p className="font-medium">{getNestedProperty(pendaftar, 'informasiPribadi.jenisKelamin')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tempat Lahir</p>
            <p className="font-medium">{getNestedProperty(pendaftar, 'informasiPribadi.tempatLahir')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tanggal Lahir</p>
            <p className="font-medium">{getNestedProperty(pendaftar, 'informasiPribadi.tanggalLahir') ? new Date(getNestedProperty(pendaftar, 'informasiPribadi.tanggalLahir')).toLocaleDateString('id-ID') : '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Pendidikan & Pekerjaan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Pendidikan Terakhir</p>
            <p className="font-medium">{getNestedProperty(pendaftar, 'pendidikanPekerjaan.pendidikanTerakhir')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Pekerjaan Saat Ini</p>
            <p className="font-medium">{getNestedProperty(pendaftar, 'pendidikanPekerjaan.pekerjaanSaatIni')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Motivasi & Referensi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Alasan Mengikuti</p>
            <p className="font-medium">{getNestedProperty(pendaftar, 'motivasiReferensi.alasanMengikuti')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Sumber Informasi</p>
            <p className="font-medium">{getNestedProperty(pendaftar, 'motivasiReferensi.sumberInformasi')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Informasi Pelatihan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Paket Pelatihan</p>
            <p className="font-medium">{pendaftar.paketPelatihan}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Status Pendaftaran</p>
            <p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                pendaftar.statusPendaftaran === 'menunggu' ? 'bg-yellow-100 text-yellow-800' :
                pendaftar.statusPendaftaran === 'disetujui' ? 'bg-green-100 text-green-800' :
                pendaftar.statusPendaftaran === 'ditolak' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {pendaftar.statusPendaftaran ? pendaftar.statusPendaftaran.charAt(0).toUpperCase() + pendaftar.statusPendaftaran.slice(1) : '-'}
              </span>
            </p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tanggal Daftar</p>
            <p className="font-medium">{pendaftar.tanggalDaftar ? new Date(pendaftar.tanggalDaftar).toLocaleDateString('id-ID') : '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Aksi</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push(`/admin/pendaftar/${id}/edit`)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin menghapus pendaftar ini?')) {
                // Implementasi hapus pendaftar
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