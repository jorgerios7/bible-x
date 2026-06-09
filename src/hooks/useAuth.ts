import { useState } from 'react';

import { googleSignInService } from '../services/auth/googleSignInService';
import { authService } from '../services/firebase/authService';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { firebaseUser, profile, isInitializing } = useAuthStore();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isGoogleSubmitting, setGoogleSubmitting] = useState(false);

  const run = async (action: () => Promise<unknown>) => {
    setSubmitting(true);

    try {
      await action();
    } finally {
      setSubmitting(false);
    }
  };

  const signInWithGoogle = async () => {
    setGoogleSubmitting(true);

    try {
      const googleAccount = await googleSignInService.signIn();

      if (!googleAccount) {
        return;
      }

      await authService.signInWithGoogleIdToken(googleAccount.idToken);
    } finally {
      setGoogleSubmitting(false);
    }
  };

  const signOut = async () => {
    await googleSignInService.signOut();
    await authService.signOut();
  };

  return {
    firebaseUser,
    profile,
    isAuthenticated: Boolean(firebaseUser),
    isInitializing,
    isSubmitting,
    isGoogleSubmitting,
    signIn: (email: string, password: string) => run(() => authService.signIn(email, password)),
    signUp: (name: string, email: string, password: string) =>
      run(() => authService.signUp(name, email, password)),
    resetPassword: (email: string) => run(() => authService.resetPassword(email)),
    signInWithGoogle,
    signOut,
  };
};
