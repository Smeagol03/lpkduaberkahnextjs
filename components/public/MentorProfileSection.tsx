import Image from 'next/image';
import Link from 'next/link';

export default function MentorProfileSection() {
  return (
    <section className="py-12 bg-gray-50" id="profil">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Kenali <span className="text-green-600">Mentor Anda</span></h2>
          <div className="h-1 w-20 bg-green-600 mx-auto mt-4"></div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Profile Image & Info - Left Side */}
                <div className="w-full lg:w-2/5 relative">
                  <div
                    className="bg-green-600 h-full flex flex-col justify-center items-center p-8 text-white">
                    <div className="mb-6 transform transition-all duration-500 hover:scale-105">
                      <Image 
                        src="/img/harlin.JPG" 
                        alt="Harlin - Pemilik LPK & LKP DUA BERKAH" 
                        width={192}
                        height={192}
                        className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-xl" 
                      />
                    </div>
                    <h2 className="text-3xl font-bold mb-1">HARLIN, S.AP</h2>
                    <p className="text-md font-bold md:text-xl md:font-light mb-4">Direktur Utama Dua Berkah</p>

                    <div
                      className="bg-white text-green-600 text-center text-sm md:text-2xl rounded-full px-6 py-2 font-bold shadow-md">
                      <i className="bi bi-award mr-2"></i>22 Tahun Pengalaman
                    </div>

                    <div className="mt-6 flex gap-4">
                      <a href="https://www.facebook.com/lpk.berkahterakreditasi.9" target="_blank" rel="noopener noreferrer"
                        className="bg-white hover:bg-gray-100 text-green-600 p-3 rounded-full transition-colors"
                        aria-label="Facebook">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="https://wa.me/6287717398311" target="_blank" rel="noopener noreferrer"
                        className="bg-white hover:bg-gray-100 text-green-600 p-3 rounded-full transition-colors"
                        aria-label="WhatsApp">
                        <i className="bi bi-whatsapp"></i>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Profile Content - Right Side */}
                <div className="w-full lg:w-3/5">
                  <div className="p-6 lg:p-10">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-4">Profil Profesional</h3>
                      <p className="text-lg text-gray-700 mb-3">
                        LPK dan LKP 2 berkah hadir untuk Anda.
                      </p>
                      <p className="text-gray-600">
                        Sebagai pemilik dan praktisi konveksi 2 berkah, saya menggabungkan
                        pengalaman praktis dengan pengetahuan mendalam selama <span
                          className="font-bold text-green-600">22 tahun sejak 2003</span>.
                      </p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-xl font-semibold mb-4">Keahlian Utama</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center">
                          <div
                            className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <i className="bi bi-check-lg"></i>
                          </div>
                          <span className="text-gray-700">Konveksi & Pemasaran</span>
                        </div>
                        <div className="flex items-center">
                          <div
                            className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <i className="bi bi-check-lg"></i>
                          </div>
                          <span className="text-gray-700">Konveksi Pesanan</span>
                        </div>
                        <div className="flex items-center">
                          <div
                            className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <i className="bi bi-check-lg"></i>
                          </div>
                          <span className="text-gray-700">Semi & Full Tailor</span>
                        </div>
                        <div className="flex items-center">
                          <div
                            className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <i className="bi bi-check-lg"></i>
                          </div>
                          <span className="text-gray-700">Busana Butik</span>
                        </div>
                        <div className="flex items-center">
                          <div
                            className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <i className="bi bi-check-lg"></i>
                          </div>
                          <span className="text-gray-700">Tata Busana</span>
                        </div>
                        <div className="flex items-center">
                          <div
                            className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                            <i className="bi bi-check-lg"></i>
                          </div>
                          <span className="text-gray-700">Mekanisme Garmen</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-8">
                      <div className="flex items-center mb-2">
                        <i className="bi bi-shield-check text-green-600 text-xl mr-2"></i>
                        <h5 className="font-bold text-green-600 text-lg">Jaminan Kualitas</h5>
                      </div>
                      <p className="text-gray-700">
                        <i className="bi bi-award text-yellow-500 mr-1"></i>
                        Modes jahit 2 BERKAH terpercaya bergaransi
                        <br />
                        <i className="bi bi-cash-stack text-green-600 mr-1"></i>
                        <span className="font-bold">Jaminan uang kembali melalui rekrut kerja</span>
                      </p>
                    </div>

                    <div className="mt-6 text-center md:text-left">
                      <Link href="/daftar"
                        className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors">
                        Daftar Sekarang
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}