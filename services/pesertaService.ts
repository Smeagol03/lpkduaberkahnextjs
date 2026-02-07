// services/pesertaService.ts
import {
  ref,
  onValue,
  get,
  set,
  update,
  remove,
  push,
  query,
  orderByChild,
  equalTo
} from 'firebase/database';
import { db } from '@/lib/firebase';
import { logger } from '@/lib/logger';

logger.debug('pesertaService - Using centralized Firebase instance');

export interface InformasiPribadi {
  namaLengkap: string;
  nik: string;
  noHP: string;
  alamat: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
}

export interface PendidikanPekerjaan {
  pendidikanTerakhir: string;
  pekerjaanSaatIni: string;
}

export interface MotivasiReferensi {
  alasanMengikuti: string;
  sumberInformasi: string;
}

export interface Validasi {
  inputDivalidasi: boolean;
  waktuValidasi: string;
}

export interface Peserta {
  id?: string;
  informasiPribadi: InformasiPribadi;
  pendidikanPekerjaan: PendidikanPekerjaan;
  motivasiReferensi: MotivasiReferensi;
  paketPelatihan: string;
  statusPendaftaran: 'menunggu' | 'disetujui' | 'ditolak';
  statusPeserta: 'baru' | 'aktif' | 'lulus' | 'ditolak';
  tanggalDaftar: string;
  tanggalDiterima?: string;
  validasi: Validasi;
}

export interface PesertaResponse {
  success: boolean;
  data?: Peserta | Peserta[];
  error?: string;
}

/**
 * Get all peserta
 */
export const getAllPeserta = async (): Promise<PesertaResponse> => {
  try {
    logger.debug('getAllPeserta - Fetching all peserta');
    const pesertaRef = ref(db, 'peserta');
    const snapshot = await get(pesertaRef);

    logger.debug('getAllPeserta - Snapshot exists:', snapshot.exists());

    if (snapshot.exists()) {
      const pesertaData = snapshot.val();
      const pesertaArray: Peserta[] = [];

      logger.debug('getAllPeserta - Number of peserta:', Object.keys(pesertaData).length);

      Object.keys(pesertaData).forEach(key => {
        pesertaArray.push({
          id: key,
          ...pesertaData[key]
        });
      });

      return {
        success: true,
        data: pesertaArray
      };
    } else {
      logger.debug('getAllPeserta - No peserta found');
      return {
        success: true,
        data: []
      };
    }
  } catch (error: any) {
    logger.error('getAllPeserta - Error:', error);
    console.error('Error getting peserta:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data peserta'
    };
  }
};

/**
 * Get peserta by ID
 */
export const getPesertaById = async (id: string): Promise<PesertaResponse> => {
  try {
    logger.debug('getPesertaById - Fetching peserta with ID:', id);
    const pesertaRef = ref(db, `peserta/${id}`);
    const snapshot = await get(pesertaRef);

    logger.debug('getPesertaById - Snapshot exists:', snapshot.exists());

    if (snapshot.exists()) {
      const pesertaData = snapshot.val();
      logger.debug('getPesertaById - Raw data from Firebase:', JSON.stringify(pesertaData, null, 2));

      const result = {
        success: true,
        data: {
          id,
          ...pesertaData
        }
      };

      logger.debug('getPesertaById - Returning data:', JSON.stringify(result.data, null, 2));
      return result;
    } else {
      logger.debug('getPesertaById - Peserta not found');
      return {
        success: false,
        error: 'Peserta tidak ditemukan'
      };
    }
  } catch (error: any) {
    logger.error('getPesertaById - Error:', error);
    console.error('Error getting peserta by ID:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data peserta'
    };
  }
};

/**
 * Add new peserta
 */
export const addPeserta = async (peserta: Omit<Peserta, 'id'>): Promise<PesertaResponse> => {
  try {
    logger.debug('addPeserta - Starting to add peserta');
    const pesertaRef = ref(db, 'peserta');
    const newPesertaRef = push(pesertaRef);

    logger.debug('addPeserta - New peserta ref key:', newPesertaRef.key);

    if (!newPesertaRef.key) {
      throw new Error('Failed to generate peserta ID');
    }

    const pesertaWithDate = {
      ...peserta,
      tanggalDaftar: new Date().toISOString(),
      statusPeserta: 'aktif' as const, // Default status for new participants
    };

    logger.debug('addPeserta - Peserta data to save:', JSON.stringify(pesertaWithDate, null, 2));

    await set(newPesertaRef, pesertaWithDate);

    logger.debug('addPeserta - Peserta saved successfully');

    return {
      success: true,
      data: {
        id: newPesertaRef.key,
        ...pesertaWithDate
      } as Peserta
    };
  } catch (error: any) {
    logger.error('addPeserta - Error:', error);
    console.error('Error adding peserta:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menambahkan peserta'
    };
  }
};

