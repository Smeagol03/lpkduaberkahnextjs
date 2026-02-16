'use client';

import { useState } from 'react';

interface FormData {
  informasiPribadi: {
    namaLengkap: string;
    nik: string;
    noHP: string;
    alamat: string;
    jenisKelamin: string;
    tempatLahir: string;
    tanggalLahir: string;
  };
  pendidikanPekerjaan: {
    pendidikanTerakhir: string;
    pekerjaanSaatIni: string;
  };
  motivasiReferensi: {
    alasanMengikuti: string;
    sumberInformasi: string;
  };
  paketPelatihan: string;
  statusPeserta: 'baru' | 'aktif' | 'lulus' | 'ditolak';
  statusPendaftaran: 'menunggu' | 'disetujui' | 'ditolak';
}

interface FormPesertaProps {
  initialData?: any;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const paketOptions = [
  { value: 'paket1', label: 'Paket 1 - Menjahit Dasar' },
  { value: 'paket2', label: 'Paket 2 - Menjahit Lanjutan' },
  { value: 'paket3', label: 'Paket 3 - Tata Rias Dasar' },
  { value: 'paket4', label: 'Paket 4 - Tata Rias Lanjutan' },
  { value: 'paket5', label: 'Paket 5 - Wirausaha Konveksi' },
];

const pendidikanOptions = [
  { value: 'sd', label: 'SD' },
  { value: 'smp', label: 'SMP' },
  { value: 'sma', label: 'SMA/SMK' },
  { value: 'd1', label: 'D1' },
  { value: 'd2', label: 'D2' },
  { value: 'd3', label: 'D3' },
  { value: 's1', label: 'S1' },
  { value: 's2', label: 'S2' },
  { value: 's3', label: 'S3' },
];

export default function FormPeserta({ initialData, onSubmit, onCancel }: FormPesertaProps) {
  const [formData, setFormData] = useState<FormData>({
    informasiPribadi: {
      namaLengkap: initialData?.informasiPribadi?.namaLengkap || '',
      nik: initialData?.informasiPribadi?.nik || '',
      noHP: initialData?.informasiPribidi?.noHP || '',
      alamat: initialData?.informasiPribadi?.alamat || '',
      jenisKelamin: initialData?.informasiPribadi?.jenisKelamin || '',
      tempatLahir: initialData?.informasiPribadi?.tempatLahir || '',
      tanggalLahir: initialData?.informasiPribadi?.tanggalLahir || '',
    },
    pendidikanPekerjaan: {
      pendidikanTerakhir: initialData?.pendidikanPekerjaan?.pendidikanTerakhir || '',
      pekerjaanSaatIni: initialData?.pendidikanPekerjaan?.pekerjaanSaatIni || '',
    },
    motivasiReferensi: {
      alasanMengikuti: initialData?.motivasiReferensi?.alasanMengikuti || '',
      sumberInformasi: initialData?.motivasiReferensi?.sumberInformasi || '',
    },
    paketPelatihan: initialData?.paketPelatihan || '',
    statusPeserta: initialData?.statusPeserta || 'baru',
    statusPendaftaran: initialData?.statusPendaftaran || 'disetujui',
  });

  const [activeSection, setActiveSection] = useState<'pribadi' | 'pendidikan' | 'motivasi'>('pribadi');

  const handleChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof FormData] as object,
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass = "w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";
  const selectClass = "w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white cursor-pointer";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {[
          { key: 'pribadi', label: 'Informasi Pribadi' },
          { key: 'pendidikan', label: 'Pendidikan & Pekerjaan' },
          { key: 'motivasi', label: 'Motivasi & Referensi' },
        ].map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveSection(tab.key as typeof activeSection)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors ${
              activeSection === tab.key
                ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Informasi Pribadi */}
      {activeSection === 'pribadi' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelClass}>Nama Lengkap *</label>
            <input
              type="text"
              value={formData.informasiPribadi.namaLengkap}
              onChange={(e) => handleChange('informasiPribadi', 'namaLengkap', e.target.value)}
              className={inputClass}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          
          <div>
            <label className={labelClass}>NIK *</label>
            <input
              type="text"
              value={formData.informasiPribadi.nik}
              onChange={(e) => handleChange('informasiPribadi', 'nik', e.target.value)}
              className={inputClass}
              placeholder="16 digit NIK"
              maxLength={16}
              required
            />
          </div>
          
          <div>
            <label className={labelClass}>Nomor HP *</label>
            <input
              type="text"
              value={formData.informasiPribadi.noHP}
              onChange={(e) => handleChange('informasiPribadi', 'noHP', e.target.value)}
              className={inputClass}
              placeholder="08xxxxxxxxxx"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label className={labelClass}>Alamat Lengkap *</label>
            <textarea
              value={formData.informasiPribadi.alamat}
              onChange={(e) => handleChange('informasiPribadi', 'alamat', e.target.value)}
              className={`${inputClass} resize-none`}
              rows={2}
              placeholder="Alamat lengkap"
              required
            />
          </div>
          
          <div>
            <label className={labelClass}>Jenis Kelamin *</label>
            <select
              value={formData.informasiPribadi.jenisKelamin}
              onChange={(e) => handleChange('informasiPribadi', 'jenisKelamin', e.target.value)}
              className={selectClass}
              required
            >
              <option value="">Pilih jenis kelamin</option>
              <option value="laki-laki">Laki-laki</option>
              <option value="perempuan">Perempuan</option>
            </select>
          </div>
          
          <div>
            <label className={labelClass}>Tempat Lahir</label>
            <input
              type="text"
              value={formData.informasiPribadi.tempatLahir}
              onChange={(e) => handleChange('informasiPribadi', 'tempatLahir', e.target.value)}
              className={inputClass}
              placeholder="Kota kelahiran"
            />
          </div>
          
          <div>
            <label className={labelClass}>Tanggal Lahir</label>
            <input
              type="date"
              value={formData.informasiPribadi.tanggalLahir}
              onChange={(e) => handleChange('informasiPribadi', 'tanggalLahir', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Pendidikan & Pekerjaan */}
      {activeSection === 'pendidikan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Pendidikan Terakhir *</label>
            <select
              value={formData.pendidikanPekerjaan.pendidikanTerakhir}
              onChange={(e) => handleChange('pendidikanPekerjaan', 'pendidikanTerakhir', e.target.value)}
              className={selectClass}
              required
            >
              <option value="">Pilih pendidikan terakhir</option>
              {pendidikanOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={labelClass}>Pekerjaan Saat Ini</label>
            <input
              type="text"
              value={formData.pendidikanPekerjaan.pekerjaanSaatIni}
              onChange={(e) => handleChange('pendidikanPekerjaan', 'pekerjaanSaatIni', e.target.value)}
              className={inputClass}
              placeholder="Pekerjaan saat ini"
            />
          </div>
        </div>
      )}

      {/* Motivasi & Referensi */}
      {activeSection === 'motivasi' && (
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className={labelClass}>Alasan Mengikuti Pelatihan</label>
            <textarea
              value={formData.motivasiReferensi.alasanMengikuti}
              onChange={(e) => handleChange('motivasiReferensi', 'alasanMengikuti', e.target.value)}
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Alasan mengikuti pelatihan"
            />
          </div>
          
          <div>
            <label className={labelClass}>Sumber Informasi</label>
            <select
              value={formData.motivasiReferensi.sumberInformasi}
              onChange={(e) => handleChange('motivasiReferensi', 'sumberInformasi', e.target.value)}
              className={selectClass}
            >
              <option value="">Pilih sumber informasi</option>
              <option value="media-sosial">Media Sosial</option>
              <option value="teman-keluarga">Teman/Keluarga</option>
              <option value="internet">Internet</option>
              <option value="brosur">Brosur</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
        </div>
      )}

      {/* Paket & Status */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Paket Pelatihan *</label>
            <select
              value={formData.paketPelatihan}
              onChange={(e) => handleDirectChange('paketPelatihan', e.target.value)}
              className={selectClass}
              required
            >
              <option value="">Pilih paket pelatihan</option>
              {paketOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={labelClass}>Status Peserta</label>
            <select
              value={formData.statusPeserta}
              onChange={(e) => handleDirectChange('statusPeserta', e.target.value)}
              className={selectClass}
            >
              <option value="baru">Baru</option>
              <option value="aktif">Aktif</option>
              <option value="lulus">Lulus</option>
              <option value="ditolak">Ditolak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-xl transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Simpan
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-6 rounded-xl border border-gray-300 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Batal
        </button>
      </div>
    </form>
  );
}