import Image from 'next/image';
import Link from 'next/link';

export default function WhyChooseUsSection() {
  return (
    <section id="kenapa">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="bg-green-600 p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-2xl text-white md:text-3xl">
                Bukan Sekadar Kursus Menjahit Biasa
              </h2>
              <div
                className="text-left sm:mt-4 bg-white/10 backdrop-blur-md rounded-xl p-4 text-white/90 space-y-2 shadow-lg">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>Keunggulan Kami</span>
                </h3>
                <ul className="list-disc list-outside text-sm sm:text-base space-y-1 pl-2">
                  <li>Instruktur berpengalaman & profesional.</li>
                  <li>Fasilitas lengkap dan nyaman.</li>
                  <li>Garansi uang kembali lewat program rekrutmen tim produksi.</li>
                  <li>Peluang kerja dan wirausaha setelah lulus.</li>
                  <li>Jaringan luas di dunia konveksi dan fashion.</li>
                </ul>
              </div>
              <div className="mt-4 md:mt-8">
                <Link href="/daftar"
                  className="inline-block rounded-sm border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:ring-3 focus:ring-yellow-400 focus:outline-hidden">
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>

          <div>
            <Image 
              src="/img/galeri/5.webp" 
              alt="Kenapa Memilih Kami" 
              width={600}
              height={400}
              className="h-40 w-full object-cover sm:h-56 md:h-full" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}