/**
 * Update peserta by ID
 */
export const updatePesertaById = async (id: string, updates: Partial<Peserta>): Promise<PesertaResponse> => {
  try {
    logger.debug('updatePesertaById - Updating peserta ID:', id);
    logger.debug('updatePesertaById - Updates:', JSON.stringify(updates, null, 2));

    const pesertaRef = ref(db, `peserta/${id}`);
    await update(pesertaRef, updates);

    logger.debug('updatePesertaById - Update successful');

    // Fetch the complete updated data
    const snapshot = await get(pesertaRef);

    if (snapshot.exists()) {
      logger.debug('updatePesertaById - Fetched updated data');
      return {
        success: true,
        data: {
          id,
          ...snapshot.val()
        }
      };
    } else {
      logger.debug('updatePesertaById - Warning: Data not found after update');
      return {
        success: true,
        data: {
          id,
          ...updates
        } as Peserta
      };
    }
  } catch (error: any) {
    logger.error('updatePesertaById - Error:', error);
    console.error('Error updating peserta:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat memperbarui peserta'
    };
  }
};

/**
 * Delete peserta by ID
 */
export const deletePesertaById = async (id: string): Promise<PesertaResponse> => {
  try {
    const pesertaRef = ref(db, `peserta/${id}`);
    await remove(pesertaRef);

    return {
      success: true
    };
  } catch (error: any) {
    console.error('Error deleting peserta:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menghapus peserta'
    };
  }
};

/**
 * Get peserta by status
 */
export const getPesertaByStatus = async (status: string): Promise<PesertaResponse> => {
  try {
    const pesertaRef = query(ref(db, 'peserta'), orderByChild('statusPeserta'), equalTo(status));
    const snapshot = await get(pesertaRef);

    if (snapshot.exists()) {
      const pesertaData = snapshot.val();
      const pesertaArray: Peserta[] = [];

      Object.keys(pesertaData).forEach(key => {
        pesertaArray.push({
          id: key,
          ...pesertaData[key]
        });
      });

      return {
        success: true,
        data: pesertaArray
      };
    } else {
      return {
        success: true,
        data: []
      };
    }
  } catch (error: any) {
    console.error('Error getting peserta by status:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data peserta'
    };
  }
};

/**
 * Move peserta to program (graduate them)
 */
export const movePesertaToProgram = async (id: string): Promise<PesertaResponse> => {
  try {
    // Get the peserta data
    const pesertaRef = ref(db, `peserta/${id}`);
    const snapshot = await get(pesertaRef);

    if (!snapshot.exists()) {
      return {
        success: false,
        error: 'Peserta tidak ditemukan'
      };
    }

    const pesertaData = snapshot.val();

    // Update the status to 'lulus' and add graduation date
    const updatedPesertaData = {
      ...pesertaData,
      statusPeserta: 'lulus' as const,
      tanggalLulus: new Date().toISOString()
    };

    // Create a reference to the program database
    const programRef = ref(db, 'program');
    const newProgramRef = push(programRef);

    // Save to program database
    await set(newProgramRef, updatedPesertaData);

    // Remove from peserta database after successfully adding to program
    await remove(pesertaRef);

    return {
      success: true,
      data: {
        id: newProgramRef.key,
        ...updatedPesertaData
      } as Peserta
    };
  } catch (error: any) {
    console.error('Error moving peserta to program:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat memindahkan peserta ke program'
    };
  }
};

/**
 * Subscribe to peserta changes
 */
export const subscribeToPesertaChanges = (callback: (peserta: Peserta[]) => void) => {
  const pesertaRef = ref(db, 'peserta');

  return onValue(pesertaRef, (snapshot) => {
    if (snapshot.exists()) {
      const pesertaData = snapshot.val();
      const pesertaArray: Peserta[] = [];

      Object.keys(pesertaData).forEach(key => {
        pesertaArray.push({
          id: key,
          ...pesertaData[key]
        });
      });

      callback(pesertaArray);
    } else {
      callback([]);
    }
  });
};