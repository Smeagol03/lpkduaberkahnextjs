# 🚀 Quick Deploy Guide - LPK Dua Berkah

## ⚡ Ringkasan Cepat (5 Menit)

---

## 🎯 Rekomendasi: **Opsi CNAME (Hybrid)**

**Kenapa?** Email hosting tetap di Hostinger, tidak perlu migrasi DNS ribet!

---

## 📋 Step-by-Step Cepat

### **1. Deploy ke Vercel**

```bash
# Install Vercel CLI (jika belum)
npm install -g vercel

# Login
vercel login

# Deploy
cd /home/alpiant/Dokumen/websites/lpkduaberkahnextjs
vercel --prod
```

### **2. Setup Domain di Vercel**

```
1. Buka: https://vercel.com/dashboard
2. Pilih project: lpkduaberkahnextjs
3. Settings → Domains
4. Add Domain: www.lpkduaberkah.com
5. Verify (tunggu 1-2 menit)
```

### **3. Update DNS di Hostinger**

```
1. Login: https://hpanel.hostinger.com
2. Advanced → DNS Zone Editor
3. Edit/Add records:

   Record 1:
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 14400

   Record 2:
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 14400

4. Save Changes
```

### **4. Setup Redirect (Optional)**

```
Di Vercel:
1. Settings → Domains
2. Add Domain: lpkduaberkah.com
3. Pilih: "Redirect to www.lpkduaberkah.com"
```

### **5. Done! ✅**

```
Tunggu propagasi DNS: 1-24 jam

Cek:
✅ https://www.lpkduaberkah.com
✅ Email masih jalan (harlinlpkb@gmail.com)
✅ Admin panel: https://www.lpkduaberkah.com/admin
```

---

## 🔑 DNS Records (Copy-Paste)

### **Hostinger DNS Zone Editor:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 14400 |
| CNAME | www | cname.vercel-dns.com | 14400 |

**BIARKAN YANG LAIN (MX, TXT) TETAP!**

---

## ✅ Checklist

```
□ Deploy ke Vercel berhasil
□ Domain www.lpkduaberkah.com added di Vercel
□ DNS records updated di Hostinger
□ SSL certificate active (tunggu 5-10 menit)
□ Website bisa diakses: https://www.lpkduaberkah.com
□ Email masih bisa kirim/terima
□ Admin panel bisa diakses
□ Forms pendaftaran jalan
```

---

## 🐛 Troubleshooting Cepat

### **Website 404**
```bash
# Redeploy
vercel --prod
```

### **SSL Not Ready**
```
Tunggu 5-10 menit, Vercel auto-generate SSL
```

### **Email Tidak Jalan**
```
Cek MX records masih pointing ke Hostinger!
Type: MX
Name: @
Value: mail.lpkduaberkah.com
Priority: 10
```

### **DNS Belum Propagasi**
```
Cek: https://dnschecker.org/#A/lpkduaberkah.com
Tunggu max 24 jam
```

---

## 📞 Need Help?

### **Dokumentasi Lengkap:**
- `docs/DEPLOYMENT_DNS_GUIDE.md` - Panduan detail DNS & Deployment
- `docs/FIREBASE_SETUP.md` - Firebase security setup
- `docs/SECURITY_IMPLEMENTATION.md` - Security details

### **Vercel:**
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs

### **Hostinger:**
- hPanel: https://hpanel.hostinger.com
- Live Chat: 24/7 support

---

## 🎉 Done!

Website LPK Dua Berkah sekarang online di Vercel dengan:
- ✅ CDN global (cepat di seluruh dunia)
- ✅ Auto SSL (HTTPS otomatis)
- ✅ Auto deploy dari Git
- ✅ Email tetap di Hostinger
- ✅ Admin panel aman dengan proxy protection

**URL:**
- Public: https://www.lpkduaberkah.com
- Admin: https://www.lpkduaberkah.com/admin

---

**Last Updated:** March 9, 2026
