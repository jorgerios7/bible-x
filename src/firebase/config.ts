import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  type Auth,
} from 'firebase/auth';
import * as FirebaseAuth from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const requireEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing required Firebase environment variable: ${name}`);
  }

  return value;
};

const firebaseConfig = {
  apiKey: requireEnv(process.env.EXPO_PUBLIC_FIREBASE_API_KEY, 'EXPO_PUBLIC_FIREBASE_API_KEY'),
  authDomain: requireEnv(process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN, 'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN'),
  projectId: requireEnv(process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID, 'EXPO_PUBLIC_FIREBASE_PROJECT_ID'),
  storageBucket: requireEnv(process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET, 'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: requireEnv(
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  ),
  appId: requireEnv(process.env.EXPO_PUBLIC_FIREBASE_APP_ID, 'EXPO_PUBLIC_FIREBASE_APP_ID'),
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

type ReactNativePersistenceFactory = (
  storage: typeof ReactNativeAsyncStorage,
) => NonNullable<Parameters<typeof initializeAuth>[1]>['persistence'];

const getReactNativePersistence = (
  FirebaseAuth as typeof FirebaseAuth & {
    getReactNativePersistence: ReactNativePersistenceFactory;
  }
).getReactNativePersistence;

const createAuth = (): Auth => {
  try {
    return initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch {
    return getAuth(firebaseApp);
  }
};

export const auth = createAuth();
export const db = getFirestore(firebaseApp);
