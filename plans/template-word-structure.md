# Struktur Template Word untuk KRS LPK Dua Berkah

## Deskripsi
File ini menjelaskan struktur template Word yang digunakan untuk menghasilkan KRS pelatihan secara otomatis.

## Placeholder dalam Template Word
Berikut adalah placeholder yang harus Anda masukkan ke dalam file Word template:

### Placeholder Utama
- `{{nama_peserta}}` - Nama lengkap peserta
- `{{alamat_peserta}}` - Alamat peserta
- `{{tanggal_lahir}}` - Tanggal lahir peserta
- `{{terdaftar_pada}}` - Tanggal peserta terdaftar
- `{{nik}}` - Nomor Induk Kependudukan
- `{{jenis_kelamin}}` - Jenis kelamin peserta
- `{{paket_pelatihan}}` - Nama paket pelatihan yang diikuti
- `{{tanggal_mulai}}` - Tanggal mulai pelatihan
- `{{tanggal_selesai}}` - Tanggal selesai pelatihan
- `{{instruktur}}` - Nama instruktur pelatihan
- `{{materi_pelatihan}}` - Daftar materi pelatihan dalam paket
- `{{ttd_admin}}` - Tanda tangan admin/penyelenggara
- `{{tanggal_cetak}}` - Tanggal KRS dicetak

## Contoh Struktur dalam Template Word
Berikut adalah contoh bagaimana struktur KRS dalam file Word:

```
KARTU RENCANA STUDI (KRS)
LPK DUA BERKAH

Nama Peserta: {{nama_peserta}}
NIK: {{nik}}
Jenis Kelamin: {{jenis_kelamin}}
Tanggal Lahir: {{tanggal_lahir}}
Alamat: {{alamat_peserta}}

Informasi Pelatihan:
Paket Pelatihan: {{paket_pelatihan}}
Tanggal Terdaftar: {{terdaftar_pada}}
Tanggal Mulai: {{tanggal_mulai}}
Tanggal Selesai: {{tanggal_selesai}}
Instruktur: {{instruktur}}

Materi Pelatihan:
{{materi_pelatihan}}

Dicetak pada: {{tanggal_cetak}}
Tanda Tangan Penyelenggara: {{ttd_admin}}
```

## Implementasi dalam Sistem
Untuk mengisi template Word dengan data dari Firebase, sistem akan:

1. Mengambil template Word dari `/public/krs/paket1.docx` (atau paket lainnya)
2. Mengganti semua placeholder dengan data peserta yang sesuai
3. Menghasilkan file Word baru dengan data yang telah diisi
4. Memberikan file tersebut kepada admin untuk diunduh

## Library yang Digunakan
- `docxtemplater` - untuk mengisi template Word dengan data dinamis
- `jszip` - untuk menangani file ZIP jika perlu
- `docx` - alternatif untuk membuat dokumen Word dari awal

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

// Data peserta dari Firebase
const peserta = {
  nama_peserta: 'John Doe',
  alamat_peserta: 'Jl. Contoh No. 123',
  tanggal_lahir: '1 Januari 1990',
  terdaftar_pada: '15 Februari 2026',
  nik: '1234567890123456',
  jenis_kelamin: 'L',
  paket_pelatihan: 'Paket 1',
  tanggal_mulai: '1 Maret 2026',
  tanggal_selesai: '30 April 2026',
  instruktur: 'Instruktur A',
  materi_pelatihan: '1. Dasar Menjahit\n2. Pola Pakaian Sederhana\n3. Teknik Jahit Tangan',
  ttd_admin: '[Tanda Tangan]',
  tanggal_cetak: '7 Februari 2026'
};

// Ganti placeholder dengan data
doc.setData(peserta);

// Proses dokumen
doc.render();

// Dapatkan buffer hasil
const out = doc.getZip().generate({ type: 'blob' });

// Simpan file
saveAs(out, `${peserta.nama_peserta}_KRS_${peserta.paket_pelatihan}.docx`);
```

## File Template yang Dibutuhkan
- `/public/krs/paket1.docx`
- `/public/krs/paket2.docx`
- `/public/krs/paket3.docx`
- `/public/krs/paket4.docx`
- `/public/krs/paket5.docx`

## Tips untuk Membuat Template
1. Gunakan placeholder yang konsisten di semua template
2. Uji template dengan data contoh sebelum digunakan secara produksi
3. Pastikan format tanggal dan angka sesuai dengan kebutuhan lokal
4. Gunakan gaya dan format yang profesional
5. Simpan template dalam format .docx (bukan .doc)