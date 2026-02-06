// services/paketService.ts
import { ref, onValue, get } from 'firebase/database';
import { db } from '@/lib/firebase';

export interface Paket {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  jumlahPelatihan: number;
  coverImage: string;
}

export const getPaketList = async (): Promise<Paket[]> => {
  const paketRef = ref(db, 'paket');
  
  return new Promise((resolve, reject) => {
    onValue(paketRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const paketArray: Paket[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        resolve(paketArray);
      } else {
        resolve([]);
      }
    }, (error) => {
      reject(error);
    });
  });
};

export const getPaketById = async (id: string): Promise<Paket | null> => {
  const paketRef = ref(db, `paket/${id}`);
  const snapshot = await get(paketRef);
  
  if (snapshot.exists()) {
    return { id, ...snapshot.val() };
  }
  return null;
};