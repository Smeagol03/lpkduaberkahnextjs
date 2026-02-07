// hooks/useProgram.ts
import { useState, useEffect } from 'react';
import { Graduate, getAllGraduates, getGraduateById, addGraduate as addGraduateService, updateGraduateById as updateGraduateByIdService, deleteGraduateById as deleteGraduateByIdService } from '@/services/programService';

export const useProgram = () => {
  const [programs, setPrograms] = useState<Graduate[]>([]); // Renamed but keeping the same variable name for consistency
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getAllGraduates();
        if (response.success) {
          setPrograms(response.data as Graduate[] || []);
        } else {
          throw new Error(response.error || 'Failed to fetch graduates');
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
      const response = await getAllGraduates();
      if (response.success) {
        setPrograms(response.data as Graduate[] || []);
      } else {
        throw new Error(response.error || 'Failed to fetch graduates');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addProgram = async (newProgram: Omit<Graduate, 'id'>) => {
    try {
      const response = await addGraduateService(newProgram);
      if (response.success) {
        refreshPrograms(); // Refresh the list after adding
        return response.data?.id;
      } else {
        throw new Error(response.error || 'Failed to add graduate');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const updateProgramById = async (id: string, updatedProgram: Partial<Graduate>) => {
    try {
      const response = await updateGraduateByIdService(id, updatedProgram);
      if (response.success) {
        refreshPrograms(); // Refresh the list after updating
      } else {
        throw new Error(response.error || 'Failed to update graduate');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  };

  const removeProgram = async (id: string) => {
    try {
      const response = await deleteGraduateByIdService(id);
      if (response.success) {
        refreshPrograms(); // Refresh the list after deleting
      } else {
        throw new Error(response.error || 'Failed to delete graduate');
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