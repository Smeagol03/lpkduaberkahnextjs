// hooks/useProgram.ts
import { useState, useEffect } from 'react';
import { Program, getAllPrograms, getProgramById, addProgram as addProgramService, updateProgramById as updateProgramByIdService, deleteProgramById as deleteProgramByIdService } from '@/services/programService';

export const useProgram = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getAllPrograms();
        if (response.success) {
          setPrograms(response.data as Program[] || []);
        } else {
          throw new Error(response.error || 'Failed to fetch programs');
        }
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
      const response = await getAllPrograms();
      if (response.success) {
        setPrograms(response.data as Program[] || []);
      } else {
        throw new Error(response.error || 'Failed to fetch programs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addProgram = async (newProgram: Omit<Program, 'id'>) => {
    try {
      const response = await addProgramService(newProgram);
      if (response.success) {
        refreshPrograms(); // Refresh the list after adding
        return response.data?.id;
      } else {
        throw new Error(response.error || 'Failed to add program');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateProgramById = async (id: string, updatedProgram: Partial<Program>) => {
    try {
      const response = await updateProgramByIdService(id, updatedProgram);
      if (response.success) {
        refreshPrograms(); // Refresh the list after updating
      } else {
        throw new Error(response.error || 'Failed to update program');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const removeProgram = async (id: string) => {
    try {
      const response = await deleteProgramByIdService(id);
      if (response.success) {
        refreshPrograms(); // Refresh the list after deleting
      } else {
        throw new Error(response.error || 'Failed to delete program');
      }
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