import { Metadata } from 'next';
import PaketCard from '@/components/public/PaketCard';

export const metadata: Metadata = {
  title: 'Program Pelatihan - LPK Dua Berkah',
  description: 'Temukan berbagai program pelatihan yang tersedia di LPK Dua Berkah',
};

export default function PaketPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Program Pelatihan Kami</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Temukan berbagai program pelatihan intensif yang dirancang oleh industri, dengan kurikulum terkini
            dan instruktur berpengalaman untuk mempersiapkan Anda menghadapi tantangan dunia kerja modern.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PaketCard 
            title="Paket 1" 
            price="Rp. 2.000.000" 
            trainingsCount="5 Pelatihan" 
            coverImage="/img/paket/cover/Paket1.jpg" 
            slug="paket1"
          />
          <PaketCard 
            title="Paket 2" 
            price="Rp. 3.500.000" 
            trainingsCount="11 Pelatihan" 
            coverImage="/img/paket/cover/Paket2.jpg" 
            slug="paket2"
          />
          <PaketCard 
            title="Paket 3" 
            price="Rp. 6.000.000" 
            trainingsCount="24 Pelatihan" 
            coverImage="/img/paket/cover/Paket3.jpg" 
            slug="paket3"
          />
          <PaketCard 
            title="Paket 4" 
            price="Rp. 14.000.000" 
            trainingsCount="26 Pelatihan" 
            coverImage="/img/paket/cover/Paket4.jpg" 
            slug="paket4"
          />
          <PaketCard 
            title="Paket 5" 
            price="Rp. 16.000.000" 
            trainingsCount="Lengkap" 
            coverImage="/img/paket/cover/Paket5.jpg" 
            slug="paket5"
          />
        </div>
        
        <div className="mt-12 bg-blue-50 p-6 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Ingin Informasi Lebih Lanjut?</h2>
          <p className="text-gray-700 mb-6">
            Hubungi kami untuk mendapatkan informasi detail tentang program pelatihan yang Anda minati
          </p>
          <a 
            href="https://wa.me/6287717398311" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}