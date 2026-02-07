// app/admin/krs/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePeserta } from '@/hooks/usePeserta';
import { generateKRSForParticipant, generateBatchKRS, getTemplateUrl } from '@/services/krsService';
import { saveAs } from 'file-saver';

export default function KRSPage() {
  const { peserta, loading, error } = usePeserta();
  const [selectedPeserta, setSelectedPeserta] = useState<string | null>(null);
  const [selectedPaket, setSelectedPaket] = useState<string>('semua');
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<{type: string, text: string} | null>(null);

  // Filter participants based on selected package
  const filteredPeserta = selectedPaket === 'semua' 
    ? peserta 
    : peserta.filter(p => p.paketPelatihan === selectedPaket);

  // Handle single KRS generation
  const handleGenerateSingleKRS = async () => {
    if (!selectedPeserta) {
      setMessage({ type: 'error', text: 'Silakan pilih peserta terlebih dahulu' });
      return;
    }

    setIsGenerating(true);
    setMessage(null);

    try {
      const result = await generateKRSForParticipant(selectedPeserta);
      
      if (result.success && result.data) {
        const { templateName, templateData, namaPeserta } = result.data;
        
        // Fetch the template
        const templateUrl = getTemplateUrl(templateName.replace('.docx', ''));
        const response = await fetch(templateUrl);
        const arrayBuffer = await response.arrayBuffer();

        // Dynamically import docxtemplater and pizzip
        const { default: PizZip } = await import('pizzip');
        const { default: Docxtemplater } = await import('docxtemplater');

        // Process the template with data
        const zip = new PizZip(arrayBuffer);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true
        });

        // Set the data
        doc.setData(templateData);

        try {
          // Render the document
          doc.render();
        } catch (error: any) {
          console.error('Error rendering document:', error);
          if (error.properties && error.properties.errors instanceof Array) {
            console.error('Template errors:', error.properties.errors);
            throw new Error(`Template error: ${error.properties.errors.map((e: any) => e.message).join(', ')}`);
          }
          throw error;
        }

        // Get the output
        const out = doc.getZip().generate({ type: 'blob' });

        // Save the file
        saveAs(out, `${namaPeserta}_KRS_${templateName}`);

        setMessage({ type: 'success', text: `KRS berhasil digenerate untuk ${namaPeserta}` });
      } else {
        setMessage({ type: 'error', text: result.error || 'Unknown error occurred' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: `Gagal mengenerate KRS: ${err.message}` });
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle batch KRS generation
  const handleGenerateBatchKRS = async () => {
    if (filteredPeserta.length === 0) {
      setMessage({ type: 'error', text: 'Tidak ada peserta yang sesuai dengan filter yang dipilih' });
      return;
    }

    setIsGenerating(true);
    setMessage(null);

    try {
      // Get all participant IDs
      const pesertaIds = filteredPeserta.map(p => p.id!);
      
      // Generate batch KRS data
      const result = await generateBatchKRS(pesertaIds);
      
      if (result.success) {
        // Dynamically import PizZip
        const { default: PizZip } = await import('pizzip');
        
        // Create a ZIP file for batch download
        const zip = new PizZip();
        
        for (const krsData of result.data!) {
          // Check if this is an error object or a success data object
          if ('error' in krsData) {
            console.error(`Error processing participant ${krsData.pesertaId}:`, krsData.error);
            continue;
          }

          const { templateName, templateData, namaPeserta } = krsData;
          
          // Fetch the template
          const templateUrl = getTemplateUrl(templateName.replace('.docx', ''));
          const response = await fetch(templateUrl);
          const arrayBuffer = await response.arrayBuffer();

          // Dynamically import Docxtemplater
          const { default: Docxtemplater } = await import('docxtemplater');

          // Process the template with data
          const templateZip = new PizZip(arrayBuffer);
          const doc = new Docxtemplater(templateZip, {
            paragraphLoop: true,
            linebreaks: true
          });

          // Set the data
          doc.setData(templateData);

          try {
            // Render the document
            doc.render();
          } catch (error: any) {
            console.error('Error rendering document for batch:', error);
            if (error.properties && error.properties.errors instanceof Array) {
              console.error('Template errors for batch:', error.properties.errors);
              throw new Error(`Template error: ${error.properties.errors.map((e: any) => e.message).join(', ')}`);
            }
            throw error;
          }

          // Add to ZIP
          const out = doc.getZip().generate({ type: 'nodebuffer' });
          zip.file(`${namaPeserta}_KRS_${templateName}`, out);
        }

        // Generate and download the ZIP
        const content = zip.generate({ type: 'blob' });
        const fileName = `batch_KRS_${selectedPaket === 'semua' ? 'semua' : selectedPaket || 'unknown'}.zip`;
        saveAs(content, fileName);

        setMessage({
          type: 'success',
          text: `Batch KRS berhasil digenerate untuk ${result.data!.length} peserta`
        });
      } else {
        setMessage({ type: 'error', text: result.error || 'Unknown error occurred' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: `Gagal mengenerate batch KRS: ${err.message}` });
    } finally {
      setIsGenerating(false);
    }
  };

  // Reset message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (loading) return <div className="text-center py-8">Memuat data peserta...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Generate KRS Pelatihan</h1>
        <p className="text-gray-600">Hasilkan Kartu Rencana Studi pelatihan secara otomatis</p>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Generate KRS Tunggal</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="peserta-select">
                Pilih Peserta
              </label>
              <select
                id="peserta-select"
                value={selectedPeserta || ''}
                onChange={(e) => setSelectedPeserta(e.target.value || null)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Pilih peserta...</option>
                {filteredPeserta.map(peserta => (
                  <option key={peserta.id} value={peserta.id}>
                    {peserta.informasiPribadi?.namaLengkap} ({peserta.paketPelatihan})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerateSingleKRS}
              disabled={isGenerating || !selectedPeserta}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${(!selectedPeserta || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isGenerating ? 'Mengenerate...' : 'Generate KRS Tunggal'}
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Generate KRS Batch</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paket-filter">
                Filter Berdasarkan Paket
              </label>
              <select
                id="paket-filter"
                value={selectedPaket}
                onChange={(e) => setSelectedPaket(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="semua">Semua Paket</option>
                <option value="paket1">Paket 1</option>
                <option value="paket2">Paket 2</option>
                <option value="paket3">Paket 3</option>
                <option value="paket4">Paket 4</option>
                <option value="paket5">Paket 5</option>
              </select>
            </div>

            <button
              onClick={handleGenerateBatchKRS}
              disabled={isGenerating || filteredPeserta.length === 0}
              className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${filteredPeserta.length === 0 || isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isGenerating ? 'Mengenerate...' : `Generate Batch (${filteredPeserta.length} peserta)`}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Daftar Peserta</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paket
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Daftar
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPeserta.map((peserta) => (
                <tr key={peserta.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {peserta.informasiPribadi?.namaLengkap}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{peserta.paketPelatihan}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      peserta.statusPeserta === 'aktif' ? 'bg-green-100 text-green-800' :
                      peserta.statusPeserta === 'baru' ? 'bg-yellow-100 text-yellow-800' :
                      peserta.statusPeserta === 'lulus' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {peserta.statusPeserta}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {peserta.tanggalDaftar ? new Date(peserta.tanggalDaftar).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedPeserta(peserta.id!);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Pilih
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}