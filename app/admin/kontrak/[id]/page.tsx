// app/admin/kontrak/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getKontrakById } from '@/services/kontrakService';
import TemplateKontrak from '@/components/templates/TemplateKontrak';
import { useRouter } from 'next/navigation';

export default function KontrakDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [kontrak, setKontrak] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cek apakah pengguna sudah login sebagai admin
    const adminStatus = localStorage.getItem('admin');
    if (!adminStatus) {
      router.push('/admin/login');
    }

    const fetchKontrak = async () => {
      try {
        if (typeof id === 'string') {
          const data = await getKontrakById(id);
          if (data) {
            setKontrak(data);
          } else {
            setError('Kontrak tidak ditemukan');
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

  // Data dummy untuk nama peserta dan petugas - dalam implementasi nyata ini akan diambil dari database
  const namaPeserta = "Ahmad Fauzi"; // Ini akan diambil dari data peserta berdasarkan pesertaId
  const namaPetugas = "Harlin, S.AP"; // Ini akan diambil dari data admin/petugas

  return (
    <div className="max-w-4xl mx-auto">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Nomor Kontrak:</p>
            <p>{kontrak.nomorKontrak}</p>
          </div>
          <div>
            <p className="font-medium">Status:</p>
            <p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                kontrak.status === 'aktif' ? 'bg-green-100 text-green-800' :
                kontrak.status === 'selesai' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {kontrak.status.charAt(0).toUpperCase() + kontrak.status.slice(1)}
              </span>
            </p>
          </div>
          <div>
            <p className="font-medium">ID Peserta:</p>
            <p>{kontrak.pesertaId}</p>
          </div>
          <div>
            <p className="font-medium">ID Program:</p>
            <p>{kontrak.programId}</p>
          </div>
          <div>
            <p className="font-medium">Tanggal Mulai:</p>
            <p>{new Date(kontrak.tanggalMulai).toLocaleDateString('id-ID')}</p>
          </div>
          <div>
            <p className="font-medium">Tanggal Selesai:</p>
            <p>{new Date(kontrak.tanggalSelesai).toLocaleDateString('id-ID')}</p>
          </div>
          <div>
            <p className="font-medium">Biaya:</p>
            <p>Rp {kontrak.biaya.toLocaleString('id-ID')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Template Kontrak</h2>
        <TemplateKontrak
          nomorKontrak={kontrak.nomorKontrak}
          namaPeserta={namaPeserta}
          program="Program Menjahit Lanjutan"
          tanggalMulai={new Date(kontrak.tanggalMulai).toLocaleDateString('id-ID')}
          tanggalSelesai={new Date(kontrak.tanggalSelesai).toLocaleDateString('id-ID')}
          biaya={kontrak.biaya}
          namaPetugas={namaPetugas}
        />
      </div>
    </div>
  );
}