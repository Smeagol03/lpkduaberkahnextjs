'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

interface PaketCardProps {
  title: string;
  price: string;
  trainingsCount: string;
  coverImage: string;
  slug: string;
  index?: number;
  popular?: boolean;
}

export default function PaketCard({ title, price, trainingsCount, coverImage, slug, index = 0, popular = false }: PaketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link href={`/paket/${slug}`} className={`block h-full rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${popular ? 'ring-2 ring-amber-400 shadow-amber-100 dark:shadow-amber-900/20' : 'shadow-indigo-100 dark:shadow-indigo-900/20'}`}>
        <motion.div
          className="overflow-hidden rounded-lg relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={coverImage}
            alt={title}
            width={400}
            height={224}
            className="h-48 md:h-56 w-full rounded-lg object-contain"
          />
          {popular && (
            <div className="absolute top-3 right-3 bg-linear-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Popular
            </div>
          )}
        </motion.div>

        <div className="mt-3">
          <dl className={`${popular ? 'bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/20 text-amber-700 dark:text-amber-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'} px-4 py-3 rounded-lg`}>
            <div>
              <dt className="sr-only">Program</dt>
              <dd className="font-bold">{title}</dd>
            </div>
            <div>
              <dt className="sr-only">Harga</dt>
              <dd className="text-lg font-extrabold text-gray-900 dark:text-white">{price}</dd>
            </div>
          </dl>

          <div className="mt-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{trainingsCount}</span>
            </div>

            <motion.div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-sm cursor-pointer ${
                popular
                  ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Lihat</span>
              <svg xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}