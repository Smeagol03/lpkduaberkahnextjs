// services/kontrakService.ts
import {
  ref,
  onValue,
  get,
  set,
  update,
  remove,
  push
} from 'firebase/database';
import { db } from '@/lib/firebase';
import { logger } from '@/lib/logger';

logger.debug('kontrakService - Using centralized Firebase instance');

export interface Kontrak {
  id?: string;
  nomorKontrak: string;
  pesertaId: string;
  programId: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  biaya: number;
  status: 'aktif' | 'selesai' | 'dibatalkan';
  syaratDanKetentuan?: string;
  tandatanganDigital?: string;
}

export interface KontrakResponse {
  success: boolean;
  data?: Kontrak | Kontrak[];
  error?: string;
}

/**
 * Get all kontrak
 */
export const getAllKontrak = async (): Promise<KontrakResponse> => {
  try {
    const kontrakRef = ref(db, 'kontrak');
    const snapshot = await get(kontrakRef);

    if (snapshot.exists()) {
      const kontrakData = snapshot.val();
      const kontrakArray: Kontrak[] = [];

      Object.keys(kontrakData).forEach(key => {
        kontrakArray.push({
          id: key,
          ...kontrakData[key]
        });
      });

      return {
        success: true,
        data: kontrakArray
      };
    } else {
      return {
        success: true,
        data: []
      };
    }
  } catch (error: any) {
    console.error('Error getting kontrak:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data kontrak'
    };
  }
};

/**
 * Get kontrak by ID
 */
export const getKontrakById = async (id: string): Promise<KontrakResponse> => {
  try {
    const kontrakRef = ref(db, `kontrak/${id}`);
    const snapshot = await get(kontrakRef);

    if (snapshot.exists()) {
      return {
        success: true,
        data: {
          id,
          ...snapshot.val()
        }
      };
    } else {
      return {
        success: false,
        error: 'Kontrak tidak ditemukan'
      };
    }
  } catch (error: any) {
    console.error('Error getting kontrak by ID:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data kontrak'
    };
  }
};

/**
 * Add new kontrak
 */
export const addKontrak = async (kontrak: Omit<Kontrak, 'id'>): Promise<KontrakResponse> => {
  try {
    const kontrakRef = ref(db, 'kontrak');
    const newKontrakRef = push(kontrakRef);

    // Generate nomor kontrak otomatis jika belum disediakan
    const kontrakWithNumber = {
      ...kontrak,
      nomorKontrak: kontrak.nomorKontrak || `KTR-${Date.now()}`
    };

    await set(newKontrakRef, kontrakWithNumber);

    return {
      success: true,
      data: {
        id: newKontrakRef.key,
        ...kontrakWithNumber
      }
    };
  } catch (error: any) {
    console.error('Error adding kontrak:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menambahkan kontrak'
    };
  }
};

/**
 * Update kontrak by ID
 */
export const updateKontrakById = async (id: string, updates: Partial<Kontrak>): Promise<KontrakResponse> => {
  try {
    const kontrakRef = ref(db, `kontrak/${id}`);
    await update(kontrakRef, updates);

    return {
      success: true,
      data: {
        id,
        ...updates
      } as Kontrak
    };
  } catch (error: any) {
    console.error('Error updating kontrak:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat memperbarui kontrak'
    };
  }
};

/**
 * Delete kontrak by ID
 */
export const deleteKontrakById = async (id: string): Promise<KontrakResponse> => {
  try {
    const kontrakRef = ref(db, `kontrak/${id}`);
    await remove(kontrakRef);

    return {
      success: true
    };
  } catch (error: any) {
    console.error('Error deleting kontrak:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menghapus kontrak'
    };
  }
};

/**
 * Subscribe to kontrak changes
 */
export const subscribeToKontrakChanges = (callback: (kontrak: Kontrak[]) => void) => {
  const kontrakRef = ref(db, 'kontrak');

  return onValue(kontrakRef, (snapshot) => {
    if (snapshot.exists()) {
      const kontrakData = snapshot.val();
      const kontrakArray: Kontrak[] = [];

      Object.keys(kontrakData).forEach(key => {
        kontrakArray.push({
          id: key,
          ...kontrakData[key]
        });
      });

      callback(kontrakArray);
    } else {
      callback([]);
    }
  });
};