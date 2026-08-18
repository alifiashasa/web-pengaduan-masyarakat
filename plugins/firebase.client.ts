import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

function sanitizeEnv(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val
    .trim()
    .replace(/^["']|["']$/g, '')
    .replace(/,$/, '')
    .trim();
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: sanitizeEnv(config.public.firebaseApiKey),
    authDomain: sanitizeEnv(config.public.firebaseAuthDomain),
    projectId: sanitizeEnv(config.public.firebaseProjectId),
    storageBucket: sanitizeEnv(config.public.firebaseStorageBucket),
    messagingSenderId: sanitizeEnv(config.public.firebaseMessagingSenderId),
    appId: sanitizeEnv(config.public.firebaseAppId),
    measurementId: sanitizeEnv(config.public.firebaseMeasurementId),
  };

  // Check if configuration variables are available
  const hasConfig = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

  let auth: any = null;
  let provider: any = null;

  if (hasConfig) {
    try {
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      auth = getAuth(app);
      provider = new GoogleAuthProvider();
    } catch (e) {
      console.error('Failed to initialize Firebase:', e);
    }
  } else {
    console.warn(
      'Firebase credentials are not configured. Google Sign-In will not be functional. ' +
        'Please set VITE_FIREBASE_API_KEY and other Firebase variables in your .env file.'
    );
  }

  return {
    provide: {
      firebaseAuth: auth,
      firebaseGoogleProvider: provider,
    },
  };
});
