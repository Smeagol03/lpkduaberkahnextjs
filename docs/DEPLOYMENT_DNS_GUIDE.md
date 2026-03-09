# 🌐 Panduan DNS & Deployment - LPK Dua Berkah

## ⚠️ PENTING: Pertimbangan DNS Sebelum Deploy ke Vercel

---

## 📋 Daftar Isi

1. [Perbedaan DNS Hostinger vs Vercel](#perbedaan-dns-hostinger-vs-vercel)
2. [Opsi Deployment](#opsi-deployment)
3. [Opsi 1: Pakai Vercel Nameserver (Recommended)](#opsi-1-pakai-vercel-nameserver)
4. [Opsi 2: Pakai CNAME (Email Tetap di Hostinger)](#opsi-2-pakai-cname-email-tetap-di-hostinger)
5. [Checklist Migrasi](#checklist-migrasi)
6. [Troubleshooting](#troubleshooting)

---

## 🔄 Perbedaan DNS Hostinger vs Vercel

### **Saat Ini (Hostinger):**

```
┌─────────────────────────────────────────┐
│         Hostinger Nameservers           │
│  ns1.dns-parking.com                    │
│  ns2.dns-parking.com                    │
├─────────────────────────────────────────┤
│  DNS Records:                           │
│  @ → A → 192.0.2.1 (Hostinger IP)       │
│  www → CNAME → lpkduaberkah.com         │
│  mail → A → 192.0.2.1                   │
│  MX → mail.lpkduaberkah.com             │
│  TXT → SPF, DKIM, etc.                  │
└─────────────────────────────────────────┘
```

### **Setelah Pakai Vercel Nameserver:**

```
┌─────────────────────────────────────────┐
│          Vercel Nameservers             │
│  ns1.vercel-dns.com                     │
│  ns2.vercel-dns.com                     │
├─────────────────────────────────────────┤
│  DNS Records:                           │
│  @ → A → 76.76.21.21 (Vercel IP)        │
│  www → CNAME → cname.vercel-dns.com     │
│  mail → A → 192.0.2.1 (Hostinger IP) ⚠️│
│  MX → mail.lpkduaberkah.com ⚠️          │
│  TXT → SPF, DKIM, etc. ⚠️               │
└─────────────────────────────────────────┘
```

---

## 🎯 Opsi Deployment

### **Opsi 1: Pakai Vercel Nameserver (FULL Migration)**

**Keuntungan:**
- ✅ Setup paling mudah
- ✅ Semua fitur Vercel tersedia
- ✅ Auto SSL certificate
- ✅ CDN global otomatis

**Kerugian:**
- ⚠️ **SEMUA DNS harus dipindah ke Vercel**
- ⚠️ Email hosting harus dikonfigurasi ulang
- ⚠️ Subdomain harus dibuat manual di Vercel

**Cocok untuk:**
- ✅ Website baru (belum ada email)
- ✅ Email pakai Google Workspace / Zoho
- ✅ Tidak ada subdomain kompleks

---

### **Opsi 2: Pakai CNAME (Hybrid - RECOMMENDED)**

**Keuntungan:**
- ✅ **Email tetap di Hostinger**
- ✅ DNS management tetap di Hostinger
- ✅ Website dapat benefit Vercel CDN

**Kerugian:**
- ⚠️ Setup sedikit lebih kompleks
- ⚠️ Tidak bisa pakai root domain (@) langsung
- ⚠️ Perlu redirect www → Vercel

**Cocok untuk:**
- ✅ **Website yang sudah ada email aktif**
- ✅ Ingin keep Hostinger email hosting
- ✅ Tidak mau ribet migrasi DNS

---

## 📖 Opsi 1: Pakai Vercel Nameserver

### **Step 1: Catat Semua DNS Records di Hostinger**

Sebelum migrasi, **SCREENSHOT atau CATAT** semua DNS records:

```
Login ke Hostinger → Advanced → DNS Zone Editor

Catat:
□ A records (@, www, mail, dll)
□ CNAME records
□ MX records (email)
□ TXT records (SPF, DKIM, verification)
□ SRV records (jika ada)
□ AAAA records (IPv6)
```

### **Step 2: Setup Domain di Vercel**

```
1. Vercel Dashboard → Project Settings → Domains
2. Add Domain: lpkduaberkah.com
3. Vercel akan show nameservers:
   - ns1.vercel-dns.com
   - ns2.vercel-dns.com
```

### **Step 3: Update Nameserver di Hostinger**

```
1. Login Hostinger → Domains
2. Pilih domain lpkduaberkah.com
3. Klik "Change Nameservers"
4. Pilih "Use custom nameservers"
5. Input:
   ns1.vercel-dns.com
   ns2.vercel-dns.com
6. Save
```

### **Step 4: Recreate DNS Records di Vercel**

```
Vercel Dashboard → Settings → Domains → DNS Records

Add records yang sudah dicatat:

1. Email (MX):
   Type: MX
   Name: @
   Value: mail.lpkduaberkah.com
   Priority: 10

2. Mail Server (A):
   Type: A
   Name: mail
   Value: [IP Hostinger Anda]

3. SPF Record (TXT):
   Type: TXT
   Name: @
   Value: v=spf1 include:spf.hostinger.com ~all

4. DKIM (TXT):
   Type: TXT
   Name: default._domainkey
   Value: [DKIM key dari Hostinger]

5. Subdomain (jika ada):
   Type: A atau CNAME
   Name: [subdomain]
   Value: [target]
```

### **Step 5: Tunggu Propagasi DNS**

```
⏱️ Waktu: 1-48 jam (biasanya 4-12 jam)

Cek propagasi:
https://dnschecker.org/#NS/lpkduaberkah.com
```

---

## 📖 Opsi 2: Pakai CNAME (Email Tetap di Hostinger)

### **Keuntungan Utama:**

```
✅ Email hosting TETAP di Hostinger
✅ DNS management TETAP di Hostinger
✅ Website dapat benefit Vercel CDN
✅ Tidak perlu migrasi DNS records
✅ Bisa rollback mudah
```

### **Setup:**

#### **Step 1: Deploy ke Vercel**

```bash
# Deploy seperti biasa
vercel --prod
```

#### **Step 2: Setup Domain di Vercel**

```
Vercel Dashboard → Project Settings → Domains

Add Domain: www.lpkduaberkah.com (PAKAI www)
```

#### **Step 3: Update DNS di Hostinger**

```
Login Hostinger → DNS Zone Editor

Tambah/Edit records:

1. www → CNAME → cname.vercel-dns.com
2. @ → A → [Vercel IP: 76.76.21.21]

Biarkan lainnya (MX, TXT, dll) TETAP di Hostinger
```

#### **Step 4: Setup Redirect (Optional)**

Agar `lpkduaberkah.com` (tanpa www) redirect ke `www.lpkduaberkah.com`:

**Di Vercel:**
```
Project Settings → Domains
Add Domain: lpkduaberkah.com
Pilih: "Redirect to www.lpkduaberkah.com"
```

**Di Hostinger (alternative):**
```
Hosting → Website → Redirects
Add Redirect:
From: https://lpkduaberkah.com
To: https://www.lpkduaberkah.com
Type: 301 (Permanent)
```

### **DNS Configuration Final:**

```
┌─────────────────────────────────────────┐
│         Hostinger Nameservers           │
│  (DNS Management tetap di sini)         │
├─────────────────────────────────────────┤
│  DNS Records:                           │
│  @ → A → 76.76.21.21 (Vercel) ✅        │
│  www → CNAME → cname.vercel-dns.com ✅  │
│  mail → A → 192.0.2.1 (Hostinger) ✅    │
│  MX → mail.lpkduaberkah.com ✅          │
│  TXT → SPF, DKIM (Hostinger) ✅         │
└─────────────────────────────────────────┘
```

---

## ✅ Checklist Migrasi

### **Sebelum Deploy:**

```
□ Backup semua DNS records (screenshot/export)
□ Catat email accounts yang aktif
□ Test email kirim/terima
□ Catat subdomain yang aktif
□ Backup website files (FTP)
□ Export database (jika ada)
```

### **Saat Deploy:**

```
□ Deploy ke Vercel
□ Setup domain di Vercel
□ Update DNS records
□ Verify SSL certificate
□ Test website (https)
□ Test email (kirim/terima)
```

### **Setelah Deploy:**

```
□ Cek website loading speed
□ Test semua pages
□ Test forms (pendaftaran)
□ Test admin panel
□ Cek email masih jalan
□ Update Google Search Console
□ Update Google Analytics (jika perlu)
```

---

## 🔧 Troubleshooting

### **Email Tidak Jalan Setelah Migrasi**

**Problem:** Email tidak bisa kirim/terima setelah pindah nameserver.

**Solution:**
```
1. Cek MX records di Vercel DNS
2. Pastikan MX pointing ke Hostinger mail server
3. Cek SPF record: v=spf1 include:spf.hostinger.com ~all
4. Cek DKIM record (default._domainkey)
5. Tunggu propagasi DNS (max 48 jam)
```

### **Website 404 di Vercel**

**Problem:** Domain sudah connect tapi 404.

**Solution:**
```
1. Cek domain sudah verified di Vercel
2. Cek build successful
3. Redeploy: vercel --prod
4. Clear browser cache
5. Cek DNS propagation: dnschecker.org
```

### **SSL Certificate Error**

**Problem:** Browser show "Not Secure" warning.

**Solution:**
```
1. Vercel auto-generate SSL (tunggu 5-10 menit)
2. Force HTTPS di Vercel Settings
3. Clear browser cache
4. Cek domain verification
```

### **Subdomain Tidak Jalan**

**Problem:** admin.lpkduaberkah.com tidak connect.

**Solution:**
```
1. Add subdomain di Vercel Domains
2. Add CNAME di DNS: admin → cname.vercel-dns.com
3. Atau A record: admin → 76.76.21.21
4. Tunggu propagasi
```

---

## 📊 Perbandingan Opsi

| Fitur | Vercel Nameserver | CNAME (Hybrid) |
|-------|-------------------|----------------|
| **Setup Difficulty** | ⭐⭐⭐⭐⭐ (Easy) | ⭐⭐⭐⭐ (Medium) |
| **Email Hosting** | ⚠️ Harus migrate | ✅ Tetap Hostinger |
| **DNS Management** | Pindah ke Vercel | Tetap di Hostinger |
| **Subdomain Setup** | Manual di Vercel | Manual di Hostinger |
| **Rollback** | ⚠️ Agak ribet | ✅ Mudah |
| **Features** | 100% Vercel | 95% Vercel |
| **Recommended For** | New sites | Sites with email |

---

## 🎯 Rekomendasi untuk LPK Dua Berkah

### **Pilih Opsi 2 (CNAME/Hybrid) JIKA:**

```
✅ Sudah pakai email Hostinger (harlinlpkb@gmail.com atau custom)
✅ Tidak mau ribet migrasi email
✅ Mau keep DNS management di Hostinger
✅ OK dengan setup www.lpkduaberkah.com
```

### **Pilih Opsi 1 (Full Vercel) JIKA:**

```
✅ Website baru (belum ada email aktif)
✅ Mau pakai Google Workspace / Zoho Email
✅ Ingin setup paling simple
✅ Mau full benefit Vercel features
```

---

## 📞 Kontak Support

### **Vercel Support:**
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/next.js/discussions
- Twitter: @vercel

### **Hostinger Support:**
- Live Chat: 24/7 di dashboard
- Knowledge Base: https://www.hostinger.com/tutorials

---

## 🔗 Referensi

- [Vercel Custom Domains](https://vercel.com/docs/custom-domains)
- [Vercel DNS Guidelines](https://vercel.com/docs/custom-domains#domain-nameservers)
- [Hostinger DNS Management](https://www.hostinger.com/tutorials/dns-zone-editor)
- [DNS Propagation Check](https://dnschecker.org/)

---

**Last Updated:** March 9, 2026  
**Version:** 1.0.0  
**Project:** LPK Dua Berkah Next.js
