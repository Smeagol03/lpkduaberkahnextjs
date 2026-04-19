// services/pendaftarService.ts

export interface Pendaftar {
  id?: string;
  informasiPribadi: {
    namaLengkap: string;
    nik: string;
    noHP: string;
    alamat: string;
    jenisKelamin: string;
    tempatLahir: string;
    tanggalLahir: string;
  };
  pendidikanPekerjaan: {
    pendidikanTerakhir: string;
    pekerjaanSaatIni: string;
  };
  motivasiReferensi: {
    alasanMengikuti: string;
    sumberInformasi: string;
  };
  paketPelatihan: string;
  statusPendaftaran: 'menunggu' | 'disetujui' | 'ditolak';
  tanggalDaftar: string;
  tanggalDiterima?: string;
}

export interface PendaftarResponse {
  success: boolean;
  data?: Pendaftar | Pendaftar[];
  error?: string;
  message?: string;
}

/**
 * READ operations (tetap menggunakan Client SDK karena .read: auth != null)
 */
export const getAllPendaftar = async (): Promise<PendaftarResponse> => {
  try {
    const { ref, get } = await import('firebase/database');
    const { db } = await import('@/lib/firebase');
    const snapshot = await get(ref(db, 'pendaftar'));
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const pendaftarArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      return { success: true, data: pendaftarArray };
    }
    return { success: true, data: [] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getPendaftarById = async (id: string): Promise<PendaftarResponse> => {
  try {
    const { ref, get } = await import('firebase/database');
    const { db } = await import('@/lib/firebase');
    const snapshot = await get(ref(db, `pendaftar/${id}`));
    
    if (snapshot.exists()) {
      return { success: true, data: { id, ...snapshot.val() } };
    }
    return { success: false, error: 'Pendaftar tidak ditemukan' };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

/**
 * WRITE operations (dialihkan ke API Route agar bisa menembus rules via Admin SDK)
 */

export const addPendaftar = async (formData: any, token: string): Promise<PendaftarResponse> => {
  const res = await fetch('/api/daftar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formData, token })
  });
  return res.json();
};

export const updatePendaftarById = async (id: string, updates: any): Promise<PendaftarResponse> => {
  const res = await fetch('/api/daftar', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, updates })
  });
  return res.json();
};

export const deletePendaftarById = async (id: string): Promise<PendaftarResponse> => {
  const res = await fetch(`/api/daftar?id=${id}`, {
    method: 'DELETE'
  });
  return res.json();
};

export const approvePendaftar = async (id: string): Promise<PendaftarResponse> => {
  const res = await fetch('/api/daftar', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, action: 'approve' })
  });
  return res.json();
};

export const rejectPendaftar = async (id: string): Promise<PendaftarResponse> => {
  const res = await fetch('/api/daftar', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, updates: { statusPendaftaran: 'ditolak' } })
  });
  return res.json();
};
