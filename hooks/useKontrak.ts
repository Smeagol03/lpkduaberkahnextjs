// hooks/useKontrak.ts
import { useState, useEffect } from 'react';
import { Kontrak, getKontrakList, getKontrakById, createKontrak, updateKontrak, deleteKontrak } from '@/services/kontrakService';

export const useKontrak = () => {
  const [kontrak, setKontrak] = useState<Kontrak[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKontrak = async () => {
      try {
        const data = await getKontrakList();
        setKontrak(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchKontrak();
  }, []);

  const refreshKontrak = async () => {
    try {
      setLoading(true);
      const data = await getKontrakList();
      setKontrak(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addKontrak = async (newKontrak: Omit<Kontrak, 'id'>) => {
    try {
      const id = await createKontrak(newKontrak);
      refreshKontrak(); // Refresh the list after adding
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateKontrakById = async (id: string, updatedKontrak: Partial<Kontrak>) => {
    try {
      await updateKontrak(id, updatedKontrak);
      refreshKontrak(); // Refresh the list after updating
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const removeKontrak = async (id: string) => {
    try {
      await deleteKontrak(id);
      refreshKontrak(); // Refresh the list after deleting
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    kontrak,
    loading,
    error,
    addKontrak,
    updateKontrakById,
    removeKontrak,
    refreshKontrak
  };
};