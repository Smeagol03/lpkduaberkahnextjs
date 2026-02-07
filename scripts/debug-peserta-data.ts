// scripts/debug-peserta-data.ts
import { getPesertaById } from '../services/pesertaService';

/**
 * This script helps debug participant data to see what values are actually stored
 * in Firebase compared to what the edit form expects
 */
export async function debugPesertaData(pesertaId: string) {
  try {
    console.log(`Fetching participant data for ID: ${pesertaId}`);
    const result = await getPesertaById(pesertaId);
    
    if (result.success && result.data) {
      console.log('Participant data retrieved successfully:');
      console.log(JSON.stringify(result.data, null, 2));
      
      // Check specific fields that might have mismatched values
      const participant = result.data;
      
      console.log('\n--- Field Value Analysis ---');
      console.log(`jenisKelamin: "${participant.informasiPribadi?.jenisKelamin}"`);
      console.log(`pendidikanTerakhir: "${participant.pendidikanPekerjaan?.pendidikanTerakhir}"`);
      console.log(`sumberInformasi: "${participant.motivasiReferensi?.sumberInformasi}"`);
      console.log(`statusPendaftaran: "${participant.statusPendaftaran}"`);
      console.log(`statusPeserta: "${participant.statusPeserta}"`);
      
      console.log('\n--- Expected Values ---');
      console.log('jenisKelamin: "Laki-laki" or "Perempuan"');
      console.log('pendidikanTerakhir: "SD", "SMP", "SMA/SMK", "Diploma", "Sarjana", "Magister", "Doktor"');
      console.log('sumberInformasi: "Media Sosial", "Teman/Keluarga", "Spanduk/Papan Iklan", "Website", "Lainnya"');
      console.log('statusPendaftaran: "menunggu", "disetujui", "ditolak"');
      console.log('statusPeserta: "baru", "aktif", "lulus", "ditolak"');
    } else {
      console.log('Failed to retrieve participant data:', result.error);
    }
  } catch (error) {
    console.error('Error fetching participant data:', error);
  }
}

// Example usage (uncomment to run):
// debugPesertaData('some-participant-id');