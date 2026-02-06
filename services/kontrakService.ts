// services/kontrakService.ts
import { ref, onValue, get, set, update, remove, push } from 'firebase/database';
import { db } from '@/lib/firebase';

export interface Kontrak {
  id?: string;
  nomorKontrak: string;
  pesertaId: string;
  programId: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  status: 'aktif' | 'selesai' | 'dibatalkan';
  biaya: number;
}

export const getKontrakList = async (): Promise<Kontrak[]> => {
  const kontrakRef = ref(db, 'kontrak');
  
  return new Promise((resolve, reject) => {
    onValue(kontrakRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const kontrakArray: Kontrak[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        resolve(kontrakArray);
      } else {
        resolve([]);
      }
    }, (error) => {
      reject(error);
    });
  });
};

export const getKontrakById = async (id: string): Promise<Kontrak | null> => {
  const kontrakRef = ref(db, `kontrak/${id}`);
  const snapshot = await get(kontrakRef);
  
  if (snapshot.exists()) {
    return { id, ...snapshot.val() };
  }
  return null;
};

export const createKontrak = async (kontrak: Omit<Kontrak, 'id'>): Promise<string> => {
  const kontrakRef = ref(db, 'kontrak');
  const newRef = push(kontrakRef);
  await set(newRef, kontrak);
  return newRef.key || '';
};

export const updateKontrak = async (id: string, kontrak: Partial<Kontrak>): Promise<void> => {
  const kontrakRef = ref(db, `kontrak/${id}`);
  await update(kontrakRef, kontrak);
};

export const deleteKontrak = async (id: string): Promise<void> => {
  const kontrakRef = ref(db, `kontrak/${id}`);
  await remove(kontrakRef);
};