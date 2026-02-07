// hooks/usePeserta.ts
import { useState, useEffect } from 'react';
import { Peserta, getAllPeserta, getPesertaById, addPeserta as addPesertaService, updatePesertaById as updatePesertaByIdService, deletePesertaById as deletePesertaByIdService } from '@/services/pesertaService';

export const usePeserta = () => {
  const [peserta, setPeserta] = useState<Peserta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeserta = async () => {
      try {
        const response = await getAllPeserta();
        if (response.success) {
          setPeserta(response.data as Peserta[] || []);
        } else {
          throw new Error(response.error || 'Failed to fetch peserta');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPeserta();
  }, []);

  const refreshPeserta = async () => {
    try {
      setLoading(true);
      const response = await getAllPeserta();
      if (response.success) {
        setPeserta(response.data as Peserta[] || []);
      } else {
        throw new Error(response.error || 'Failed to fetch peserta');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addPeserta = async (newPeserta: Omit<Peserta, 'id'>) => {
    try {
      const response = await addPesertaService(newPeserta);
      if (response.success) {
        refreshPeserta(); // Refresh the list after adding
        return response.data?.id;
      } else {
        throw new Error(response.error || 'Failed to add peserta');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updatePesertaById = async (id: string, updatedPeserta: Partial<Peserta>) => {
    try {
      const response = await updatePesertaByIdService(id, updatedPeserta);
      if (response.success) {
        refreshPeserta(); // Refresh the list after updating
      } else {
        throw new Error(response.error || 'Failed to update peserta');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const removePeserta = async (id: string) => {
    try {
      const response = await deletePesertaByIdService(id);
      if (response.success) {
        refreshPeserta(); // Refresh the list after deleting
      } else {
        throw new Error(response.error || 'Failed to delete peserta');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    peserta,
    loading,
    error,
    addPeserta,
    updatePesertaById,
    removePeserta,
    refreshPeserta
  };
};