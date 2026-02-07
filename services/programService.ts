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

console.log('[DEBUG] programService - Using centralized Firebase instance');

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

/**
 * Get all programs
 */
export const getAllPrograms = async (): Promise<ProgramResponse> => {
  try {
    const programRef = ref(db, 'program');
    const snapshot = await get(programRef);
    
    if (snapshot.exists()) {
      const programData = snapshot.val();
      const programArray: Program[] = [];
      
      Object.keys(programData).forEach(key => {
        programArray.push({
          id: key,
          ...programData[key]
        });
      });
      
      return {
        success: true,
        data: programArray
      };
    } else {
      return {
        success: true,
        data: []
      };
    }
  } catch (error: any) {
    console.error('Error getting programs:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data program'
    };
  }
};

/**
 * Get program by ID
 */
export const getProgramById = async (id: string): Promise<ProgramResponse> => {
  try {
    const programRef = ref(db, `program/${id}`);
    const snapshot = await get(programRef);
    
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
        error: 'Program tidak ditemukan'
      };
    }
  } catch (error: any) {
    console.error('Error getting program by ID:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengambil data program'
    };
  }
};

/**
 * Add new program
 */
export const addProgram = async (program: Omit<Program, 'id'>): Promise<ProgramResponse> => {
  try {
    const programRef = ref(db, 'program');
    const newProgramRef = push(programRef);
    
    await set(newProgramRef, program);
    
    return {
      success: true,
      data: {
        id: newProgramRef.key,
        ...program
      }
    };
  } catch (error: any) {
    console.error('Error adding program:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menambahkan program'
    };
  }
};

/**
 * Update program by ID
 */
export const updateProgramById = async (id: string, updates: Partial<Program>): Promise<ProgramResponse> => {
  try {
    const programRef = ref(db, `program/${id}`);
    await update(programRef, updates);
    
    return {
      success: true,
      data: {
        id,
        ...updates
      } as Program
    };
  } catch (error: any) {
    console.error('Error updating program:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat memperbarui program'
    };
  }
};

/**
 * Delete program by ID
 */
export const deleteProgramById = async (id: string): Promise<ProgramResponse> => {
  try {
    const programRef = ref(db, `program/${id}`);
    await remove(programRef);
    
    return {
      success: true
    };
  } catch (error: any) {
    console.error('Error deleting program:', error);
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat menghapus program'
    };
  }
};

/**
 * Subscribe to program changes
 */
export const subscribeToProgramChanges = (callback: (programs: Program[]) => void) => {
  const programRef = ref(db, 'program');
  
  return onValue(programRef, (snapshot) => {
    if (snapshot.exists()) {
      const programData = snapshot.val();
      const programArray: Program[] = [];
      
      Object.keys(programData).forEach(key => {
        programArray.push({
          id: key,
          ...programData[key]
        });
      });
      
      callback(programArray);
    } else {
      callback([]);
    }
  });
};