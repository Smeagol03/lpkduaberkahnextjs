// app/admin/kontrak/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getKontrakById } from '@/services/kontrakService';
import { getPesertaById } from '@/services/pesertaService';
import { getProgramById } from '@/services/programService';
import TemplateKontrak from '@/components/templates/TemplateKontrak';
import { useRouter } from 'next/navigation';
import { getNestedProperty } from '@/lib/utils';


export default function KontrakDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [kontrak, setKontrak] = useState<any>(null);
  const [peserta, setPeserta] = useState<any>(null);
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('adminUser');
    if (!adminStatus) {
      router.push('/admin/login');
    }

    const fetchKontrak = async () => {
      try {
        if (typeof id === 'string') {
          const data = await getKontrakById(id);
          if (data && data.success && data.data) {
            // Since we're fetching by ID, cast to single Kontrak object
            const kontrakData = Array.isArray(data.data) ? data.data[0] : data.data;
            setKontrak(kontrakData);

            // Ambil data peserta dan program terkait
            if (kontrakData.pesertaId) {
              const pesertaData = await getPesertaById(kontrakData.pesertaId);
              if (pesertaData && pesertaData.success && pesertaData.data) {
                setPeserta(pesertaData.data);
              }
            }

            if (kontrakData.programId) {
              const programData = await getProgramById(kontrakData.programId);
              if (programData && programData.success && programData.data) {
                setProgram(programData.data);
              }
            }
          } else {
            setError(data.error || 'Kontrak tidak ditemukan');
          }
        }
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data kontrak');
      } finally {
        setLoading(false);
      }
    };

    fetchKontrak();
  }, [id, router]);

  if (loading) return <div className="text-center py-8">Memuat data kontrak...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!kontrak) return <div className="text-center py-8">Kontrak tidak ditemukan</div>;

  // Data dummy untuk nama petugas - dalam implementasi nyata ini akan diambil dari database
  const namaPetugas = "Harlin, S.AP"; // Ini akan diambil dari data admin/petugas

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Kontrak</h1>
        <button
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Kembali
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Informasi Kontrak</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Nomor Kontrak</p>
            <p className="font-medium">{kontrak.nomorKontrak}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Status</p>
            <p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                kontrak.status === 'aktif' ? 'bg-green-100 text-green-800' :
                kontrak.status === 'selesai' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {kontrak.status ? kontrak.status.charAt(0).toUpperCase() + kontrak.status.slice(1) : '-'}
              </span>
            </p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tanggal Mulai</p>
            <p className="font-medium">{new Date(kontrak.tanggalMulai).toLocaleDateString('id-ID')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Tanggal Selesai</p>
            <p className="font-medium">{new Date(kontrak.tanggalSelesai).toLocaleDateString('id-ID')}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm text-gray-500">Biaya</p>
            <p className="font-medium">Rp {kontrak.biaya?.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>

      {/* Informasi Peserta Terkait */}
      {peserta && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Informasi Peserta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Nama</p>
              <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.namaLengkap') || getNestedProperty(peserta, 'nama')}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">NIK</p>
              <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.nik') || getNestedProperty(peserta, 'nik')}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Nomor HP</p>
              <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.noHP') || getNestedProperty(peserta, 'nomorHp')}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Alamat</p>
              <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.alamat') || getNestedProperty(peserta, 'alamat')}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Jenis Kelamin</p>
              <p className="font-medium">{getNestedProperty(peserta, 'informasiPribadi.jenisKelamin') || getNestedProperty(peserta, 'jenisKelamin')}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Pekerjaan</p>
              <p className="font-medium">{getNestedProperty(peserta, 'pendidikanPekerjaan.pekerjaanSaatIni') || getNestedProperty(peserta, 'pekerjaan')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Informasi Program Terkait */}
      {program && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Informasi Program</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Nama Program</p>
              <p className="font-medium">{program.nama}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Deskripsi</p>
              <p className="font-medium">{program.deskripsi}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Durasi</p>
              <p className="font-medium">{program.durasi}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Harga</p>
              <p className="font-medium">Rp {program.harga?.toLocaleString('id-ID')}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm text-gray-500">Kuota</p>
              <p className="font-medium">{program.kuota}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Template Kontrak</h2>
        <TemplateKontrak
          nomorKontrak={kontrak.nomorKontrak}
          namaPeserta={getNestedProperty(peserta, 'informasiPribadi.namaLengkap') || getNestedProperty(peserta, 'nama') || "Nama Peserta"}
          program={getNestedProperty(program, 'nama') || "Nama Program"}
          tanggalMulai={new Date(kontrak.tanggalMulai).toLocaleDateString('id-ID')}
          tanggalSelesai={new Date(kontrak.tanggalSelesai).toLocaleDateString('id-ID')}
          biaya={kontrak.biaya}
          namaPetugas={namaPetugas}
        />
      </div>
    </div>
  );
}