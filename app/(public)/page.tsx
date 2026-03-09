import HeroSection from '@/components/public/HeroSection';
import AboutSection from '@/components/public/AboutSection';
import VisionMissionSection from '@/components/public/VisionMissionSection';
import ProgramSection from '@/components/public/ProgramSection';
import WhyChooseUsSection from '@/components/public/WhyChooseUsSection';
import MentorProfileSection from '@/components/public/MentorProfileSection';
import ContactSection from '@/components/public/ContactSection';
import GallerySection from '@/components/public/GallerySection';

const siteUrl = 'https://lpkduaberkah.com';

// FAQ Schema for Rich Snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Berapa biaya pelatihan di LPK Dua Berkah?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Biaya pelatihan bervariasi mulai dari Rp 2.000.000 hingga Rp 16.000.000 tergantung paket yang dipilih. Kami menyediakan 5 paket pelatihan dengan jumlah modul yang berbeda-beda. Tersedia juga promo diskon 13% untuk pembayaran penuh di muka."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah ada sertifikat setelah lulus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ya, semua paket pelatihan termasuk sertifikat resmi yang terakreditasi. Sertifikat ini diakui secara nasional dan dapat digunakan untuk melamar kerja atau memulai usaha sendiri di bidang konveksi dan tata rias."
      }
    },
    {
      "@type": "Question",
      "name": "Berapa lama durasi pelatihan?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Durasi pelatihan tergantung paket yang dipilih. Paket 1 dengan 5 modul dapat diselesaikan dalam waktu singkat, sedangkan Paket 5 dengan program lengkap membutuhkan waktu lebih lama. Kami juga menyediakan fleksibilitas jadwal untuk menyesuaikan dengan kesibukan Anda."
      }
    },
    {
      "@type": "Question",
      "name": "Apakah ada jaminan kerja setelah lulus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kami memiliki program rekrutmen untuk lulusan terbaik yang ingin langsung bekerja. Selain itu, dengan bekal keterampilan yang diperoleh dan sertifikat resmi, alumni kami memiliki tingkat penyerapan kerja yang tinggi di industri konveksi dan tata rias."
      }
    },
    {
      "@type": "Question",
      "name": "Bagaimana cara mendaftar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pendaftaran dapat dilakukan secara online melalui website kami di halaman /daftar atau datang langsung ke lokasi kami di Dusun Lendang Bedurik, Kelurahan Sekarteja, Lombok Timur. Untuk informasi lebih lanjut, hubungi kami di 0877-1739-8311."
      }
    }
  ]
};

// Breadcrumb Schema for Homepage
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteUrl
    }
  ]
};

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeroSection />
      <div className="relative flex items-center py-5">
        <div className="grow border-t border-gray-400"></div>
        <span className="mx-4 shrink text-gray-600 text-sm uppercase tracking-wider font-medium">
          <span className="text-black">LPK & LKP</span><span className="text-red-500"> DUA</span><span className="text-green-500"> BERKAH</span>
        </span>
        <div className="grow border-t border-gray-400"></div>
      </div>
      <AboutSection />
      <VisionMissionSection />
      <ProgramSection />
      <WhyChooseUsSection />
      <MentorProfileSection />
      <ContactSection />
      <GallerySection />
    </div>
  );
}