// services/programService.ts
import { ref, onValue, get, set, update, remove, push } from 'firebase/database';
import { db } from '@/lib/firebase';

export interface Program {
  id?: string;
  nama: string;
  deskripsi: string;
  durasi: string;
  harga: number;
  kuota: number;
}

export const getProgramList = async (): Promise<Program[]> => {
  const programRef = ref(db, 'program');
  
  return new Promise((resolve, reject) => {
    onValue(programRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const programArray: Program[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        resolve(programArray);
      } else {
        resolve([]);
      }
    }, (error) => {
      reject(error);
    });
  });
};

export const getProgramById = async (id: string): Promise<Program | null> => {
  const programRef = ref(db, `program/${id}`);
  const snapshot = await get(programRef);
  
  if (snapshot.exists()) {
    return { id, ...snapshot.val() };
  }
  return null;
};

export const createProgram = async (program: Omit<Program, 'id'>): Promise<string> => {
  const programRef = ref(db, 'program');
  const newRef = push(programRef);
  await set(newRef, program);
  return newRef.key || '';
};

export const updateProgram = async (id: string, program: Partial<Program>): Promise<void> => {
  const programRef = ref(db, `program/${id}`);
  await update(programRef, program);
};

export const deleteProgram = async (id: string): Promise<void> => {
  const programRef = ref(db, `program/${id}`);
  await remove(programRef);
};