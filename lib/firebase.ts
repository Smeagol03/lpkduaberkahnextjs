// lib/firebase.ts
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAx0MtM4P-TRSltbW1lZd_QRQRSQL46zHw",
  authDomain: "lpkduaberkah-59a86.firebaseapp.com",
  databaseURL: "https://lpkduaberkah-59a86-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lpkduaberkah-59a86",
  storageBucket: "lpkduaberkah-59a86.firebasestorage.app",
  messagingSenderId: "210265967961",
  appId: "1:210265967961:web:3a2bf936fae3453031d048",
  measurementId: "G-72R1QSVB9T"
};

// Initialize Firebase
console.log('[DEBUG] lib/firebase - Checking existing Firebase apps:', getApps().length);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
console.log('[DEBUG] lib/firebase - Firebase app initialized:', app.name);

// Export services
export const db = getDatabase(app);
export const auth = getAuth(app);
export default app;