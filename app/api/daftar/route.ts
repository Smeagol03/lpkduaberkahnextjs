import { NextResponse } from 'next/server';
import { addPendaftar } from '@/services/pendaftarService';

/**
 * API Route untuk menangani pendaftaran dengan verifikasi Cloudflare Turnstile.
 * Berjalan di sisi server (Vercel) sehingga Secret Key aman.
 */
export async function POST(request: Request) {
  try {
    const { formData, token } = await request.json();

    // 1. Verifikasi Token Turnstile ke Cloudflare
    // Mengambil Secret Key dari environment variable agar aman
    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY; 

    if (!TURNSTILE_SECRET_KEY) {
      console.error('Missing TURNSTILE_SECRET_KEY in environment variables');
      return NextResponse.json(
        { success: false, error: 'Konfigurasi server tidak lengkap.' },
        { status: 500 }
      );
    }

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const verification = await verifyResponse.json();

    if (!verification.success) {
      return NextResponse.json(
        { success: false, error: 'Verifikasi keamanan gagal. Silakan coba lagi.' },
        { status: 400 }
      );
    }

    // 2. Jika verifikasi sukses, simpan data ke Firebase menggunakan service yang ada
    // Kita memanggil addPendaftar di sisi server sekarang
    const result = await addPendaftar(formData);

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Gagal menyimpan data ke database' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('API Daftar Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan internal pada server' },
      { status: 500 }
    );
  }
}
