import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface Params {
  slug: string;
}

const siteUrl = 'https://lpkduaberkah.com';

const paketData: Record<string, { image: string; title: string; description: string; price: string; modules: number }> = {
  paket1: {
    image: "/img/paket/pkt1.webp",
    title: "Paket 1 - Pelatihan Dasar",
    description: "Paket pelatihan dasar dengan 5 modul pelatihan. Cocok untuk pemula yang ingin memulai karir di bidang menjahit dan tata rias.",
    price: "Rp 2.000.000",
    modules: 5
  },
  paket2: {
    image: "/img/paket/pkt2.webp",
    title: "Paket 2 - Pelatihan Menengah",
    description: "Paket pelatihan menengah dengan 11 modul pelatihan. Meningkatkan keterampilan dengan teknik yang lebih advanced.",
    price: "Rp 3.500.000",
    modules: 11
  },
  paket3: {
    image: "/img/paket/pkt3.webp",
    title: "Paket 3 - Pelatihan Lengkap",
    description: "Paket pelatihan lengkap dengan 24 modul pelatihan. Kurikulum komprehensif untuk siap kerja dan wirausaha.",
    price: "Rp 6.000.000",
    modules: 24
  },
  paket4: {
    image: "/img/paket/pkt4.webp",
    title: "Paket 4 - Pelatihan Advanced",
    description: "Paket pelatihan advanced dengan 26 modul. Untuk peserta yang ingin menguasai semua aspek industri kreatif.",
    price: "Rp 14.000.000",
    modules: 26
  },
  paket5: {
    image: "/img/paket/pkt5.webp",
    title: "Paket 5 - Program Premium",
    description: "Program pelatihan premium dengan sertifikasi lengkap. Mencetak tenaga terampil siap kerja dan berwirausaha.",
    price: "Rp 16.000.000",
    modules: 30
  },
};

// Extract price as number for schema
const getPriceInRupiah = (price: string): number => {
  return parseInt(price.replace(/[^0-9]/g, ''));
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
      url: `${siteUrl}/paket/${slug}`,
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
      canonical: `${siteUrl}/paket/${slug}`,
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

  // Product Schema for Rich Snippets
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": paket.title,
    "description": paket.description,
    "image": `${siteUrl}${paket.image}`,
    "offers": {
      "@type": "Offer",
      "price": getPriceInRupiah(paket.price),
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/paket/${slug}`,
      "seller": {
        "@type": "Organization",
        "name": "LPK Dua Berkah",
        "url": siteUrl
      }
    },
    "brand": {
      "@type": "Brand",
      "name": "LPK Dua Berkah"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Paket",
        "item": `${siteUrl}/paket`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": paket.title,
        "item": `${siteUrl}/paket/${slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen py-12">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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