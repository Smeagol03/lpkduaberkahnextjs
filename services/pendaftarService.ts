// services/pendaftarService.ts
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

console.log('[DEBUG] pendaftarService - Using centralized Firebase instance');

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

export interface Pendaftar {
  id?: string;
  informasiPribadi: InformasiPribadi;
  pendidikanPekerjaan: PendidikanPekerjaan;
  motivasiReferensi: MotivasiReferensi;
  paketPelatihan: string;
  statusPendaftaran: 'menunggu' | 'disetujui' | 'ditolak';
  tanggalDaftar: string;
  validasi: Validasi;
}

export interface PendaftarResponse {
  success: boolean;
  data?: Pendaftar | Pendaftar[];
  error?: string;
}

/**
 * Get all pendaftar
 */
export const getAllPendaftar = async (): Promise<PendaftarResponse> => {
  try {
    const pendaftarRef = ref(db, 'pendaftar');
    const snapshot = await get(pendaftarRef);
    
    if (snapshot.exists()) {
      const pendaftarData = snapshot.val();
      const pendaftarArray: Pendaftar[] = [];
      
      Object.keys(pendaftarData).forEach(key => {
        pendaftarArray.push({
          id: key,
          ...pendaftarData[key]
        });
      });
      
      return {
        success: true,
        data: pendaftarArray
      };
    } else {
      return {
        success: true,
        data: []
      };
    }
  } catch (error: any) {
    console.error('Error getting pendaftar:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data pendaftar'
    };
  }
};

/**
 * Get pendaftar by ID
 */
export const getPendaftarById = async (id: string): Promise<PendaftarResponse> => {
  try {
    const pendaftarRef = ref(db, `pendaftar/${id}`);
    const snapshot = await get(pendaftarRef);
    
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
        error: 'Pendaftar tidak ditemukan'
      };
    }
  } catch (error: any) {
    console.error('Error getting pendaftar by ID:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data pendaftar'
    };
  }
};

/**
 * Add new pendaftar
 */
export const addPendaftar = async (pendaftar: Omit<Pendaftar, 'id'>): Promise<PendaftarResponse> => {
  try {
    const pendaftarRef = ref(db, 'pendaftar');
    const newPendaftarRef = push(pendaftarRef);
    
    const pendaftarWithDate = {
      ...pendaftar,
      tanggalDaftar: new Date().toISOString(),
      statusPendaftaran: 'menunggu' as const // Default status for new registrants
    };
    
    await set(newPendaftarRef, pendaftarWithDate);
    
    return {
      success: true,
      data: {
        id: newPendaftarRef.key,
        ...pendaftarWithDate
      } as Pendaftar
    };
  } catch (error: any) {
    console.error('Error adding pendaftar:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menambahkan pendaftar'
    };
  }
};

/**
 * Update pendaftar by ID
 */
export const updatePendaftarById = async (id: string, updates: Partial<Pendaftar>): Promise<PendaftarResponse> => {
  try {
    const pendaftarRef = ref(db, `pendaftar/${id}`);
    await update(pendaftarRef, updates);
    
    return {
      success: true,
      data: {
        id,
        ...updates
      } as Pendaftar
    };
  } catch (error: any) {
    console.error('Error updating pendaftar:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat memperbarui pendaftar'
    };
  }
};

/**
 * Delete pendaftar by ID
 */
export const deletePendaftarById = async (id: string): Promise<PendaftarResponse> => {
  try {
    const pendaftarRef = ref(db, `pendaftar/${id}`);
    await remove(pendaftarRef);
    
    return {
      success: true
    };
  } catch (error: any) {
    console.error('Error deleting pendaftar:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menghapus pendaftar'
    };
  }
};

/**
 * Approve pendaftar (change status to 'disetujui')
 */
export const approvePendaftar = async (id: string): Promise<PendaftarResponse> => {
  try {
    const pendaftarRef = ref(db, `pendaftar/${id}`);
    await update(pendaftarRef, { 
      statusPendaftaran: 'disetujui',
      ['tanggalDiterima']: new Date().toISOString()
    });
    
    // Also add to peserta collection
    const snapshot = await get(pendaftarRef);
    if (snapshot.exists()) {
      const pendaftarData = snapshot.val();
      const pesertaRef = ref(db, 'peserta');
      const newPesertaRef = push(pesertaRef);
      
      await set(newPesertaRef, {
        ...pendaftarData,
        id: newPesertaRef.key,
        statusPeserta: 'aktif',
        tanggalDiterima: new Date().toISOString()
      });
    }
    
    return {
      success: true,
      data: {
        id,
        statusPendaftaran: 'disetujui'
      } as Pendaftar
    };
  } catch (error: any) {
    console.error('Error approving pendaftar:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menyetujui pendaftar'
    };
  }
};

/**
 * Reject pendaftar (change status to 'ditolak')
 */
export const rejectPendaftar = async (id: string): Promise<PendaftarResponse> => {
  try {
    const pendaftarRef = ref(db, `pendaftar/${id}`);
    await update(pendaftarRef, { statusPendaftaran: 'ditolak' });
    
    return {
      success: true,
      data: {
        id,
        statusPendaftaran: 'ditolak'
      } as Pendaftar
    };
  } catch (error: any) {
    console.error('Error rejecting pendaftar:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menolak pendaftar'
    };
  }
};

/**
 * Get pendaftar by status
 */
export const getPendaftarByStatus = async (status: string): Promise<PendaftarResponse> => {
  try {
    const pendaftarRef = query(ref(db, 'pendaftar'), orderByChild('statusPendaftaran'), equalTo(status));
    const snapshot = await get(pendaftarRef);
    
    if (snapshot.exists()) {
      const pendaftarData = snapshot.val();
      const pendaftarArray: Pendaftar[] = [];
      
      Object.keys(pendaftarData).forEach(key => {
        pendaftarArray.push({
          id: key,
          ...pendaftarData[key]
        });
      });
      
      return {
        success: true,
        data: pendaftarArray
      };
    } else {
      return {
        success: true,
        data: []
      };
    }
  } catch (error: any) {
    console.error('Error getting pendaftar by status:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data pendaftar'
    };
  }
};

/**
 * Subscribe to pendaftar changes
 */
export const subscribeToPendaftarChanges = (callback: (pendaftar: Pendaftar[]) => void) => {
  const pendaftarRef = ref(db, 'pendaftar');
  
  return onValue(pendaftarRef, (snapshot) => {
    if (snapshot.exists()) {
      const pendaftarData = snapshot.val();
      const pendaftarArray: Pendaftar[] = [];
      
      Object.keys(pendaftarData).forEach(key => {
        pendaftarArray.push({
          id: key,
          ...pendaftarData[key]
        });
      });
      
      callback(pendaftarArray);
    } else {
      callback([]);
    }
  });
};