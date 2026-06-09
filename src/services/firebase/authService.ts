import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase/config';
import type { AppUser } from '../../types';
import { nowIso } from '../../utils/date';
import { isValidEmail, sanitizeText } from '../../utils/sanitize';

const defaultStats = {
  readingStreak: 0,
  chaptersRead: 0,
  minutesStudied: 0,
  favoriteCount: 0,
};

const createProfile = async (user: User, name: string): Promise<AppUser> => {
  const profile: AppUser = {
    id: user.uid,
    name: sanitizeText(name),
    email: user.email ?? '',
    createdAt: nowIso(),
    stats: { ...defaultStats },
  };

  await setDoc(doc(db, 'users', user.uid), profile, { merge: true });

  return profile;
};

const getProfile = async (userId: string): Promise<AppUser | null> => {
  const snapshot = await getDoc(doc(db, 'users', userId));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as AppUser;
};

const getProfileName = (user: User) => {
  const fallbackFromEmail = user.email?.split('@')[0] ?? '';
  return sanitizeText(user.displayName ?? fallbackFromEmail) || 'Usuário Bible X';
};

const ensureProfile = async (user: User) => {
  const existingProfile = await getProfile(user.uid);

  if (existingProfile) {
    return existingProfile;
  }

  return createProfile(user, getProfileName(user));
};

const mapAuthError = (error: unknown) => {
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';

  if (code.includes('invalid-credential')) return 'Email ou senha inválidos.';
  if (code.includes('email-already-in-use')) return 'Este email já está cadastrado.';
  if (code.includes('weak-password')) return 'Use uma senha com pelo menos 6 caracteres.';
  if (code.includes('too-many-requests')) return 'Muitas tentativas. Tente novamente em alguns minutos.';
  if (code.includes('account-exists-with-different-credential')) {
    return 'Este email já está vinculado a outro método de login.';
  }
  if (code.includes('operation-not-allowed')) {
    return 'Ative o provedor Google no Firebase Authentication.';
  }

  return 'Não foi possível concluir a ação. Verifique os dados e tente novamente.';
};

export const authService = {
  onAuthStateChanged: (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback),

  getProfile,

  async signIn(email: string, password: string) {
    if (!isValidEmail(email)) {
      throw new Error('Informe um email válido.');
    }

    try {
      return await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      throw new Error(mapAuthError(error));
    }
  },

  async signUp(name: string, email: string, password: string) {
    if (sanitizeText(name).length < 2) {
      throw new Error('Informe seu nome.');
    }

    if (!isValidEmail(email)) {
      throw new Error('Informe um email válido.');
    }

    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: sanitizeText(name) });
      await createProfile(credential.user, name);

      return credential;
    } catch (error) {
      throw new Error(mapAuthError(error));
    }
  },

  async resetPassword(email: string) {
    if (!isValidEmail(email)) {
      throw new Error('Informe um email válido.');
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (error) {
      throw new Error(mapAuthError(error));
    }
  },

  async signInWithGoogleIdToken(idToken: string) {
    if (!idToken) {
      throw new Error('Token Google inválido.');
    }

    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      await ensureProfile(userCredential.user);

      return userCredential;
    } catch (error) {
      throw new Error(mapAuthError(error));
    }
  },

  signOut: () => signOut(auth),
};
