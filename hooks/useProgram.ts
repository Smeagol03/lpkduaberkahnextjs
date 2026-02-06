// hooks/useProgram.ts
import { useState, useEffect } from 'react';
import { Program, getProgramList, getProgramById, createProgram, updateProgram, deleteProgram } from '@/services/programService';

export const useProgram = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getProgramList();
        setPrograms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const refreshPrograms = async () => {
    try {
      setLoading(true);
      const data = await getProgramList();
      setPrograms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addProgram = async (newProgram: Omit<Program, 'id'>) => {
    try {
      const id = await createProgram(newProgram);
      refreshPrograms(); // Refresh the list after adding
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateProgramById = async (id: string, updatedProgram: Partial<Program>) => {
    try {
      await updateProgram(id, updatedProgram);
      refreshPrograms(); // Refresh the list after updating
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const removeProgram = async (id: string) => {
    try {
      await deleteProgram(id);
      refreshPrograms(); // Refresh the list after deleting
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  return {
    programs,
    loading,
    error,
    addProgram,
    updateProgramById,
    removeProgram,
    refreshPrograms
  };
};