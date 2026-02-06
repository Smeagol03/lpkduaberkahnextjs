// services/pesertaService.ts
import { ref, onValue, get, set, update, remove, push } from 'firebase/database';
import { db } from '@/lib/firebase';

export interface Peserta {
  id?: string;
  nama: string;
  email: string;
  nomorHp: string;
  program: string;
  tanggalDaftar: string;
  status: 'baru' | 'aktif' | 'lulus' | 'ditolak';
}

export const getPesertaList = async (): Promise<Peserta[]> => {
  const pesertaRef = ref(db, 'peserta');
  
  return new Promise((resolve, reject) => {
    onValue(pesertaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const pesertaArray: Peserta[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        resolve(pesertaArray);
      } else {
        resolve([]);
      }
    }, (error) => {
      reject(error);
    });
  });
};

export const getPesertaById = async (id: string): Promise<Peserta | null> => {
  const pesertaRef = ref(db, `peserta/${id}`);
  const snapshot = await get(pesertaRef);
  
  if (snapshot.exists()) {
    return { id, ...snapshot.val() };
  }
  return null;
};

export const createPeserta = async (peserta: Omit<Peserta, 'id'>): Promise<string> => {
  const pesertaRef = ref(db, 'peserta');
  const newRef = push(pesertaRef);
  await set(newRef, {
    ...peserta,
    tanggalDaftar: new Date().toISOString(),
    status: 'baru'
  });
  return newRef.key || '';
};

export const updatePeserta = async (id: string, peserta: Partial<Peserta>): Promise<void> => {
  const pesertaRef = ref(db, `peserta/${id}`);
  await update(pesertaRef, peserta);
};

export const deletePeserta = async (id: string): Promise<void> => {
  const pesertaRef = ref(db, `peserta/${id}`);
  await remove(pesertaRef);
};