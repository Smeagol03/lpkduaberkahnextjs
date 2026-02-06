// hooks/usePaket.ts
import { useState, useEffect } from 'react';
import { Paket, getPaketList, getPaketById } from '@/services/paketService';

export const usePaket = () => {
  const [paket, setPaket] = useState<Paket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const data = await getPaketList();
        setPaket(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPaket();
  }, []);

  const refreshPaket = async () => {
    try {
      setLoading(true);
      const data = await getPaketList();
      setPaket(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    paket,
    loading,
    error,
    refreshPaket
  };
};