import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Tentang <span className="text-green-600 dark:text-green-400">Kami</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              LPK & LKP DUA BERKAH adalah lembaga pelatihan kursus menjahit yang berlokasi di Dusun Lendang
              Bedurik,
              Kelurahan Sekarteja, Kabupaten Lombok Timur. Kami menyediakan kursus menjahit bagi pemula hingga
              mahir, serta kursus wirausaha konveksi.
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Dengan bergabung di LPK & LKP DUA BERKAH, Anda akan mendapatkan pengalaman belajar yang
              menyenangkan
              dan mendidik. Instruktur kami adalah para ahli di bidangnya, sehingga Anda akan mendapatkan
              pembelajaran yang berkualitas.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm text-center">
                <div className="flex justify-center mb-3">
                  <Image src="/img/instructor.png" alt="Instruktur Ahli" width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
                <h5 className="text-base font-bold text-gray-900 dark:text-white">Instruktur Ahli</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">Pelatihan profesional</p>
              </div>
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm text-center">
                <div className="flex justify-center mb-3">
                  <Image src="/img/certificate.png" alt="Bersertifikat" width={40} height={40} className="w-10 h-10 object-contain" />
                </div>
                <h5 className="text-base font-bold text-gray-900 dark:text-white">Bersertifikat</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">Sertifikat diakui industri</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#program"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-green-700 transition-all hover:scale-105">
                Lihat Program Kami
              </a>
              <a href="#layanan"
                className="inline-flex items-center justify-center rounded-lg bg-white dark:bg-gray-800 px-6 py-3 text-gray-900 dark:text-white font-semibold shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all hover:scale-105">
                Hubungi Kami
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="relative">
            <Image 
              src="/img/galeri/8.webp" 
              alt="Tentang Kami" 
              width={600}
              height={400}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-md" 
            />
            <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-6 rounded-2xl shadow-lg">
              <p className="text-sm font-semibold">Terpercaya Sejak</p>
              <p className="text-2xl font-bold">2003</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}