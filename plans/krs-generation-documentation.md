# Dokumentasi Sistem Generate KRS Pelatihan LPK Dua Berkah

## Gambaran Umum
Sistem ini dirancang untuk menghasilkan Kartu Rencana Studi (KRS) pelatihan secara otomatis berdasarkan data peserta dari Firebase Realtime Database tanpa menyimpan hasil generate secara permanen.

## Tujuan
- Menghasilkan KRS pelatihan secara otomatis
- Mengambil data peserta langsung dari Realtime Database
- Mengurangi proses input manual oleh admin
- Menyediakan preview dan export KRS tanpa penyimpanan histori

## Arsitektur Sistem
- **Sumber Data**: Firebase Realtime Database
- **Frontend**: Next.js Admin Panel
- **Processing**: Generate KRS secara runtime
- **Strategi Penyimpanan**: Tidak menyimpan hasil generate

## Struktur Data Sumber
- **Path**: `pendaftar`
- **Field yang Dibutuhkan**:
  - `informasiPribadi.namaLengkap`
  - `informasiPribadi.nik`
  - `informasiPribadi.jenisKelamin`
  - `informasiPribadi.tanggalLahir`
  - `informasiPribadi.alamat`
  - `paketPelatihan`
  - `statusPeserta`
  - `tanggalDiterima`

## Fitur-fitur Admin
- Melihat daftar peserta aktif
- Generate KRS per peserta
- Generate KRS per paket pelatihan
- Preview KRS
- Export KRS ke PDF atau Word
- Cetak KRS

## Workflow Sistem
1. Admin membuka halaman KRS
2. Admin memilih peserta atau paket pelatihan
3. Sistem mengambil data peserta dari Realtime Database
4. Sistem melakukan mapping paket ke kurikulum pelatihan
5. Sistem menghasilkan KRS secara otomatis
6. Admin melakukan preview atau export KRS

## Struktur KRS
### Identitas Peserta
- Nama Lengkap
- NIK
- Jenis Kelamin
- Tanggal Lahir
- Alamat

### Informasi Pelatihan
- Nama Paket Pelatihan
- Daftar Materi Pelatihan
- Tanggal Mulai Pelatihan
- Instruktur
- Durasi Pelatihan

### Legalitas
- Tanggal Cetak
- Tanda Tangan Penyelenggara

## Desain Layanan
### pesertaService
- **Tanggung Jawab**: Mengambil dan memfilter data peserta dari Firebase
- **Fungsi-fungsi**:
  - `getAllPeserta`
  - `getPesertaAktif`
  - `getPesertaByPaket`

### krsService
- **Tanggung Jawab**: Membuat struktur KRS dari data peserta
- **Fungsi-fungsi**:
  - `generateKRS`
  - `mapKurikulum`
  - `formatTanggal`

## Aturan Pemrosesan Data
- **Filter Peserta**: `statusPeserta: "aktif"`
- **Strategi Generate**: Generate saat diminta (on-demand)
- **Penyimpanan Data**: Tidak menyimpan hasil generate

## Opsi Ekspor
- Preview HTML
- Print Browser
- Export PDF
- Export Word

## Pendekatan Template File-Based
### Struktur Template
```
public/templates/
├── paket1.docx
├── paket2.docx
├── paket3.docx
├── paket4.docx
├── paket5.docx
```

### Placeholder dalam Template
- `{{nama_peserta}}`
- `{{nik}}`
- `{{tanggal_lahir}}`
- `{{alamat}}`
- `{{paket_pelatihan}}`
- `{{tanggal_mulai}}`
- `{{instruktur}}`
- `{{materi_pelatihan}}`
- `{{ttd_admin}}`

### Mapping Template
```javascript
const templateMap = {
  'paket1': 'paket1.docx',
  'paket2': 'paket2.docx',
  'paket3': 'paket3.docx',
  'paket4': 'paket4.docx',
  'paket5': 'paket5.docx'
};
```

## Batch Download KRS
### Fitur Batch Download
- Download banyak KRS sekaligus (misalnya untuk satu kelas/paket pelatihan)
- Pilihan: ZIP file berisi semua KRS atau gabung jadi satu dokumen

### Implementasi Batch Download
#### A. Multiple Files dalam ZIP
```javascript
// services/krsService.js
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const generateBatchKRS = async (pesertaIds) => {
  const zip = new JSZip();
  
  // Generate KRS untuk setiap peserta
  for (const id of pesertaIds) {
    const peserta = await getPesertaById(id);
    const templateFile = templateMap[peserta.paketPelatihan];
    
    const response = await fetch(`/templates/${templateFile}`);
    const buffer = await response.arrayBuffer();
    
    const filledDoc = fillTemplate(buffer, {
      nama_peserta: peserta.informasiPribadi.namaLengkap,
      // ... data lainnya
    });
    
    // Tambahkan ke ZIP dengan nama file yang informatif
    zip.file(`${peserta.informasiPribadi.namaLengkap}_${id}.docx`, filledDoc);
  }
  
  // Generate ZIP file
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'batch_krs_pelatihan.zip');
};
```

## Pertimbangan Kinerja
- Gunakan query Firebase untuk filter paket pelatihan
- Hindari mengambil seluruh data jika tidak diperlukan
- Pisahkan logic generate dan pengambilan data

## Pertimbangan Keamanan
- Halaman hanya dapat diakses oleh admin
- Firebase rules hanya mengizinkan akses admin

## Pengembangan Mendatang
- Template KRS dinamis
- Penambahan tanda tangan digital
- Penambahan nomor KRS otomatis
- Export batch KRS banyak peserta
- Integrasi jadwal pelatihan

## Prioritas Pengembangan
1. Membuat pesertaService
2. Membuat krsService
3. Membuat halaman admin generate KRS
4. Membuat template tampilan KRS
5. Menambahkan fitur export

## Saran-saran Tambahan
### Struktur Data dan Kurikulum
- Sebaiknya tambahkan struktur data untuk kurikulum pelatihan (materi-materi spesifik per paket) di Firebase
- Buat path `kurikulum` atau `materi_pelatihan` di Firebase untuk mapping antara `paketPelatihan` dengan daftar materi sebenarnya

### Peningkatan Struktur KRS
- Tambahkan elemen seperti:
  - Nomor KRS otomatis
  - Tanggal registrasi
  - Jadwal pelatihan spesifik
  - Beban SKS/jam pelatihan
  - Catatan khusus

### Fitur Preview dan Template
- Buat sistem template KRS yang bisa diganti-ganti
- Tambahkan fitur preview sebelum export
- Gunakan Tailwind CSS untuk tampilan yang profesional

### Validasi dan Error Handling
- Tambahkan validasi bahwa data peserta lengkap sebelum generate KRS
- Tambahkan error handling jika data kurikulum tidak ditemukan untuk paket tertentu

### Integrasi dengan Sistem yang Ada
- Sesuaikan dengan struktur data yang sudah ada di `pesertaService` dan `pendaftarService`
- Gunakan komponen-komponen yang sudah ada di sistem admin untuk konsistensi UI