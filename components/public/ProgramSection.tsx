import PaketCard from './PaketCard';

export default function ProgramSection() {
  return (
    <section id="program">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="space-y-6 text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd" />
            </svg>
            Program Unggulan
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Tingkatkan Skill & Karier Anda dengan
            <span className="bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">Program
              Pelatihan</span> Terbaik
          </h2>
          <p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto lg:mx-0">
            Temukan berbagai program pelatihan intensif yang dirancang oleh industri, dengan kurikulum terkini
            dan instruktur berpengalaman untuk mempersiapkan Anda menghadapi tantangan dunia kerja modern.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Sertifikasi Profesional</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Job Placement Support</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Flexible Learning</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          <PaketCard 
            title="Paket 1" 
            price="Rp. 2.000.000" 
            trainingsCount="5 Pelatihan" 
            coverImage="/img/paket/cover/Paket1.jpg" 
            slug="paket1"
          />
          <PaketCard 
            title="Paket 2" 
            price="Rp. 3.500.000" 
            trainingsCount="11 Pelatihan" 
            coverImage="/img/paket/cover/Paket2.jpg" 
            slug="paket2"
          />
          <PaketCard 
            title="Paket 3" 
            price="Rp. 6.000.000" 
            trainingsCount="24 Pelatihan" 
            coverImage="/img/paket/cover/Paket3.jpg" 
            slug="paket3"
          />
          <PaketCard 
            title="Paket 4" 
            price="Rp. 14.000.000" 
            trainingsCount="26 Pelatihan" 
            coverImage="/img/paket/cover/Paket4.jpg" 
            slug="paket4"
          />
          <PaketCard 
            title="Paket 5" 
            price="Rp. 16.000.000" 
            trainingsCount="Lengkap" 
            coverImage="/img/paket/cover/Paket5.jpg" 
            slug="paket5"
          />
        </div>
      </div>
    </section>
  );
}