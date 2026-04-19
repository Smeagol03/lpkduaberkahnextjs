import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

/**
 * API Route untuk menangani pendaftaran dengan verifikasi Cloudflare Turnstile.
 * Menggunakan Firebase Admin SDK agar bisa menulis ke DB meskipun rules .write: false.
 */
export async function POST(request: Request) {
  try {
    const { formData, token } = await request.json();

    // 1. Verifikasi Token Turnstile ke Cloudflare
    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY; 

    if (!TURNSTILE_SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: 'Konfigurasi server (Turnstile) tidak lengkap.' },
        { status: 500 }
      );
    }

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const verification = await verifyResponse.json();

    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: 'Verifikasi keamanan (Turnstile) gagal.' },
        { status: 400 }
      );
    }

    // 2. Jika verifikasi sukses, simpan data ke Firebase menggunakan ADMIN SDK
    const pendaftarRef = adminDb.ref('pendaftar');
    const newPendaftarRef = pendaftarRef.push();
    
    const pendaftarWithDate = {
      ...formData,
      tanggalDaftar: new Date().toISOString(),
      statusPendaftaran: 'menunggu'
    };

    await newPendaftarRef.set(pendaftarWithDate);

    return NextResponse.json({ 
      success: true, 
      id: newPendaftarRef.key,
      message: 'Pendaftaran berhasil disimpan via Admin SDK' 
    });

  } catch (error: any) {
    console.error('API Daftar (Admin) Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan internal pada server: ' + error.message },
      { status: 500 }
    );
  }
}
