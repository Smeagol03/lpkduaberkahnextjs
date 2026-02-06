import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pendaftaran - LPK Dua Berkah',
  description: 'Formulir pendaftaran pelatihan di LPK Dua Berkah',
};

export default function DaftarPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">Formulir Pendaftaran</h1>
          
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Informasi Penting</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Harap isi formulir dengan data yang benar dan akurat</li>
              <li>Lampirkan dokumen yang diperlukan</li>
              <li>Biaya pendaftaran dapat berubah sewaktu-waktu</li>
              <li>Konfirmasi pembayaran diperlukan untuk menyelesaikan pendaftaran</li>
            </ul>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukkan email aktif"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="telepon" className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon *</label>
                <input
                  type="tel"
                  id="telepon"
                  name="telepon"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Contoh: 081234567890"
                />
              </div>
              
              <div>
                <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea
                id="alamat"
                name="alamat"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan alamat lengkap"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program Pelatihan *</label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pelatihan1"
                    name="pelatihan"
                    value="menjahit-dasar"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="pelatihan1" className="ml-3 block text-sm text-gray-700">
                    Menjahit Dasar
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pelatihan2"
                    name="pelatihan"
                    value="menjahit-lanjutan"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="pelatihan2" className="ml-3 block text-sm text-gray-700">
                    Menjahit Lanjutan
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pelatihan3"
                    name="pelatihan"
                    value="tata-rias"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="pelatihan3" className="ml-3 block text-sm text-gray-700">
                    Tata Rias
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pelatihan4"
                    name="pelatihan"
                    value="wirausaha-konveksi"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="pelatihan4" className="ml-3 block text-sm text-gray-700">
                    Wirausaha Konveksi
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="pesan" className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan</label>
              <textarea
                id="pesan"
                name="pesan"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Catatan tambahan atau pertanyaan"
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Saya menyetujui <Link href="/syarat-ketentuan" className="text-blue-600 hover:underline">syarat dan ketentuan</Link> yang berlaku
              </label>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
              >
                Daftar Sekarang
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Sudah mendaftar? <Link href="/admin/login" className="text-blue-600 font-medium hover:underline">Login sebagai peserta</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}