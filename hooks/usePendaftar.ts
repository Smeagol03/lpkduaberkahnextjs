// hooks/usePendaftar.ts
import { useState, useEffect } from 'react';
import { 
  Pendaftar, 
  getAllPendaftar, 
  addPendaftar as addPendaftarService, 
  updatePendaftarById as updatePendaftarByIdService, 
  deletePendaftarById as deletePendaftarByIdService, 
  approvePendaftar, 
  rejectPendaftar 
} from '@/services/pendaftarService';
import { useAuth } from '@/contexts/AuthContext';

export const usePendaftar = () => {
  const [pendaftar, setPendaftar] = useState<Pendaftar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchPendaftar = async () => {
    try {
      const response = await getAllPendaftar();
      if (response.success) {
        setPendaftar((response.data as Pendaftar[]) || []);
      } else {
        throw new Error(response.error || 'Failed to fetch pendaftar');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetchPendaftar();
  }, [isAuthenticated]);

  const refreshPendaftar = async () => {
    setLoading(true);
    await fetchPendaftar();
  };

  const addPendaftar = async (newPendaftar: any, token: string) => {
    try {
      const response = await addPendaftarService(newPendaftar, token);
      if (response.success) {
        refreshPendaftar();
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to add pendaftar');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updatePendaftarById = async (id: string, updatedPendaftar: any) => {
    try {
      const response = await updatePendaftarByIdService(id, updatedPendaftar);
      if (response.success) {
        refreshPendaftar();
      } else {
        throw new Error(response.error || 'Failed to update pendaftar');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const removePendaftar = async (id: string) => {
    try {
      const response = await deletePendaftarByIdService(id);
      if (response.success) {
        refreshPendaftar();
      } else {
        throw new Error(response.error || 'Failed to delete pendaftar');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const approvePendaftarById = async (id: string) => {
    try {
      const response = await approvePendaftar(id);
      if (response.success) {
        refreshPendaftar();
      } else {
        throw new Error(response.error || 'Failed to approve pendaftar');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const rejectPendaftarById = async (id: string) => {
    try {
      const response = await rejectPendaftar(id);
      if (response.success) {
        refreshPendaftar();
      } else {
        throw new Error(response.error || 'Failed to reject pendaftar');
      }
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    pendaftar,
    loading,
    error,
    addPendaftar,
    updatePendaftarById,
    removePendaftar,
    approvePendaftarById,
    rejectPendaftarById,
    refreshPendaftar
  };
};
