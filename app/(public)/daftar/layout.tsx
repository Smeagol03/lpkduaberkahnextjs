import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formulir Pendaftaran Peserta',
  description: 'Daftar sekarang di LPK Dua Berkah untuk mengikuti program pelatihan menjahit, tata rias, dan wirausaha konveksi. Dapatkan sertifikasi resmi dan keterampilan yang dibutuhkan industri.',
  keywords: [
    'pendaftaran LPK',
    'daftar kursus menjahit',
    'daftar pelatihan tata rias',
    'formulir pendaftaran LPK',
    'cara mendaftar LPK Dua Berkah',
    'biaya pelatihan LPK',
  ],
  openGraph: {
    title: 'Pendaftaran Peserta - LPK Dua Berkah',
    description: 'Daftar sekarang di LPK Dua Berkah untuk mengikuti program pelatihan dengan sertifikasi resmi.',
    url: 'https://lpkduaberkah.com/daftar',
  },
  alternates: {
    canonical: 'https://lpkduaberkah.com/daftar',
  },
};

export default function DaftarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
