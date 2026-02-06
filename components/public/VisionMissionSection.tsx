export default function VisionMissionSection() {
  return (
    <section id="vision" className="bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Visi & <span className="text-green-600 dark:text-green-400">Misi</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-300">
            Kami berkomitmen untuk menjadi lembaga pelatihan terdepan yang menghasilkan tenaga kerja
            profesional, beretika, dan unggul dalam kompetensi global.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Visi */}
          <div
            className="relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-14 h-14 rounded-xl bg-green-600/10 dark:bg-green-400/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.884 5.237l-1.88 1.88M16.116 5.237l1.88 1.88M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Visi</h3>
                <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  Terciptanya Generasi Yang Kompeten, Berdaya Mandiri, Terampil, Berkualitas, Dengan
                  Kreatifitas Tinggi
                </p>
              </div>
            </div>
          </div>

          {/* Misi */}
          <div
            className="relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-14 h-14 rounded-xl bg-green-600/10 dark:bg-green-400/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="w-full">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Misi</h3>
                <ul
                  className="mt-3 space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 list-disc list-outside">
                  <li>Mencetak generasi yang terampil, yang kompeten, beriman dan bertaqwa dan mengurangi
                    tingkat pengangguran.</li>
                  <li>Menumbuhkan semangat muda dengan jiwa wirausaha, sehingga terciptanya lapangan
                    pekerjaan.</li>
                  <li>Menjadi tenaga terampil yang kompeten, produktif yang profesional sesuai kebutuhan
                    di bidang wirausaha dan dunia industri.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}