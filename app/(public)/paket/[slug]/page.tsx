import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface Params {
  slug: string;
}

const paketData: Record<string, { image: string; title: string; description: string; price: string }> = {
  paket1: { 
    image: "/img/paket/pkt1.webp", 
    title: "Paket 1 - Pelatihan Dasar",
    description: "Paket pelatihan dasar dengan 5 modul pelatihan. Cocok untuk pemula yang ingin memulai karir di bidang menjahit dan tata rias.",
    price: "Rp 2.000.000"
  },
  paket2: { 
    image: "/img/paket/pkt2.webp", 
    title: "Paket 2 - Pelatihan Menengah",
    description: "Paket pelatihan menengah dengan 11 modul pelatihan. Meningkatkan keterampilan dengan teknik yang lebih advanced.",
    price: "Rp 3.500.000"
  },
  paket3: { 
    image: "/img/paket/pkt3.webp", 
    title: "Paket 3 - Pelatihan Lengkap",
    description: "Paket pelatihan lengkap dengan 24 modul pelatihan. Kurikulum komprehensif untuk siap kerja dan wirausaha.",
    price: "Rp 6.000.000"
  },
  paket4: { 
    image: "/img/paket/pkt4.webp", 
    title: "Paket 4 - Pelatihan Advanced",
    description: "Paket pelatihan advanced dengan 26 modul. Untuk peserta yang ingin menguasai semua aspek industri kreatif.",
    price: "Rp 14.000.000"
  },
  paket5: { 
    image: "/img/paket/pkt5.webp", 
    title: "Paket 5 - Program Premium",
    description: "Program pelatihan premium dengan sertifikasi lengkap. Mencetak tenaga terampil siap kerja dan berwirausaha.",
    price: "Rp 16.000.000"
  },
};

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const paket = paketData[slug];

  if (!paket) {
    return {
      title: 'Paket Tidak Ditemukan',
      description: 'Halaman paket pelatihan yang Anda cari tidak ditemukan.',
    };
  }

  return {
    title: paket.title,
    description: paket.description,
    keywords: [
      slug,
      `pelatihan ${paket.title.toLowerCase()}`,
      'program pelatihan LPK',
      'kursus menjahit Lombok',
      'pelatihan tata rias NTB',
    ],
    openGraph: {
      title: `${paket.title} - LPK Dua Berkah`,
      description: paket.description,
      url: `https://lpkduaberkah.com/paket/${slug}`,
      images: [
        {
          url: paket.image,
          width: 1200,
          height: 800,
          alt: paket.title,
        },
      ],
    },
    alternates: {
      canonical: `https://lpkduaberkah.com/paket/${slug}`,
    },
  };
}

export default async function PaketDetailPage(
  { params }: { params: Promise<Params> }
) {

  const { slug } = await params;
  const paket = paketData[slug];

  if (!paket) {
    return <div>Paket tidak ditemukan</div>;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        <h1 className="text-3xl font-bold text-center p-8">
          {paket.title}
        </h1>

        <div className="relative w-full h-160">
          <Image
            src={paket.image}
            alt={paket.title}
            loading='eager'
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="p-8 text-center">
          <Link
            href="/daftar"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Daftar Sekarang
          </Link>
        </div>

      </div>
    </div>
  );
}