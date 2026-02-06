// app/admin/peserta/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getPesertaById } from '@/services/pesertaService';
import { useRouter } from 'next/navigation';

export default function PesertaDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [peserta, setPeserta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          if (data) {
            setPeserta(data);
          } else {
            setError('Peserta tidak ditemukan');
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

  if (loading) return <div className="text-center py-8">Memuat data peserta...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!peserta) return <div className="text-center py-8">Peserta tidak ditemukan</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Peserta</h1>
        <button
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Kembali
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Informasi Peserta</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Nama Lengkap:</p>
            <p>{peserta.nama}</p>
          </div>
          <div>
            <p className="font-medium">Email:</p>
            <p>{peserta.email}</p>
          </div>
          <div>
            <p className="font-medium">Nomor HP:</p>
            <p>{peserta.nomorHp}</p>
          </div>
          <div>
            <p className="font-medium">Program:</p>
            <p>{peserta.program}</p>
          </div>
          <div>
            <p className="font-medium">Tanggal Daftar:</p>
            <p>{new Date(peserta.tanggalDaftar).toLocaleDateString('id-ID')}</p>
          </div>
          <div>
            <p className="font-medium">Status:</p>
            <p>
              <span className={`px-2 py-1 rounded-full text-xs ${
                peserta.status === 'baru' ? 'bg-yellow-100 text-yellow-800' :
                peserta.status === 'aktif' ? 'bg-green-100 text-green-800' :
                peserta.status === 'lulus' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {peserta.status.charAt(0).toUpperCase() + peserta.status.slice(1)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}