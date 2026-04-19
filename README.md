# 🏫 LPK Dua Berkah - Official Web Application

Sistem manajemen pendaftaran dan administrasi peserta kursus LPK Dua Berkah berbasis Next.js dan Firebase.

---

## 🚀 Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Runtime:** Node.js 24.x
- **Bahasa:** TypeScript
- **Database:** Firebase Realtime Database
- **Autentikasi:** Firebase Authentication + HTTP-Only Session Cookies
- **Styling:** Tailwind CSS v4
- **Animasi:** Motion (Framer Motion)
- **Keamanan:** Cloudflare Turnstile (Anti-Spam) + Firebase Admin SDK
- **Notifikasi:** React Hot Toast
- **Deployment:** Vercel

---

## 🔐 Arsitektur Keamanan (Current State)

Kami menerapkan standar keamanan berlapis untuk melindungi data peserta:

1.  **Anti-Spam (Cloudflare Turnstile):** Pendaftaran publik dilindungi oleh Turnstile dengan verifikasi **Server-to-Server**. Token divalidasi di API Route sebelum menyentuh database.
2.  **Firebase Admin SDK (Server-Side Writes):** Akses tulis (`.write`) ke koleksi `pendaftar` dikunci total di Firebase Rules. Hanya API Route di Vercel (menggunakan Admin SDK) yang memiliki izin untuk menulis data.
3.  **Global Route Protection:** Seluruh folder `/admin` dilindungi secara otomatis menggunakan komponen `ProtectedRoute` di dalam `AdminLayout.tsx`.
4.  **Secure Session:** Menggunakan `HttpOnly` Cookies untuk menyimpan session admin, mencegah serangan XSS yang mencoba mencuri token akses.
5.  **Environment Variables:** Semua kunci rahasia (Turnstile Secret, Firebase Private Key) disimpan di Vercel Environment Variables dan tidak pernah di-hardcode.

---

## ⚡ Optimasi Performa & Data

1.  **N+1 Query Prevention:** Menerapkan teknik **Denormalisasi**. Contoh: Data kontrak menyimpan `namaPeserta` secara langsung agar tidak perlu melakukan fetch berulang saat menampilkan tabel.
2.  **Atomic Updates:** Menggunakan *Multi-Path Updates* pada Firebase untuk operasi yang memindahkan data (seperti saat peserta lulus), memastikan konsistensi data (tidak ada data ganda/hilang).
3.  **Dashboard Efficiency:** Membatasi data yang dirender di dashboard (limit terbaru) untuk mencegah browser melambat saat data sudah ribuan.

---

## 🛠️ Persiapan Pengembangan (Local Setup)

1.  **Clone & Install:**
    ```bash
    git clone [repo-url]
    cd lpkduaberkahnextjs
    pnpm install
    ```

2.  **Environment Variables (`.env.local`):**
    Buat file `.env.local` dan isi dengan konfigurasi berikut:
    ```env
    # Cloudflare Turnstile
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
    TURNSTILE_SECRET_KEY=your_secret_key

    # Firebase Public (Client)
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_DATABASE_URL=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

    # Firebase Admin (Server)
    FIREBASE_CLIENT_EMAIL=...
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
    ```

3.  **Jalankan Project:**
    ```bash
    pnpm dev
    ```

---

## 🛡️ Konfigurasi Firebase Rules (Rekomendasi)

Gunakan aturan berikut di Firebase Console untuk keamanan maksimal:

```json
{
  "rules": {
    "pendaftar": {
      ".read": "auth != null",
      ".write": false 
    },
    "peserta": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "program": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "kontrak": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "paket": {
      ".read": "true",
      ".write": "auth != null"
    },
    "sessions": {
      "$userId": {
        ".read": "auth.uid === $userId",
        ".write": "auth.uid === $userId"
      }
    }
  }
}
```

---

## 🚀 Deployment (Vercel)

1.  Hubungkan repositori GitHub ke Vercel.
2.  **Penting:** Masukkan SEMUA variabel dari `.env.local` ke **Vercel Settings > Environment Variables**.
3.  Vercel akan mendeteksi framework Next.js secara otomatis.
4.  Lakukan deploy.

---

## 📝 Catatan Maintenance

- **Ubah Kunci:** Jika kunci Turnstile atau Firebase bocor, segera ganti di Dashboard masing-masing layanan dan update di Vercel Environment Variables.
- **Update Dependencies:** Gunakan `pnpm update` secara berkala untuk menjaga keamanan package.

**Project Status:** ✅ Production Ready | **Last Updated:** April 19, 2026
