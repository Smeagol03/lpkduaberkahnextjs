// hooks/usePeserta.ts
import { useState, useEffect } from 'react';
import { Peserta, getPesertaList, getPesertaById, createPeserta, updatePeserta, deletePeserta } from '@/services/pesertaService';

export const usePeserta = () => {
  const [peserta, setPeserta] = useState<Peserta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeserta = async () => {
      try {
        const data = await getPesertaList();
        setPeserta(data);
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
      const data = await getPesertaList();
      setPeserta(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addPeserta = async (newPeserta: Omit<Peserta, 'id'>) => {
    try {
      const id = await createPeserta(newPeserta);
      refreshPeserta(); // Refresh the list after adding
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updatePesertaById = async (id: string, updatedPeserta: Partial<Peserta>) => {
    try {
      await updatePeserta(id, updatedPeserta);
      refreshPeserta(); // Refresh the list after updating
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const removePeserta = async (id: string) => {
    try {
      await deletePeserta(id);
      refreshPeserta(); // Refresh the list after deleting
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