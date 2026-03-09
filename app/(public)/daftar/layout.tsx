import { Metadata } from 'next';

const siteUrl = 'https://lpkduaberkah.com';

export const metadata: Metadata = {
  title: 'Daftar Pelatihan',
  description: 'Daftar sekarang untuk mengikuti pelatihan di LPK Dua Berkah. Pilih paket pelatihan menjahit, tata rias, atau wirausaha konveksi. Proses pendaftaran mudah dan cepat.',
  keywords: [
    'daftar pelatihan LPK',
    'pendaftaran LPK Dua Berkah',
    'kursus menjahit Lombok Timur',
    'pelatihan tata rias NTB',
    'formulir pendaftaran pelatihan',
  ],
  openGraph: {
    title: 'Daftar Pelatihan - LPK Dua Berkah',
    description: 'Bergabunglah bersama ribuan alumni LPK Dua Berkah. Daftar sekarang untuk mengikuti pelatihan vokasional berkualitas dengan sertifikasi resmi.',
    url: `${siteUrl}/daftar`,
  },
  alternates: {
    canonical: `${siteUrl}/daftar`,
  },
};

export default function DaftarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
