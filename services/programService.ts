// services/programService.ts
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
import { ReactNode } from 'react';

console.log('[DEBUG] programService - Using centralized Firebase instance');

// Define the graduate (lulusan) data structure - same as participant but with lulus status
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

export interface Graduate {
  id?: string;
  informasiPribadi: InformasiPribadi;
  pendidikanPekerjaan: PendidikanPekerjaan;
  motivasiReferensi: MotivasiReferensi;
  paketPelatihan: string;
  statusPendaftaran?: 'menunggu' | 'disetujui' | 'ditolak';
  statusPeserta: 'baru' | 'aktif' | 'lulus' | 'ditolak';
  tanggalDaftar: string;
  tanggalDiterima?: string;
  tanggalLulus?: string;
  validasi: Validasi;
}

export interface GraduateResponse {
  success: boolean;
  data?: Graduate | Graduate[];
  error?: string;
}

/**
 * Get all graduates (lulusan)
 */
export const getAllGraduates = async (): Promise<GraduateResponse> => {
  try {
    const graduateRef = ref(db, 'program');
    const snapshot = await get(graduateRef);

    if (snapshot.exists()) {
      const graduateData = snapshot.val();
      const graduateArray: Graduate[] = [];

      Object.keys(graduateData).forEach(key => {
        const graduate = {
          id: key,
          ...graduateData[key]
        };
        // Ensure the Firebase key is always used as the ID, not any id field in the data
        graduate.id = key;
        graduateArray.push(graduate);
      });

      return {
        success: true,
        data: graduateArray
      };
    } else {
      return {
        success: true,
        data: []
      };
    }
  } catch (error: any) {
    console.error('Error getting graduates:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data lulusan'
    };
  }
};

/**
 * Get graduate by ID
 */
export const getGraduateById = async (id: string): Promise<GraduateResponse> => {
  try {
    const graduateRef = ref(db, `program/${id}`);
    const snapshot = await get(graduateRef);

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
        error: 'Data lulusan tidak ditemukan'
      };
    }
  } catch (error: any) {
    console.error('Error getting graduate by ID:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data lulusan'
    };
  }
};

/**
 * Add new graduate
 */
export const addGraduate = async (graduate: Omit<Graduate, 'id'>): Promise<GraduateResponse> => {
  try {
    const graduateRef = ref(db, 'program');
    const newGraduateRef = push(graduateRef);

    await set(newGraduateRef, graduate);

    return {
      success: true,
      data: {
        id: newGraduateRef.key,
        ...graduate
      }
    };
  } catch (error: any) {
    console.error('Error adding graduate:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menambahkan data lulusan'
    };
  }
};

/**
 * Update graduate by ID
 */
export const updateGraduateById = async (id: string, updates: Partial<Graduate>): Promise<GraduateResponse> => {
  try {
    const graduateRef = ref(db, `program/${id}`);
    await update(graduateRef, updates);

    return {
      success: true,
      data: {
        id,
        ...updates
      } as Graduate
    };
  } catch (error: any) {
    console.error('Error updating graduate:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat memperbarui data lulusan'
    };
  }
};

/**
 * Delete graduate by ID
 */
export const deleteGraduateById = async (id: string): Promise<GraduateResponse> => {
  try {
    const graduateRef = ref(db, `program/${id}`);
    await remove(graduateRef);

    return {
      success: true
    };
  } catch (error: any) {
    console.error('Error deleting graduate:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menghapus data lulusan'
    };
  }
};

/**
 * Subscribe to graduate changes
 */
export const subscribeToGraduateChanges = (callback: (graduates: Graduate[]) => void) => {
  const graduateRef = ref(db, 'program');

  return onValue(graduateRef, (snapshot) => {
    if (snapshot.exists()) {
      const graduateData = snapshot.val();
      const graduateArray: Graduate[] = [];

      Object.keys(graduateData).forEach(key => {
        graduateArray.push({
          id: key,
          ...graduateData[key]
        });
      });

      callback(graduateArray);
    } else {
      callback([]);
    }
  });
};

// Export the old interface and functions for backward compatibility
export interface Program {
  id?: string;
  nama: string;
  deskripsi: string;
  durasi: string;
  harga: number;
  kuota: number;
  fasilitas?: string[];
  jadwal?: string;
  instruktur?: string;
  kategori?: string;
}

export interface ProgramResponse {
  success: boolean;
  data?: Program | Program[];
  error?: string;
}

// Aliases for backward compatibility
export const getAllPrograms = getAllGraduates;
export const getProgramById = getGraduateById;
export const addProgram = addGraduate;
export const updateProgramById = updateGraduateById;
export const deleteProgramById = deleteGraduateById;
export const subscribeToProgramChanges = subscribeToGraduateChanges;