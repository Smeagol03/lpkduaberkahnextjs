// app/admin/program/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getGraduateById } from '@/services/programService';
import { useRouter } from 'next/navigation';
import { getNestedProperty } from '@/lib/utils';


export default function ProgramDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [program, setProgram] = useState<any>(null); // This will actually be a graduated participant
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('adminUser');
    if (!adminStatus) {
      router.push('/admin/login');
    }

    const fetchProgram = async () => {
      try {
        // Handle both string and array forms of id from useParams
        const graduateId = Array.isArray(id) ? id[0] : id;

        if (typeof graduateId === 'string' && graduateId) {
          const data = await getGraduateById(graduateId);
          if (data && data.success && data.data) {
            setProgram(data.data);
          } else {
            setError(data.error || 'Graduate data not found');
          }
        } else {
          setError('Invalid ID provided');
        }
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data lulusan');
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [id, router]);

  if (loading) return <div className="text-center py-8">Memuat data lulusan...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!program) return <div className="text-center py-8">Data lulusan tidak ditemukan</div>;

  return (
    <div className="max-w-6xl mx-auto overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Lulusan</h1>
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
            <p className="font-medium">{getNestedProperty(program, 'informasiPribadi.namaLengkap')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">NIK</p>
            <p className="font-medium">{getNestedProperty(program, 'informasiPribadi.nik')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Nomor HP</p>
            <p className="font-medium">{getNestedProperty(program, 'informasiPribadi.noHP')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Alamat</p>
            <p className="font-medium">{getNestedProperty(program, 'informasiPribadi.alamat')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Jenis Kelamin</p>
            <p className="font-medium">{getNestedProperty(program, 'informasiPribadi.jenisKelamin')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tempat Lahir</p>
            <p className="font-medium">{getNestedProperty(program, 'informasiPribadi.tempatLahir')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tanggal Lahir</p>
            <p className="font-medium">{getNestedProperty(program, 'informasiPribadi.tanggalLahir') ? new Date(getNestedProperty(program, 'informasiPribadi.tanggalLahir')).toLocaleDateString('id-ID') : '-'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Pendidikan & Pekerjaan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Pendidikan Terakhir</p>
            <p className="font-medium">{getNestedProperty(program, 'pendidikanPekerjaan.pendidikanTerakhir')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Pekerjaan Saat Ini</p>
            <p className="font-medium">{getNestedProperty(program, 'pendidikanPekerjaan.pekerjaanSaatIni')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Motivasi & Referensi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Alasan Mengikuti</p>
            <p className="font-medium">{getNestedProperty(program, 'motivasiReferensi.alasanMengikuti')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Sumber Informasi</p>
            <p className="font-medium">{getNestedProperty(program, 'motivasiReferensi.sumberInformasi')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Informasi Pelatihan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Paket Pelatihan</p>
            <p className="font-medium">{program.paketPelatihan}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Status Peserta</p>
            <p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                program.statusPeserta === 'lulus' ? 'bg-blue-100 text-blue-800' :
                program.statusPeserta === 'aktif' ? 'bg-green-100 text-green-800' :
                program.statusPeserta === 'baru' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {program.statusPeserta ? program.statusPeserta.charAt(0).toUpperCase() + program.statusPeserta.slice(1) : '-'}
              </span>
            </p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tanggal Daftar</p>
            <p className="font-medium">{program.tanggalDaftar ? new Date(program.tanggalDaftar).toLocaleDateString('id-ID') : '-'}</p>
          </div>
          {program.tanggalDiterima && (
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Tanggal Diterima</p>
              <p className="font-medium">{new Date(program.tanggalDiterima).toLocaleDateString('id-ID')}</p>
            </div>
          )}
          {program.tanggalLulus && (
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Tanggal Lulus</p>
              <p className="font-medium">{new Date(program.tanggalLulus).toLocaleDateString('id-ID')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Aksi</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              router.push(`/admin/program/${id}/edit`);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin menghapus data lulusan ini?')) {
                // Implementasi hapus lulusan
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