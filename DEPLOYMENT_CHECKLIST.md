# Checklist Deploy Production - LPK Dua Berkah Next.js

## ✅ Build & Code Quality
- [x] Build berhasil tanpa error (`pnpm build`)
- [x] TypeScript compile tanpa error
- [x] Tidak ada console error setelah logout
- [x] Hooks mengikuti Rules of Hooks

## 🔐 Authentication & Security
- [x] Login page berfungsi dengan AuthProvider
- [x] Protected routes berfungsi (dashboard redirect ke login jika belum auth)
- [x] Logout berfungsi dengan benar
- [x] Firebase Realtime Database rules sudah dikonfigurasi
- [x] Session management dengan single device enforcement

## 📄 Files yang Perlu Dicek

### 1. Environment Variables
Pastikan file `.env.local` sudah ada di production dengan variabel yang benar:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### 2. Firebase Rules
Paste rules ini ke Firebase Console → Realtime Database → Rules:
```json
{
  "rules": {
    "peserta": { ".read": "auth != null", ".write": "auth != null" },
    "program": { ".read": "auth != null", ".write": "auth != null" },
    "kontrak": { ".read": "auth != null", ".write": "auth != null" },
    "krs": { ".read": "auth != null", ".write": "auth != null" },
    "pendaftar": { ".read": "auth != null", ".write": "auth != null" },
    "paket": { ".read": "true", ".write": "auth != null" },
    "sessions": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$userId": {
        ".read": "auth != null",
        ".write": "auth != null && auth.uid === $userId"
      }
    },
    "admin": { ".read": "auth != null", ".write": "auth != null" }
  }
}
```

### 3. Firebase Authentication
- [ ] Enable Email/Password sign-in method di Firebase Console
- [ ] Tambahkan admin user dengan email dan password yang aman

## 🚀 Deploy Commands

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Manual Deploy
```bash
# Build
pnpm build

# Start production server
pnpm start
```

## 🧪 Testing Checklist
- [ ] Login dengan akun admin
- [ ] Akses dashboard
- [ ] CRUD Peserta
- [ ] CRUD Program
- [ ] CRUD Pendaftar
- [ ] Logout
- [ ] Akses dashboard setelah logout (harus redirect ke login)
- [ ] Login kembali

## 📝 Catatan Penting

1. **Environment Variables**: Jangan commit `.env.local` ke git
2. **Firebase Rules**: Pastikan sudah di-update sebelum production
3. **Admin UID**: Untuk security lebih ketat, update rules admin dengan UID spesifik
4. **Session Duration**: Saat ini 2 jam (bisa diubah di `AuthContext.tsx`)

## 📊 Routes Summary

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Homepage |
| `/login` | Public | Login page |
| `/daftar` | Public | Registration form |
| `/paket` | Public | Package list |
| `/paket/[slug]` | Public | Package detail |
| `/admin/dashboard` | Protected | Admin dashboard |
| `/admin/peserta` | Protected | Peserta management |
| `/admin/program` | Protected | Program management |
| `/admin/pendaftar` | Protected | Registration management |
| `/admin/kontrak` | Protected | Contract management |
| `/admin/krs` | Protected | KRS management |
