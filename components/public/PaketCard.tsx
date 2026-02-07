import Image from 'next/image';
import Link from 'next/link';

interface PaketCardProps {
  title: string;
  price: string;
  trainingsCount: string;
  coverImage: string;
  slug: string;
}

export default function PaketCard({ title, price, trainingsCount, coverImage, slug }: PaketCardProps) {
  return (
    <Link href={`/paket/${slug}`} className="block rounded-lg p-4 shadow-lg shadow-indigo-100">
      <Image 
        src={coverImage} 
        alt={title} 
        width={400}
        height={224}
        className="h-56 w-full rounded-md object-contain" 
      />

      <div className="mt-2">
        <dl className="bg-green-100 text-green-700 px-4 py-2 rounded-sm">
          <div>
            <dt className="sr-only">Program</dt>
            <dd className="font-medium">{title}</dd>
          </div>
          <div>
            <dt className="sr-only">Harga</dt>
            <dd className="text-lg text-black">{price}</dd>
          </div>
        </dl>

        <div className="mt-6 flex items-center gap-8 text-xs justify-between">
          <div className="inline-flex shrink-0 items-center gap-2">
            <svg className="size-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z">
              </path>
            </svg>
            <div>
              <p className="font-medium">{trainingsCount}</p>
            </div>
          </div>

          <div
            className="inline-flex items-center gap-2 bg-emerald-600 text-white p-2 rounded-md font-semibold hover:bg-emerald-700 transition group cursor-pointer">
            <span>Selengkapnya</span>
            <svg xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}