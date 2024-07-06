'use server'

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const initializeFirebaseApp = async () => {
  try {
    const createdApps = getApps();
    let app;

    if (createdApps.length === 0) {
      app = initializeApp({
        credential: cert(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CONFIG || '{}'))
      });
    } else {
      app = createdApps[0];
    }

    const db = getFirestore(app);
    return db;
  } catch (error) {
    console.error('Error initializing Firebase app:', error);
    throw error;
  }
};

export default initializeFirebaseApp;