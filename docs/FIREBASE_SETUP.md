# 🔐 Panduan Setup Firebase Security & Admin Authentication

Panduan lengkap untuk mengamankan aplikasi LPK Dua Berkah dengan Firebase Security Rules dan Next.js Middleware.

---

## 📋 Daftar Isi

1. [Prerequisites](#prerequisites)
2. [Setup Firebase Security Rules](#setup-firebase-security-rules)
3. [Setup Admin Authentication](#setup-admin-authentication)
4. [Konfigurasi Session & Middleware](#konfigurasi-session--middleware)
5. [Testing & Verifikasi](#testing--verifikasi)
6. [Troubleshooting](#troubleshooting)

---

## 📌 Prerequisites

Sebelum memulai, pastikan Anda sudah memiliki:

- ✅ Firebase project (`lpkduaberkah-59a86`)
- ✅ Firebase Realtime Database sudah aktif
- ✅ Firebase Authentication sudah enabled (Email/Password)
- ✅ Node.js >= 18
- ✅ Akses ke Firebase Console

---

## 🔒 Setup Firebase Security Rules

### Langkah 1: Buka Firebase Console

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project **lpkduaberkah-59a86**
3. Navigasi ke **Build** → **Realtime Database**
4. Klik tab **Rules**

### Langkah 2: Copy Security Rules

Copy rules dari file `firebase-security-rules.json` di root project:

```json
{
  "rules": {
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
    "krs": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "pendaftar": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "paket": {
      ".read": "true",
      ".write": "auth != null"
    },
    "admin": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Langkah 3: Publish Rules

1. Paste rules ke Firebase Console
2. Klik **Publish**
3. ✅ Security rules aktif!

### 📝 Penjelasan Rules

| Collection | Read | Write | Keterangan |
|------------|------|-------|------------|
| `peserta` | 🔐 Auth required | 🔐 Auth required | Data peserta hanya untuk admin |
| `program` | 🔐 Auth required | 🔐 Auth required | Data program/kontrak |
| `kontrak` | 🔐 Auth required | 🔐 Auth required | Data kontrak |
| `krs` | 🔐 Auth required | 🔐 Auth required | Data KRS |
| `pendaftar` | 🔐 Auth required | 🔐 Auth required | Data pendaftar |
| `paket` | 🌐 Public | 🔐 Auth required | Paket bisa dibaca publik (untuk website) |
| `admin` | 🔐 Auth required | 🔐 Auth required | Data admin |

---

## 👤 Setup Admin Authentication

### Langkah 1: Buat Admin User di Firebase

1. Buka Firebase Console
2. Navigasi ke **Build** → **Authentication**
3. Klik tab **Users**
4. Klik **Add User**
5. Isi data:
   - **Email**: `admin@lpkduaberkah.com` (atau email admin Anda)
   - **Password**: `[PASSWORD KUAT]`
6. Klik **Add User**

### Langkah 2: Catat UID Admin

1. Setelah user dibuat, **copy UID** user tersebut
2. Simpan UID untuk langkah selanjutnya

### Langkah 3: Update Security Rules (Optional - Untuk Multi-Admin)

Jika ingin membatasi hanya UID tertentu yang bisa akses data admin:

```json
"admin": {
  ".read": "auth != null && auth.uid === 'UID_ADMIN_ANDA_DISINI'",
  ".write": "auth != null && auth.uid === 'UID_ADMIN_ANDA_DISINI'"
}
```

---

## 🔐 Konfigurasi Session & Middleware

### Langkah 1: Middleware Sudah Aktif

File `middleware.ts` sudah dibuat di root project dengan fitur:

- ✅ Proteksi route `/admin/*`
- ✅ Session cookie-based
- ✅ Auto redirect ke login jika tidak authenticated
- ✅ Session timeout 24 jam
- ✅ Redirect ke dashboard jika sudah login saat akses `/admin/login`

### Langkah 2: Update Login untuk Set Cookie

Update file `app/admin/login/page.tsx` untuk set cookie setelah login sukses:

```typescript
// Setelah signInWithEmailAndPassword berhasil
import { cookies } from 'next/headers';

// Di dalam handleSubmit, setelah login sukses:
const sessionData = {
  uid: result.user.uid,
  email: result.user.email,
  timestamp: Date.now()
};

// Set cookie (gunakan Server Action atau API route)
const response = NextResponse.redirect(new URL('/admin/dashboard', request.url));
response.cookies.set('adminSession', encodeURIComponent(JSON.stringify(sessionData)), {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 86400, // 24 jam
  path: '/'
});
```

### Langkah 3: Update Logout untuk Clear Cookie

Update fungsi logout di `services/authService.ts`:

```typescript
export const logoutAdmin = async (): Promise<void> => {
  try {
    await signOut(auth);
    localStorage.removeItem('adminUser');
    // Clear cookie akan dihandle oleh middleware
  } catch (error: any) {
    throw new Error(error.message || 'Terjadi kesalahan saat logout');
  }
};
```

---

## ✅ Testing & Verifikasi

### Test 1: Akses Admin Tanpa Login

1. Buka browser dalam mode Incognito
2. Akses `https://lpkduaberkah.com/admin/dashboard`
3. ✅ Should redirect ke `/admin/login`

### Test 2: Login dengan Kredensial Benar

1. Akses `/admin/login`
2. Login dengan email & password admin
3. ✅ Should redirect ke `/admin/dashboard`
4. ✅ Cookie `adminSession` terbuat di browser

### Test 3: Session Timeout

1. Login berhasil
2. Tunggu 24 jam (atau ubah `SESSION_DURATION` di middleware untuk testing)
3. Refresh halaman
4. ✅ Should redirect ke login (session expired)

### Test 4: Firebase Security Rules

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Navigasi ke **Realtime Database** → **Data**
3. Coba akses data tanpa auth (via REST API)
4. ✅ Should get permission denied

---

## 🐛 Troubleshooting

### Error: "Middleware not working"

**Solusi:**
```bash
# Restart development server
pnpm dev

# Clear .next cache
rm -rf .next
pnpm dev
```

### Error: "Cookie not set"

**Penyebab:** Middleware tidak bisa set cookie langsung.

**Solusi:** Gunakan Server Action atau API Route untuk set cookie:

```typescript
// app/api/auth/session/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { uid, email } = await request.json();
  
  const response = NextResponse.json({ success: true });
  response.cookies.set('adminSession', encodeURIComponent(JSON.stringify({
    uid,
    email,
    timestamp: Date.now()
  })), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400,
    path: '/'
  });
  
  return response;
}
```

### Error: "Firebase permission denied"

**Penyebab:** Security rules terlalu ketat atau user belum authenticated.

**Solusi:**
1. Pastikan user sudah login di Firebase Auth
2. Check Firebase Console → Realtime Database → Rules
3. Pastikan rules sudah published
4. Test dengan rules temporary untuk development:

```json
{
  "rules": {
    ".read": "auth != null || true",  // ONLY FOR TESTING!
    ".write": "auth != null"
  }
}
```

### Error: "Session expired too fast"

**Solusi:** Update `SESSION_DURATION` di `middleware.ts`:

```typescript
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 hari
```

---

## 📊 Monitoring & Audit

### Check Active Sessions

Untuk melihat siapa yang sedang login, tambahkan logging di dashboard:

```typescript
// app/admin/dashboard/page.tsx
useEffect(() => {
  const session = localStorage.getItem('adminUser');
  if (session) {
    console.log('Active session:', JSON.parse(session));
  }
}, []);
```

### Firebase Usage Dashboard

1. Buka Firebase Console
2. **Build** → **Usage**
3. Monitor database reads/writes
4. Set budget alerts jika perlu

---

## 🎯 Best Practices

### ✅ DO

- Gunakan password kuat untuk admin (min. 12 karakter)
- Enable 2FA untuk Firebase account
- Backup security rules secara berkala
- Monitor Firebase Usage secara rutin
- Update session timeout sesuai kebutuhan

### ❌ DON'T

- Jangan commit credentials ke Git
- Jangan gunakan `".read": true` untuk data sensitif
- Jangan simpan session data di localStorage saja
- Jangan skip testing security rules

---

## 📞 Support

Jika ada masalah:

1. Check [Firebase Documentation](https://firebase.google.com/docs)
2. Check [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
3. Review Firebase Console logs
4. Check browser console untuk error messages

---

## 📝 Checklist Implementasi

- [ ] Firebase Security Rules dipublish
- [ ] Admin user dibuat di Firebase Auth
- [ ] UID admin dicatat (untuk multi-admin setup)
- [ ] Middleware.ts aktif dan berfungsi
- [ ] Login flow set cookie dengan benar
- [ ] Logout flow clear cookie
- [ ] Testing akses tanpa login (should redirect)
- [ ] Testing session timeout
- [ ] Testing Firebase rules (permission denied untuk unauth)
- [ ] Monitoring Firebase Usage

---

**Last Updated:** March 9, 2026  
**Version:** 1.0.0  
**Project:** LPK Dua Berkah Next.js

---

## 📚 Related Documentation

- [DEPLOYMENT_DNS_GUIDE.md](./DEPLOYMENT_DNS_GUIDE.md) - Panduan DNS & Deployment ke Vercel/Hostinger
- [SECURITY_IMPLEMENTATION.md](./SECURITY_IMPLEMENTATION.md) - Security implementation details
