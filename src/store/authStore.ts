import type { User } from 'firebase/auth';
import { create } from 'zustand';

import type { AppUser } from '../types';

type AuthState = {
  firebaseUser: User | null;
  profile: AppUser | null;
  isInitializing: boolean;
  setAuthState: (firebaseUser: User | null, profile: AppUser | null) => void;
  setInitializing: (isInitializing: boolean) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  profile: null,
  isInitializing: true,
  setAuthState: (firebaseUser, profile) => set({ firebaseUser, profile, isInitializing: false }),
  setInitializing: (isInitializing) => set({ isInitializing }),
  clear: () => set({ firebaseUser: null, profile: null, isInitializing: false }),
}));
