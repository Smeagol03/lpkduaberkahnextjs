import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LPK Dua Berkah',
  description: 'Lembaga Pelatihan Kerja Dua Berkah - Menyediakan pelatihan vokasional berkualitas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}