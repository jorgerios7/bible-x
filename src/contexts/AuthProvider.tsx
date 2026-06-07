import { PropsWithChildren, useEffect } from 'react';

import { authService } from '../services/firebase/authService';
import { useAuthStore } from '../store/authStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const setInitializing = useAuthStore((state) => state.setInitializing);

  useEffect(() => {
    setInitializing(true);

    return authService.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setAuthState(null, null);
        return;
      }

      const profile = await authService.getProfile(firebaseUser.uid).catch(() => null);
      setAuthState(firebaseUser, profile);
    });
  }, [setAuthState, setInitializing]);

  return children;
};
