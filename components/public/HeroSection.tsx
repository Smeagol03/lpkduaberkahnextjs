import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section id="hero" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-medium text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Selamat Datang di
              <span className="text-black">LPK & LKP</span><span className="text-red-600"> DUA</span><span
                className="text-green-600"> BERKAH</span>
            </h1>
            <p className="mt-4 text-xs md:text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
              Bergabunglah bersama kami untuk pengalaman belajar yang transformatif dan skill yang relevan
              dengan industri.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/daftar"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-green-700 transition-all hover:scale-105">
                Daftar Sekarang
              </Link>
            </div>
          </div>
          {/* Image */}
          <div className="relative">
            <Image 
              src="/img/galeri/1.webp" 
              alt="Pelatihan" 
              width={600}
              height={400}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-md" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}