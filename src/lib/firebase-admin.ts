import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Firebase Admin SDK configuration
const getPrivateKey = () => {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  if (!key) return undefined;
  
  // Handle both escaped newlines and actual newlines
  return key.replace(/\\n/g, '\n');
};

const serviceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: getPrivateKey(),
};

let adminApp: App | null = null;
let adminAuthInstance: ReturnType<typeof getAuth> | null = null;

// Only initialize on server side
if (typeof window === 'undefined') {
  try {
    // Check if all required fields are present
    if (serviceAccount.projectId && serviceAccount.clientEmail && serviceAccount.privateKey) {
      if (getApps().length === 0) {
        adminApp = initializeApp({
          credential: cert({
            projectId: serviceAccount.projectId,
            clientEmail: serviceAccount.clientEmail,
            privateKey: serviceAccount.privateKey,
          }),
          projectId: serviceAccount.projectId,
        });
      } else {
        adminApp = getApps()[0];
      }
      
      if (adminApp) {
        adminAuthInstance = getAuth(adminApp);
      }
    } else {
      console.warn('Firebase Admin SDK not initialized: Missing required environment variables');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export const adminAuth = adminAuthInstance;
export { adminApp };
