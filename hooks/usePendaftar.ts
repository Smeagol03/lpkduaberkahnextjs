// hooks/usePendaftar.ts
import { useState, useEffect } from 'react';
import { Pendaftar, getAllPendaftar, getPendaftarById, addPendaftar as addPendaftarService, updatePendaftarById as updatePendaftarByIdService, deletePendaftarById as deletePendaftarByIdService, approvePendaftar, rejectPendaftar } from '@/services/pendaftarService';

export const usePendaftar = () => {
  const [pendaftar, setPendaftar] = useState<Pendaftar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendaftar = async () => {
      try {
        const response = await getAllPendaftar();
        if (response.success) {
          setPendaftar(response.data as Pendaftar[] || []);
        } else {
          throw new Error(response.error || 'Failed to fetch pendaftar');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPendaftar();
  }, []);

  const refreshPendaftar = async () => {
    try {
      setLoading(true);
      const response = await getAllPendaftar();
      if (response.success) {
        setPendaftar(response.data as Pendaftar[] || []);
      } else {
        throw new Error(response.error || 'Failed to fetch pendaftar');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addPendaftar = async (newPendaftar: Omit<Pendaftar, 'id'>) => {
    try {
      const response = await addPendaftarService(newPendaftar);
      if (response.success && response.data) {
        refreshPendaftar(); // Refresh the list after adding
        // Since addPendaftarService returns a single Pendaftar, cast if needed
        const pendaftarData = Array.isArray(response.data) ? response.data[0] : response.data;
        return pendaftarData?.id;
      } else {
        throw new Error(response.error || 'Failed to add pendaftar');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updatePendaftarById = async (id: string, updatedPendaftar: Partial<Pendaftar>) => {
    try {
      const response = await updatePendaftarByIdService(id, updatedPendaftar);
      if (response.success) {
        refreshPendaftar(); // Refresh the list after updating
      } else {
        throw new Error(response.error || 'Failed to update pendaftar');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const removePendaftar = async (id: string) => {
    try {
      const response = await deletePendaftarByIdService(id);
      if (response.success) {
        refreshPendaftar(); // Refresh the list after deleting
      } else {
        throw new Error(response.error || 'Failed to delete pendaftar');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const approvePendaftarById = async (id: string) => {
    try {
      const response = await approvePendaftar(id);
      if (response.success) {
        refreshPendaftar(); // Refresh the list after approving
      } else {
        throw new Error(response.error || 'Failed to approve pendaftar');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const rejectPendaftarById = async (id: string) => {
    try {
      const response = await rejectPendaftar(id);
      if (response.success) {
        refreshPendaftar(); // Refresh the list after rejecting
      } else {
        throw new Error(response.error || 'Failed to reject pendaftar');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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