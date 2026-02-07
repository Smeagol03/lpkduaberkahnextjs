// services/krsService.ts
import { getPesertaById } from './pesertaService';
import { formatDateIndonesia } from '../utils/dateFormatter';

/**
 * Generate KRS for a single participant
 */
// Definisikan tipe untuk data KRS
interface KRSData {
  templateName: string;
  templateData: Record<string, any>;
  pesertaId: string | undefined;
  namaPeserta: string;
}

interface KRSResult {
  success: boolean;
  data?: KRSData;
  error?: string;
}

export const generateKRSForParticipant = async (pesertaId: string): Promise<KRSResult> => {
  try {
    // Get participant data from Firebase
    const response = await getPesertaById(pesertaId);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Data peserta tidak ditemukan');
    }

    // Pastikan response.data adalah objek Peserta tunggal, bukan array
    if (Array.isArray(response.data)) {
      throw new Error('Expected single peserta data, got array');
    }
    
    const peserta = response.data;
    
    // Determine template based on paketPelatihan
    const templateName = `${peserta.paketPelatihan}.docx`;
    
    // Prepare data for template filling
    const templateData = {
      'informasiPribadi.namaLengkap': peserta.informasiPribadi?.namaLengkap || '',
      'informasiPribadi.alamat': peserta.informasiPribadi?.alamat || '',
      'informasiPribadi.tanggalLahir': peserta.informasiPribadi?.tanggalLahir 
        ? formatDateIndonesia(peserta.informasiPribadi.tanggalLahir) 
        : '',
      'informasiPribadi.nik': peserta.informasiPribadi?.nik || '',
      'informasiPribadi.jenisKelamin': peserta.informasiPribadi?.jenisKelamin || '',
      'informasiPribadi.tempatLahir': peserta.informasiPribadi?.tempatLahir || '',
      'informasiPribadi.noHP': peserta.informasiPribadi?.noHP || '',
      paketPelatihan: peserta.paketPelatihan || '',
      tanggalDaftar: peserta.tanggalDaftar 
        ? formatDateIndonesia(peserta.tanggalDaftar) 
        : '',
      tanggalDiterima: peserta.tanggalDiterima 
        ? formatDateIndonesia(peserta.tanggalDiterima) 
        : '',
      'pendidikanPekerjaan.pendidikanTerakhir': peserta.pendidikanPekerjaan?.pendidikanTerakhir || '',
      'pendidikanPekerjaan.pekerjaanSaatIni': peserta.pendidikanPekerjaan?.pekerjaanSaatIni || '',
      'motivasiReferensi.alasanMengikuti': peserta.motivasiReferensi?.alasanMengikuti || '',
      'motivasiReferensi.sumberInformasi': peserta.motivasiReferensi?.sumberInformasi || '',
      statusPendaftaran: peserta.statusPendaftaran || '',
      statusPeserta: peserta.statusPeserta || '',
      'validasi.waktuValidasi': peserta.validasi?.waktuValidasi 
        ? formatDateIndonesia(peserta.validasi.waktuValidasi) 
        : '',
      tanggal_cetak: formatDateIndonesia(new Date().toISOString())
    };

    return {
      success: true,
      data: {
        templateName,
        templateData,
        pesertaId: peserta.id,
        namaPeserta: peserta.informasiPribadi?.namaLengkap || 'Peserta Tanpa Nama'
      }
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengenerate KRS'
    };
  }
};

/**
 * Generate KRS for multiple participants
 */
interface BatchKRSResult {
  success: boolean;
  data?: (KRSData | { pesertaId: string; error: string })[];
  error?: string;
}

export const generateBatchKRS = async (pesertaIds: string[]): Promise<BatchKRSResult> => {
  try {
    const results = [];
    
    for (const id of pesertaIds) {
      const result = await generateKRSForParticipant(id);
      if (result.success && result.data) {
        results.push(result.data);
      } else {
        results.push({
          pesertaId: id,
          error: result.error || 'Unknown error'
        });
      }
    }

    return {
      success: true,
      data: results
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan saat mengenerate batch KRS'
    };
  }
};

/**
 * Get template URL for a specific package
 */
export const getTemplateUrl = (paketPelatihan: string) => {
  return `/krs/${paketPelatihan}.docx`;
};

/**
 * Format participant data for template
 */
export const formatPesertaDataForTemplate = (peserta: any) => {
  return {
    'informasiPribadi.namaLengkap': peserta.informasiPribadi?.namaLengkap || '',
    'informasiPribadi.alamat': peserta.informasiPribadi?.alamat || '',
    'informasiPribadi.tanggalLahir': peserta.informasiPribadi?.tanggalLahir 
      ? formatDateIndonesia(peserta.informasiPribadi.tanggalLahir) 
      : '',
    'informasiPribadi.nik': peserta.informasiPribadi?.nik || '',
    'informasiPribadi.jenisKelamin': peserta.informasiPribadi?.jenisKelamin || '',
    'informasiPribadi.tempatLahir': peserta.informasiPribadi?.tempatLahir || '',
    'informasiPribadi.noHP': peserta.informasiPribadi?.noHP || '',
    paketPelatihan: peserta.paketPelatihan || '',
    tanggalDaftar: peserta.tanggalDaftar 
      ? formatDateIndonesia(peserta.tanggalDaftar) 
      : '',
    tanggalDiterima: peserta.tanggalDiterima 
      ? formatDateIndonesia(peserta.tanggalDiterima) 
      : '',
    'pendidikanPekerjaan.pendidikanTerakhir': peserta.pendidikanPekerjaan?.pendidikanTerakhir || '',
    'pendidikanPekerjaan.pekerjaanSaatIni': peserta.pendidikanPekerjaan?.pekerjaanSaatIni || '',
    'motivasiReferensi.alasanMengikuti': peserta.motivasiReferensi?.alasanMengikuti || '',
    'motivasiReferensi.sumberInformasi': peserta.motivasiReferensi?.sumberInformasi || '',
    statusPendaftaran: peserta.statusPendaftaran || '',
    statusPeserta: peserta.statusPeserta || '',
    'validasi.waktuValidasi': peserta.validasi?.waktuValidasi 
      ? formatDateIndonesia(peserta.validasi.waktuValidasi) 
      : '',
    tanggal_cetak: formatDateIndonesia(new Date().toISOString())
  };
};