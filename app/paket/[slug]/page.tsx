import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface Params {
  slug: string;
}

// Data dummy untuk contoh - dalam implementasi nyata ini akan diambil dari database
const paketData = {
  paket1: {
    title: "Paket 1",
    price: "Rp. 2.000.000",
    trainingsCount: "5 Pelatihan",
    coverImage: "/img/paket/cover/Paket1.jpg",
    description: "Paket pelatihan dasar yang cocok untuk pemula yang ingin mempelajari keterampilan dasar dalam bidang menjahit dan tata busana.",
    trainings: [
      "Dasar Menjahit",
      "Pola Pakaian Sederhana",
      "Teknik Jahit Tangan",
      "Pengenalan Mesin Jahit",
      "Perawatan Pakaian"
    ],
    benefits: [
      "Instruktur berpengalaman",
      "Modul pelatihan lengkap",
      "Sertifikat kelulusan",
      "Bimbingan pasca pelatihan"
    ]
  },
  paket2: {
    title: "Paket 2",
    price: "Rp. 3.500.000",
    trainingsCount: "11 Pelatihan",
    coverImage: "/img/paket/cover/Paket2.jpg",
    description: "Paket pelatihan lanjutan yang mencakup berbagai teknik menjahit dan desain pakaian untuk meningkatkan keterampilan Anda.",
    trainings: [
      "Desain Pakaian",
      "Teknik Jahit Mesin",
      "Pembuatan Pola Lanjutan",
      "Teknik Bordir",
      "Desain Grafis untuk Fashion",
      "Manajemen Produksi",
      "Pengantar Wirausaha",
      "Teknik Finishing",
      "Quality Control",
      "Pengantar Pemasaran Produk",
      "Praktek Lapangan"
    ],
    benefits: [
      "Semua materi Paket 1",
      "Proyek praktek langsung",
      "Mentoring individu",
      "Akses ke komunitas alumni"
    ]
  },
  paket3: {
    title: "Paket 3",
    price: "Rp. 6.000.000",
    trainingsCount: "24 Pelatihan",
    coverImage: "/img/paket/cover/Paket3.jpg",
    description: "Paket pelatihan komprehensif yang mencakup semua aspek menjahit dan manajemen usaha konveksi.",
    trainings: [
      "Semua materi Paket 1 & 2",
      "Teknik Pembuatan Busana Formal",
      "Teknik Pembuatan Busana Casual",
      "Teknik Pembuatan Busana Adat",
      "Teknik Pembuatan Jaket",
      "Teknik Pembuatan Celana",
      "Teknik Pembuatan Blazer",
      "Teknik Pembuatan Dress",
      "Teknik Pembuatan Outerwear",
      "Teknik Pembuatan Aksesoris",
      "Teknik Pembuatan Tas",
      "Teknik Pembuatan Sepatu",
      "Teknik Pembuatan Topi",
      "Teknik Pembuatan Pakaian Bayi",
      "Teknik Pembuatan Pakaian Anak",
      "Teknik Pembuatan Pakaian Dewasa",
      "Teknik Pembuatan Seragam",
      "Teknik Pembuatan Pakaian Muslim",
      "Teknik Pembuatan Pakaian Pengantin",
      "Teknik Pembuatan Pakaian Tradisional",
      "Teknik Pembuatan Pakaian Modern",
      "Teknik Pembuatan Pakaian Olahraga",
      "Teknik Pembuatan Pakaian Kerja",
      "Teknik Pembuatan Pakaian Santai"
    ],
    benefits: [
      "Semua materi Paket 1 & 2",
      "Sesi mentoring intensif",
      "Proyek kolaboratif",
      "Sertifikasi internasional",
      "Dukungan awal usaha"
    ]
  },
  paket4: {
    title: "Paket 4",
    price: "Rp. 14.000.000",
    trainingsCount: "26 Pelatihan",
    coverImage: "/img/paket/cover/Paket4.jpg",
    description: "Paket pelatihan profesional dengan fokus pada kewirausahaan dan manajemen usaha konveksi.",
    trainings: [
      "Semua materi Paket 1, 2 & 3",
      "Manajemen Produksi Konveksi",
      "Manajemen Keuangan Usaha",
      "Pemasaran Produk Fashion",
      "Manajemen SDM",
      "Manajemen Rantai Pasok",
      "Manajemen Kualitas",
      "Manajemen Operasional",
      "Manajemen Pemasaran Digital",
      "Manajemen Media Sosial",
      "Manajemen E-commerce",
      "Manajemen Brand",
      "Manajemen Customer Service",
      "Manajemen Inventory",
      "Manajemen Pengadaan Bahan",
      "Manajemen Desain Produk",
      "Manajemen Trend Fashion",
      "Manajemen Produksi Massal",
      "Manajemen Produksi Custom",
      "Manajemen Produksi Sample",
      "Manajemen Produksi Prototipe",
      "Manajemen Produksi Ready to Wear",
      "Manajemen Produksi Semi-Bespoke",
      "Manajemen Produksi Bespoke",
      "Manajemen Produksi Haute Couture",
      "Manajemen Produksi Sustainable Fashion"
    ],
    benefits: [
      "Semua materi Paket 1, 2 & 3",
      "Mentoring bisnis",
      "Akses ke supplier premium",
      "Jaringan mitra bisnis",
      "Dukungan legalitas usaha"
    ]
  },
  paket5: {
    title: "Paket 5",
    price: "Rp. 16.000.000",
    trainingsCount: "Lengkap",
    coverImage: "/img/paket/cover/Paket5.jpg",
    description: "Paket pelatihan lengkap dengan pendekatan holistik terhadap industri fashion dan kewirausahaan.",
    trainings: [
      "Semua materi Paket 1, 2, 3 & 4",
      "Fashion Technology",
      "Digital Fashion Design",
      "Sustainable Fashion",
      "Ethical Fashion",
      "Luxury Fashion",
      "Mass Market Fashion",
      "Custom Fashion",
      "Ready to Wear",
      "Haute Couture",
      "Bridal Fashion",
      "Children Fashion",
      "Men's Fashion",
      "Women's Fashion",
      "Unisex Fashion",
      "Special Occasion Fashion",
      "Workwear Fashion",
      "Sports Fashion",
      "Streetwear Fashion",
      "Avant-garde Fashion",
      "Vintage Fashion",
      "Modern Fashion",
      "Traditional Fashion",
      "Contemporary Fashion",
      "Future Fashion",
      "Cross-cultural Fashion"
    ],
    benefits: [
      "Semua materi Paket 1, 2, 3 & 4",
      "Akses ke fashion week",
      "Kesempatan kolaborasi desainer",
      "Mentoring internasional",
      "Sertifikasi global"
    ]
  }
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const paket = paketData[params.slug as keyof typeof paketData];
  
  if (!paket) {
    return {
      title: 'Paket Tidak Ditemukan - LPK Dua Berkah',
      description: 'Paket pelatihan yang Anda cari tidak ditemukan',
    };
  }

  return {
    title: `${paket.title} - Program Pelatihan - LPK Dua Berkah`,
    description: paket.description,
  };
}

