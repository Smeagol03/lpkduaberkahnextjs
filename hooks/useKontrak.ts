// hooks/useKontrak.ts
import { useState, useEffect } from 'react';
import { Kontrak, getAllKontrak, getKontrakById, addKontrak as addKontrakService, updateKontrakById as updateKontrakByIdService, deleteKontrakById as deleteKontrakByIdService } from '@/services/kontrakService';

export const useKontrak = () => {
  const [kontrak, setKontrak] = useState<Kontrak[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKontrak = async () => {
      try {
        const response = await getAllKontrak();
        if (response.success) {
          setKontrak(response.data as Kontrak[] || []);
        } else {
          throw new Error(response.error || 'Failed to fetch kontrak');
        }
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
      const response = await getAllKontrak();
      if (response.success) {
        setKontrak(response.data as Kontrak[] || []);
      } else {
        throw new Error(response.error || 'Failed to fetch kontrak');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addKontrak = async (newKontrak: Omit<Kontrak, 'id'>) => {
    try {
      const response = await addKontrakService(newKontrak);
      if (response.success) {
        refreshKontrak(); // Refresh the list after adding
        return response.data?.id;
      } else {
        throw new Error(response.error || 'Failed to add kontrak');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateKontrakById = async (id: string, updatedKontrak: Partial<Kontrak>) => {
    try {
      const response = await updateKontrakByIdService(id, updatedKontrak);
      if (response.success) {
        refreshKontrak(); // Refresh the list after updating
      } else {
        throw new Error(response.error || 'Failed to update kontrak');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const removeKontrak = async (id: string) => {
    try {
      const response = await deleteKontrakByIdService(id);
      if (response.success) {
        refreshKontrak(); // Refresh the list after deleting
      } else {
        throw new Error(response.error || 'Failed to delete kontrak');
      }
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
    refreshKontrak,
    getKontrakById
  };
};