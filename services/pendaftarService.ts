// services/pendaftarService.ts
/**
 * REFACTOR: Menggunakan API Route agar bisa menembus rules .write: false via Admin SDK
 */

export interface Pendaftar {
  id?: string;
  [key: string]: any;
}

export const getAllPendaftar = async () => {
  // Read tetap bisa dari Client SDK (karena .read: auth != null)
  const { ref, get } = await import('firebase/database');
  const { db } = await import('@/lib/firebase');
  
  const snapshot = await get(ref(db, 'pendaftar'));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return {
      success: true,
      data: Object.keys(data).map(key => ({ id: key, ...data[key] }))
    };
  }
  return { success: true, data: [] };
};

export const getPendaftarById = async (id: string) => {
  const { ref, get } = await import('firebase/database');
  const { db } = await import('@/lib/firebase');
  const snapshot = await get(ref(db, `pendaftar/${id}`));
  return snapshot.exists() 
    ? { success: true, data: { id, ...snapshot.val() } }
    : { success: false, error: 'Tidak ditemukan' };
};

// --- Operasi WRITE dialihkan ke API Route ---

export const addPendaftar = async (formData: any, token: string) => {
  const res = await fetch('/api/daftar', {
    method: 'POST',
    body: JSON.stringify({ formData, token })
  });
  return res.json();
};

export const updatePendaftarById = async (id: string, updates: any) => {
  const res = await fetch('/api/daftar', {
    method: 'PUT',
    body: JSON.stringify({ id, updates })
  });
  return res.json();
};

export const deletePendaftarById = async (id: string) => {
  const res = await fetch(`/api/daftar?id=${id}`, {
    method: 'DELETE'
  });
  return res.json();
};

export const approvePendaftar = async (id: string) => {
  const res = await fetch('/api/daftar', {
    method: 'PUT',
    body: JSON.stringify({ id, action: 'approve' })
  });
  return res.json();
};

export const rejectPendaftar = async (id: string) => {
  const res = await fetch('/api/daftar', {
    method: 'PUT',
    body: JSON.stringify({ id, updates: { statusPendaftaran: 'ditolak' } })
  });
  return res.json();
};
