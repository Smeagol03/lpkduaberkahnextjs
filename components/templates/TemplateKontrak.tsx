// components/templates/TemplateKontrak.tsx
import { formatCurrency } from '@/utils/formatDate';

interface KontrakData {
  nomorKontrak: string;
  namaPeserta: string;
  program: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  biaya: number;
  namaPetugas: string;
}

export default function TemplateKontrak({ 
  nomorKontrak, 
  namaPeserta, 
  program, 
  tanggalMulai, 
  tanggalSelesai, 
  biaya, 
  namaPetugas 
}: KontrakData) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase">KONTRAK PELATIHAN</h1>
        <p className="text-gray-600">Nomor: {nomorKontrak}</p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">IDENTITAS PESERTA</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Nama Lengkap:</p>
            <p>{namaPeserta}</p>
          </div>
          <div>
            <p className="font-medium">Program:</p>
            <p>{program}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">RINCIAN KONTRAK</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Tanggal Mulai:</p>
            <p>{tanggalMulai}</p>
          </div>
          <div>
            <p className="font-medium">Tanggal Selesai:</p>
            <p>{tanggalSelesai}</p>
          </div>
          <div>
            <p className="font-medium">Biaya Pelatihan:</p>
            <p>{formatCurrency(biaya)}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-lg font-semibold mb-4">KETENTUAN KONTRAK</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Peserta wajib mengikuti seluruh program pelatihan sesuai jadwal yang telah ditentukan</li>
          <li>Kehadiran minimal 80% untuk dapat mengikuti ujian akhir</li>
          <li>Peserta wajib menjaga sarana dan prasarana pelatihan</li>
          <li>Apabila peserta mangkir lebih dari 3 kali berturut-turut, maka kontrak dianggap batal</li>
          <li>Sertifikat hanya diberikan kepada peserta yang lulus ujian akhir</li>
        </ul>
      </div>
      
      <div className="flex justify-between items-center mt-16">
        <div className="text-center">
          <p className="font-medium">Peserta</p>
          <div className="h-20 w-40 border-b border-gray-400 mx-auto mt-12"></div>
          <p>{namaPeserta}</p>
        </div>
        
        <div className="text-center">
          <p className="font-medium">Petugas</p>
          <div className="h-20 w-40 border-b border-gray-400 mx-auto mt-12"></div>
          <p>{namaPetugas}</p>
        </div>
      </div>
    </div>
  );
}