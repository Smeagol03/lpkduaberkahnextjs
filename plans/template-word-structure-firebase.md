# Struktur Template Word untuk KRS LPK Dua Berkah Berdasarkan Struktur Firebase

## Struktur Data Firebase
Berdasarkan contoh data dari Firebase Realtime Database, struktur data peserta adalah:

```json
{
  "informasiPribadi": {
    "alamat": "jalan jalan",
    "jenisKelamin": "P",
    "namaLengkap": "alissa",
    "nik": "3271658498600045",
    "noHP": "08128877089",
    "tanggalLahir": "2015-06-09",
    "tempatLahir": "bogor"
  },
  "motivasiReferensi": {
    "alasanMengikuti": "Tidak diisi",
    "sumberInformasi": "social_media"
  },
  "paketPelatihan": "paket1",
  "pendidikanPekerjaan": {
    "pekerjaanSaatIni": "Tidak ada",
    "pendidikanTerakhir": "D3"
  },
  "statusPendaftaran": "menunggu",
  "tanggalDaftar": "2025-11-05T04:39:55.853Z",
  "validasi": {
    "inputDivalidasi": true,
    "waktuValidasi": "2025-11-05T04:39:55.853Z"
  }
}
```

## Placeholder dalam Template Word Berdasarkan Struktur Firebase
Berikut adalah placeholder yang harus digunakan berdasarkan struktur data Firebase:

### Placeholder Utama
- `{{informasiPribadi.namaLengkap}}` - Nama lengkap peserta
- `{{informasiPribadi.alamat}}` - Alamat peserta
- `{{informasiPribadi.tanggalLahir}}` - Tanggal lahir peserta (akan diformat)
- `{{tanggalDaftar}}` - Tanggal peserta terdaftar (akan diformat)
- `{{informasiPribadi.nik}}` - Nomor Induk Kependudukan
- `{{informasiPribadi.jenisKelamin}}` - Jenis kelamin peserta
- `{{paketPelatihan}}` - Nama paket pelatihan yang diikuti
- `{{informasiPribadi.tempatLahir}}` - Tempat lahir peserta
- `{{informasiPribadi.noHP}}` - Nomor HP peserta
- `{{pendidikanPekerjaan.pendidikanTerakhir}}` - Pendidikan terakhir
- `{{pendidikanPekerjaan.pekerjaanSaatIni}}` - Pekerjaan saat ini
- `{{motivasiReferensi.alasanMengikuti}}` - Alasan mengikuti pelatihan
- `{{motivasiReferensi.sumberInformasi}}` - Sumber informasi
- `{{statusPendaftaran}}` - Status pendaftaran
- `{{validasi.waktuValidasi}}` - Waktu validasi (akan diformat)

## Contoh Struktur dalam Template Word
Berikut adalah contoh bagaimana struktur KRS dalam file Word berdasarkan struktur Firebase:

```
KARTU RENCANA STUDI (KRS)
LPK DUA BERKAH

Identitas Peserta:
Nama Lengkap: {{informasiPribadi.namaLengkap}}
NIK: {{informasiPribadi.nik}}
Jenis Kelamin: {{informasiPribadi.jenisKelamin}}
Tempat Lahir: {{informasiPribadi.tempatLahir}}
Tanggal Lahir: {{informasiPribadi.tanggalLahir}}
Alamat: {{informasiPribadi.alamat}}
Nomor HP: {{informasiPribadi.noHP}}

Pendidikan & Pekerjaan:
Pendidikan Terakhir: {{pendidikanPekerjaan.pendidikanTerakhir}}
Pekerjaan Saat Ini: {{pendidikanPekerjaan.pekerjaanSaatIni}}

Informasi Pelatihan:
Paket Pelatihan: {{paketPelatihan}}
Alasan Mengikuti: {{motivasiReferensi.alasanMengikuti}}
Sumber Informasi: {{motivasiReferensi.sumberInformasi}}
Status Pendaftaran: {{statusPendaftaran}}
Tanggal Terdaftar: {{tanggalDaftar}}

Dicetak pada: {{tanggal_cetak}}
```

## Implementasi dalam Sistem
Untuk mengisi template Word dengan data dari Firebase, sistem akan:

1. Mengambil template Word dari `/public/krs/paket1.docx` (atau paket lainnya)
2. Mengganti semua placeholder dengan data peserta yang sesuai dari Firebase
3. Memformat tanggal ke format yang sesuai (misalnya: 7 Februari 2026 dari format ISO)
4. Menghasilkan file Word baru dengan data yang telah diisi
5. Memberikan file tersebut kepada admin untuk diunduh

## Contoh Penggunaan dalam Kode
```javascript
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Ambil template dari public
const response = await fetch('/krs/paket1.docx');
const arrayBuffer = await response.arrayBuffer();

// Buat instance docxtemplater
const zip = new JSZip(arrayBuffer);
const doc = new Docxtemplater(zip, { 
  paragraphLoop: true, 
  linebreaks: true 
});

// Data peserta dari Firebase (langsung dari struktur database)
const peserta = {
  informasiPribadi: {
    namaLengkap: 'John Doe',
    alamat: 'Jl. Contoh No. 123',
    tanggalLahir: '1 Januari 1990', // Sudah diformat atau akan diformat
    nik: '1234567890123456',
    jenisKelamin: 'L',
    tempatLahir: 'Jakarta',
    noHP: '081234567890'
  },
  paketPelatihan: 'Paket 1',
  tanggalDaftar: '15 Februari 2026', // Sudah diformat
  pendidikanPekerjaan: {
    pendidikanTerakhir: 'S1',
    pekerjaanSaatIni: 'Karyawan Swasta'
  },
  motivasiReferensi: {
    alasanMengikuti: 'Ingin menambah keterampilan',
    sumberInformasi: 'Website'
  },
  statusPendaftaran: 'menunggu',
  validasi: {
    waktuValidasi: '7 Februari 2026' // Sudah diformat
  },
  tanggal_cetak: '7 Februari 2026'
};

// Ganti placeholder dengan data
doc.setData(peserta);

// Proses dokumen
doc.render();

// Dapatkan buffer hasil
const out = doc.getZip().generate({ type: 'blob' });

// Simpan file
saveAs(out, `${peserta.informasiPribadi.namaLengkap}_KRS_${peserta.paketPelatihan}.docx`);
```

## File Template yang Dibutuhkan
- `/public/krs/paket1.docx`
- `/public/krs/paket2.docx`
- `/public/krs/paket3.docx`
- `/public/krs/paket4.docx`
- `/public/krs/paket5.docx`

## Tips untuk Membuat Template
1. Gunakan placeholder yang sesuai dengan struktur data Firebase
2. Uji template dengan data contoh dari Firebase
3. Pastikan format tanggal diformat dengan benar (misalnya dari ISO string ke format Indonesia)
4. Gunakan gaya dan format yang profesional
5. Simpan template dalam format .docx (bukan .doc)
6. Buat fungsi utilitas untuk memformat tanggal dari ISO ke format Indonesia