import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  type Auth,
} from 'firebase/auth';
import * as FirebaseAuth from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDXs87A6OMMpnABPEHYqL2JP4bZAWNiLmQ',
  authDomain: 'bible-x-698ef.firebaseapp.com',
  projectId: 'bible-x-698ef',
  storageBucket: 'bible-x-698ef.firebasestorage.app',
  messagingSenderId: '579023754349',
  appId: '1:579023754349:android:ca5e277e43368301065b64',
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
