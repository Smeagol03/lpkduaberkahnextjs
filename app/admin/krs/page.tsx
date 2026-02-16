'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePeserta } from '@/hooks/usePeserta';
import { generateKRSForParticipant, generateBatchKRS, getTemplateUrl } from '@/services/krsService';
import { saveAs } from 'file-saver';
import PageHeader from '@/components/admin/PageHeader';
import SearchInput from '@/components/admin/SearchInput';
import StatusBadge from '@/components/admin/StatusBadge';
import DataTable from '@/components/admin/DataTable';

export default function KRSPage() {
  const { peserta, loading, error } = usePeserta();
  const [selectedPeserta, setSelectedPeserta] = useState<string | null>(null);
  const [selectedPaket, setSelectedPaket] = useState<string>('semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<{type: string, text: string} | null>(null);

  const filteredPeserta = useMemo(() => {
    let result = selectedPaket === 'semua' 
      ? peserta 
      : peserta.filter(p => p.paketPelatihan === selectedPaket);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p =>
        (p.informasiPribadi?.namaLengkap || '').toLowerCase().includes(term) ||
        (p.paketPelatihan || '').toLowerCase().includes(term)
      );
    }
    
    return result;
  }, [peserta, selectedPaket, searchTerm]);

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
        const templateUrl = getTemplateUrl(templateName.replace('.docx', ''));
        const response = await fetch(templateUrl);
        const arrayBuffer = await response.arrayBuffer();

        const { default: PizZip } = await import('pizzip');
        const { default: Docxtemplater } = await import('docxtemplater');

        const zip = new PizZip(arrayBuffer);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true
        });

        doc.setData(templateData);

        try {
          doc.render();
        } catch (error: any) {
          console.error('Error rendering document:', error);
          if (error.properties && error.properties.errors instanceof Array) {
            throw new Error(`Template error: ${error.properties.errors.map((e: any) => e.message).join(', ')}`);
          }
          throw error;
        }

        const out = doc.getZip().generate({ type: 'blob' });
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

  const handleGenerateBatchKRS = async () => {
    if (filteredPeserta.length === 0) {
      setMessage({ type: 'error', text: 'Tidak ada peserta yang sesuai dengan filter yang dipilih' });
      return;
    }

    setIsGenerating(true);
    setMessage(null);

    try {
      const pesertaIds = filteredPeserta.map(p => p.id!);
      const result = await generateBatchKRS(pesertaIds);
      
      if (result.success) {
        const { default: PizZip } = await import('pizzip');
        const zip = new PizZip();
        
        for (const krsData of result.data!) {
          if ('error' in krsData) {
            console.error(`Error processing participant ${krsData.pesertaId}:`, krsData.error);
            continue;
          }

          const { templateName, templateData, namaPeserta } = krsData;
          const templateUrl = getTemplateUrl(templateName.replace('.docx', ''));
          const response = await fetch(templateUrl);
          const arrayBuffer = await response.arrayBuffer();

          const { default: Docxtemplater } = await import('docxtemplater');

          const templateZip = new PizZip(arrayBuffer);
          const doc = new Docxtemplater(templateZip, {
            paragraphLoop: true,
            linebreaks: true
          });

          doc.setData(templateData);

          try {
            doc.render();
          } catch (error: any) {
            console.error('Error rendering document for batch:', error);
            if (error.properties && error.properties.errors instanceof Array) {
              throw new Error(`Template error: ${error.properties.errors.map((e: any) => e.message).join(', ')}`);
            }
            throw error;
          }

          const out = doc.getZip().generate({ type: 'nodebuffer' });
          zip.file(`${namaPeserta}_KRS_${templateName}`, out);
        }

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

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const columns = [
    { key: 'informasiPribidi.namaLengkap', title: 'Nama' },
    { key: 'paketPelatihan', title: 'Paket' },
    {
      key: 'statusPeserta',
      title: 'Status',
      render: (value: string) => <StatusBadge status={value} type="peserta" />
    },
    {
      key: 'tanggalDaftar',
      title: 'Tgl. Daftar',
      render: (value: string) => value ? new Date(value).toLocaleDateString('id-ID') : '-'
    },
    {
      key: 'actions',
      title: 'Aksi',
      render: (_: any, record: any) => (
        <button
          onClick={() => {
            setSelectedPeserta(record.id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          Pilih
        </button>
      )
    }
  ];

  const paketOptions = [
    { value: 'semua', label: 'Semua Paket' },
    { value: 'paket1', label: 'Paket 1' },
    { value: 'paket2', label: 'Paket 2' },
    { value: 'paket3', label: 'Paket 3' },
    { value: 'paket4', label: 'Paket 4' },
    { value: 'paket5', label: 'Paket 5' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Generate KRS Pelatihan"
        subtitle="Hasilkan Kartu Rencana Studi pelatihan secara otomatis"
      />

      {message && (
        <div className={`mb-4 p-4 rounded-xl flex items-center gap-3 ${
          message.type === 'error' 
            ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800' 
            : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
        }`}>
          {message.type === 'success' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {message.text}
        </div>
      )}

      {/* Generator Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Generate KRS Tunggal</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pilih Peserta
            </label>
            <select
              value={selectedPeserta || ''}
              onChange={(e) => setSelectedPeserta(e.target.value || null)}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm ${(!selectedPeserta || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Mengenerate...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Generate KRS Tunggal
              </>
            )}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Generate KRS Batch</h2>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter Berdasarkan Paket
            </label>
            <select
              value={selectedPaket}
              onChange={(e) => setSelectedPaket(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {paketOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerateBatchKRS}
            disabled={isGenerating || filteredPeserta.length === 0}
            className={`w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm ${filteredPeserta.length === 0 || isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Mengenerate...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Generate Batch ({filteredPeserta.length} peserta)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Peserta List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Daftar Peserta</h2>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Cari nama peserta..."
            className="w-full sm:w-64"
          />
        </div>
        
        <DataTable
          columns={[
            { key: 'informasiPribadi.namaLengkap', title: 'Nama' },
            { key: 'paketPelatihan', title: 'Paket' },
            {
              key: 'statusPeserta',
              title: 'Status',
              render: (value: string) => <StatusBadge status={value} type="peserta" />
            },
            {
              key: 'tanggalDaftar',
              title: 'Tgl. Daftar',
              render: (value: string) => value ? new Date(value).toLocaleDateString('id-ID') : '-'
            },
            {
              key: 'actions',
              title: 'Aksi',
              render: (_: any, record: any) => (
                <button
                  onClick={() => {
                    setSelectedPeserta(record.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Pilih
                </button>
              )
            }
          ]}
          data={filteredPeserta}
          emptyMessage="Tidak ada peserta yang sesuai"
        />
      </div>
    </div>
  );
}