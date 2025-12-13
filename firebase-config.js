import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// Firebase Configuration
// Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyCTL6KFc45icS6fuZiQ9XpBpHU8SJbKtOo",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "cash-flow-app-46893.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "cash-flow-app-46893",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "cash-flow-app-46893.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "941640320942",
  appId: process.env.FIREBASE_APP_ID || "1:941640320942:web:740e0f2560bbf0d8dfaa3f",
  databaseURL: process.env.FIREBASE_DATABASE_URL || "https://cash-flow-app-46893.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDb = getDatabase(app);

export default app;
