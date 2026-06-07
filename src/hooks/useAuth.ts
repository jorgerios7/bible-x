import { useState } from 'react';

import { authService } from '../services/firebase/authService';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { firebaseUser, profile, isInitializing } = useAuthStore();
  const [isSubmitting, setSubmitting] = useState(false);

  const run = async (action: () => Promise<unknown>) => {
    setSubmitting(true);

    try {
      await action();
    } finally {
      setSubmitting(false);
    }
  };

  return {
    firebaseUser,
    profile,
    isAuthenticated: Boolean(firebaseUser),
    isInitializing,
    isSubmitting,
    signIn: (email: string, password: string) => run(() => authService.signIn(email, password)),
    signUp: (name: string, email: string, password: string) =>
      run(() => authService.signUp(name, email, password)),
    resetPassword: (email: string) => run(() => authService.resetPassword(email)),
    signOut: authService.signOut,
  };
};