export default function PaketDetailPage({ params }: { params: Params }) {
  const paket = paketData[params.slug as keyof typeof paketData];

  if (!paket) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Paket Tidak Ditemukan</h1>
            <p className="text-gray-700 mb-6">Maaf, paket pelatihan yang Anda cari tidak tersedia.</p>
            <Link href="/paket" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
              Kembali ke Semua Paket
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <Image 
                src={paket.coverImage} 
                alt={paket.title} 
                width={600}
                height={400}
                className="h-64 w-full object-cover md:h-full md:w-full rounded-t-xl md:rounded-l-xl md:rounded-t-none" 
              />
            </div>
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">{paket.trainingsCount}</div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">{paket.title}</h1>
              <p className="mt-4 text-2xl text-green-600 font-bold">{paket.price}</p>
              <p className="mt-4 text-gray-600">{paket.description}</p>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Keunggulan Paket Ini:</h2>
                <ul className="space-y-2">
                  {paket.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/daftar" 
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-300 inline-block text-center"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
          
          <div className="p-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Daftar Pelatihan dalam Paket Ini:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paket.trainings.map((training, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 mr-2 font-bold">{index + 1}.</span>
                  <span className="text-gray-700">{training}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-8 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Butuh Informasi Lebih Lanjut?</h3>
                <p className="text-gray-600">Hubungi kami untuk konsultasi gratis</p>
              </div>
              <a 
                href="https://wa.me/6287717398311" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}