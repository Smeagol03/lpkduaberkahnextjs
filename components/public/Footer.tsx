'use client';

import { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    const handleScrollLinks = () => {
      const scrollLinks = document.querySelectorAll('.scroll-link');
      
      const handleClick = (e: Event) => {
        e.preventDefault();
        
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: (targetElement as HTMLElement).offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }
      };

      scrollLinks.forEach(link => {
        link.addEventListener('click', handleClick);
      });

      return () => {
        scrollLinks.forEach(link => {
          link.removeEventListener('click', handleClick);
        });
      };
    };

    handleScrollLinks();
  }, []);

  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LPK Dua Berkah</h3>
            <p className="text-blue-200">
              Lembaga Pelatihan Kerja yang berkomitmen meningkatkan kualitas sumber daya manusia melalui program pelatihan vokasional berkualitas.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-blue-200 hover:text-white">Beranda</a></li>
              <li><a href="/paket" className="text-blue-200 hover:text-white">Program</a></li>
              <li><a href="/daftar" className="text-blue-200 hover:text-white">Pendaftaran</a></li>
              <li><a href="/#tentang" className="text-blue-200 hover:text-white scroll-link">Tentang Kami</a></li>
              <li><a href="/#kontak" className="text-blue-200 hover:text-white scroll-link">Kontak</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Program Kami</h4>
            <ul className="space-y-2">
              <li><a href="/paket/paket1" className="text-blue-200 hover:text-white">Paket 1</a></li>
              <li><a href="/paket/paket2" className="text-blue-200 hover:text-white">Paket 2</a></li>
              <li><a href="/paket/paket3" className="text-blue-200 hover:text-white">Paket 3</a></li>
              <li><a href="/paket/paket4" className="text-blue-200 hover:text-white">Paket 4</a></li>
              <li><a href="/paket/paket5" className="text-blue-200 hover:text-white">Paket 5</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak Kami</h4>
            <address className="not-italic text-blue-200">
              <p className="mb-2">Alamat: Dusun Lendang Bedurik, Kelurahan Sekarteja, Kabupaten Lombok Timur</p>
              <p className="mb-2">Telepon: <a href="tel:+6287717398311" className="hover:text-white">+62 877-1739-8311</a></p>
              <p className="mb-2">Email: <a href="mailto:info@lpkduaberkah.com" className="hover:text-white">info@lpkduaberkah.com</a></p>
              <p className="mb-2">Jam Operasional:</p>
              <p className="text-sm">Senin - Jumat: 08.00 - 17.00</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-300">
          <p>&copy; {new Date().getFullYear()} LPK Dua Berkah. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}