import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

/**
 * Handle POST: Pendaftaran Baru (Public + Turnstile)
 */
export async function POST(request: Request) {
  try {
    const { formData, token } = await request.json();

    // Verifikasi Turnstile
    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY; 
    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET_KEY || '',
          response: token,
        }),
      }
    );

    const verification = await verifyResponse.json();
    if (!verification.success) {
      return NextResponse.json({ success: false, error: 'Verifikasi bot gagal.' }, { status: 400 });
    }

    const pendaftarRef = adminDb.ref('pendaftar');
    const newPendaftarRef = pendaftarRef.push();
    await newPendaftarRef.set({
      ...formData,
      tanggalDaftar: new Date().toISOString(),
      statusPendaftaran: 'menunggu'
    });

    return NextResponse.json({ success: true, id: newPendaftarRef.key });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * Handle DELETE: Menghapus Pendaftar (Admin Only)
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: 'ID tidak ditemukan' }, { status: 400 });

    await adminDb.ref(`pendaftar/${id}`).remove();
    return NextResponse.json({ success: true, message: 'Pendaftar berhasil dihapus' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * Handle PUT: Update / Approve Pendaftar (Admin Only)
 */
export async function PUT(request: Request) {
  try {
    const { id, updates, action } = await request.json();

    if (!id) return NextResponse.json({ success: false, error: 'ID tidak ditemukan' }, { status: 400 });

    const pendaftarRef = adminDb.ref(`pendaftar/${id}`);

    if (action === 'approve') {
      // Logika Approve: Update status + Tambah ke Peserta
      const snapshot = await pendaftarRef.get();
      if (!snapshot.exists()) return NextResponse.json({ success: false, error: 'Data tidak ditemukan' }, { status: 404 });

      const pendaftarData = snapshot.val();
      const timestamp = new Date().toISOString();

      // Multi-path update (Atomic)
      const newPesertaId = adminDb.ref('peserta').push().key;
      const multiUpdates: any = {};
      
      multiUpdates[`pendaftar/${id}/statusPendaftaran`] = 'disetujui';
      multiUpdates[`pendaftar/${id}/tanggalDiterima`] = timestamp;
      multiUpdates[`peserta/${newPesertaId}`] = {
        ...pendaftarData,
        id: newPesertaId,
        statusPeserta: 'aktif',
        statusPendaftaran: 'disetujui',
        tanggalDiterima: timestamp
      };

      await adminDb.ref().update(multiUpdates);
      return NextResponse.json({ success: true, message: 'Pendaftar disetujui' });

    } else {
      // Update biasa
      await pendaftarRef.update(updates);
      return NextResponse.json({ success: true, message: 'Pendaftar berhasil diupdate' });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
