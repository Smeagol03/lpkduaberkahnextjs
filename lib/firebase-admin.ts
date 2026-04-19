import * as admin from 'firebase-admin';

/**
 * Inisialisasi Firebase Admin SDK.
 * Digunakan hanya di sisi server (API Routes / Server Actions).
 * Tidak memerlukan file JSON jika kita menggunakan Environment Variables.
 */

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Kita perlu mengganti literal \n dengan karakter newline asli
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error: any) {
    console.error('Firebase Admin initialization error', error.stack);
  }
}

export const adminDb = admin.database();
export const adminAuth = admin.auth();
