import * as admin from 'firebase-admin';

/**
 * Inisialisasi Firebase Admin SDK secara aman.
 */
const initializeFirebaseAdmin = () => {
  if (admin.apps.length > 0) return admin.app();

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Lewati inisialisasi jika sedang build dan kunci tidak lengkap
  if (!projectId || !clientEmail || !privateKey) {
    console.warn('Firebase Admin credentials missing. Skipping initialization (expected during build if local env is incomplete).');
    return null;
  }

  try {
    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  } catch (error: any) {
    console.error('Firebase Admin initialization error:', error.message);
    return null;
  }
};

const app = initializeFirebaseAdmin();

// Export services dengan proteksi (Getter agar tidak diakses saat inisialisasi modul)
export const getAdminDb = () => {
  if (!admin.apps.length) initializeFirebaseAdmin();
  return admin.database();
};

export const getAdminAuth = () => {
  if (!admin.apps.length) initializeFirebaseAdmin();
  return admin.auth();
};

// Legacy exports untuk kompatibilitas, tapi tambahkan pengecekan
export const adminDb = app ? admin.database() : (null as any);
export const adminAuth = app ? admin.auth() : (null as any);
