// app/debug/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getAllPeserta } from '@/services/pesertaService';
import { getAllPendaftar } from '@/services/pendaftarService';
import { getAllGraduates } from '@/services/programService';
import { getAllKontrak } from '@/services/kontrakService';

export default function DebugPage() {
  const [debugData, setDebugData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          pesertaData,
          pendaftarData,
          programData,
          kontrakData
        ] = await Promise.all([
          getAllPeserta(),
          getAllPendaftar(),
          getAllGraduates(),
          getAllKontrak()
        ]);

        setDebugData({
          peserta: pesertaData,
          pendaftar: pendaftarData,
          program: programData,
          kontrak: kontrakData
        });
      } catch (error) {
        console.error('Error fetching debug data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading debug data...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Debug Information</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Peserta Data</h2>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(debugData.peserta, null, 2)}
          </pre>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pendaftar Data</h2>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(debugData.pendaftar, null, 2)}
          </pre>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Program Data</h2>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(debugData.program, null, 2)}
          </pre>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Kontrak Data</h2>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(debugData.kontrak, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}