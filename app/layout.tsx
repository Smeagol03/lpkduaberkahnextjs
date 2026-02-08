import "./globals.css";
import { Fredoka } from "next/font/google";
import type { Metadata } from "next";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });

export const metadata: Metadata = {
  title: "LPK Dua Berkah",
  description:
    "Lembaga Pelatihan Kerja Dua Berkah - Menyediakan pelatihan vokasional berkualitas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${fredoka.variable} font-sans`}>{children}</body>
    </html>
  );
}
