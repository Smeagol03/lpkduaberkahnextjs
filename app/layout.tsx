import "./globals.css";
import { Fredoka } from "next/font/google";
import type { Metadata, Viewport } from "next";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });

const siteUrl = "https://lpkduaberkah.com";

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LPK Dua Berkah - Lembaga Pelatihan Kerja Terakreditasi Lombok Timur",
    template: "%s | LPK Dua Berkah",
  },
  description: "LPK Dua Berkah adalah lembaga pelatihan kerja terakreditasi di Lombok Timur. Menyediakan pelatihan menjahit, tata rias, dan wirausaha konveksi dengan sertifikasi resmi dan instruktur berpengalaman.",
  keywords: [
    "LPK Lombok Timur",
    "lembaga pelatihan kerja",
    "pelatihan menjahit",
    "kursus menjahit",
    "pelatihan tata rias",
    "kursus kecantikan",
    "wirausaha konveksi",
    "pelatihan vokasional",
    "LPK terakreditasi",
    "sertifikasi kerja",
    "pelatihan NTB",
    "kursus Lombok",
  ],
  authors: [{ name: "LPK Dua Berkah" }],
  creator: "LPK Dua Berkah",
  publisher: "LPK Dua Berkah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "LPK Dua Berkah",
    title: "LPK Dua Berkah - Lembaga Pelatihan Kerja Terakreditasi Lombok Timur",
    description: "Lembaga pelatihan kerja terakreditasi di Lombok Timur. Pelatihan menjahit, tata rias, dan wirausaha konveksi dengan sertifikasi resmi.",
    images: [
      {
        url: "/img/logo.png",
        width: 1200,
        height: 630,
        alt: "LPK Dua Berkah Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LPK Dua Berkah - Lembaga Pelatihan Kerja Terakreditasi",
    description: "Lembaga pelatihan kerja terakreditasi di Lombok Timur. Pelatihan menjahit, tata rias, dan wirausaha konveksi.",
    images: ["/img/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "LPK Dua Berkah",
        alternateName: "Lembaga Pelatihan Kerja Dua Berkah",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/img/logo.png`,
          width: 200,
          height: 200,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+62-877-1739-8311",
          contactType: "customer service",
          areaServed: "ID",
          availableLanguage: "Indonesian",
        },
        sameAs: [],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: "LPK Dua Berkah",
        description: "Lembaga Pelatihan Kerja terakreditasi yang menyediakan pelatihan vokasional berkualitas di bidang menjahit, tata rias, dan wirausaha konveksi.",
        url: siteUrl,
        telephone: "+62-877-1739-8311",
        email: "harlinlpkb@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Dusun Lendang Bedurik",
          addressLocality: "Kelurahan Sekarteja",
          addressRegion: "Lombok Timur",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "-8.6500",
          longitude: "116.7500",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "08:00",
          closes: "17:00",
        },
        priceRange: "Rp 2.000.000 - Rp 16.000.000",
        image: `${siteUrl}/img/logo.png`,
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "LPK Dua Berkah",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "id-ID",
      },
    ],
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${fredoka.variable} font-sans`}>{children}</body>
    </html>
  );
}
