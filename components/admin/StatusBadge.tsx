'use client';

interface StatusBadgeProps {
  status: string;
  type?: 'pendaftar' | 'peserta' | 'kontrak' | 'default';
}

type StatusConfigItem = { label: string; color: string };

const statusConfig: Record<string, Record<string, StatusConfigItem>> = {
  pendaftar: {
    menunggu: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
    disetujui: { label: 'Disetujui', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
    ditolak: { label: 'Ditolak', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
  },
  peserta: {
    baru: { label: 'Baru', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' },
    aktif: { label: 'Aktif', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
    lulus: { label: 'Lulus', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
    ditolak: { label: 'Ditolak', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
  },
  kontrak: {
    aktif: { label: 'Aktif', color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' },
    selesai: { label: 'Selesai', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' },
    dibatalkan: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' },
  },
  default: {},
};

export default function StatusBadge({ status, type = 'default' }: StatusBadgeProps) {
  const config = statusConfig[type]?.[status];
  
  if (!config) {
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : '-'}
      </span>
    );
  }

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}
