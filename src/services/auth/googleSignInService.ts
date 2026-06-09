import {
  GoogleSignin,
  isCancelledResponse,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { assertGoogleAuthConfig } from '../../config/googleAuth';

type GoogleAccountToken = {
  idToken: string;
};

let isConfigured = false;

const configureGoogleSignIn = () => {
  if (isConfigured) {
    return;
  }

  const config = assertGoogleAuthConfig();

  GoogleSignin.configure({
    webClientId: config.webClientId,
    iosClientId: config.iosClientId,
    offlineAccess: false,
    scopes: config.scopes,
    profileImageSize: 120,
  });

  isConfigured = true;
};

const mapGoogleSignInError = (error: unknown) => {
  if (!isErrorWithCode(error)) {
    return error instanceof Error ? error.message : 'Não foi possível entrar com Google.';
  }

  if (error.code === statusCodes.IN_PROGRESS) {
    return 'O login com Google já está em andamento.';
  }

  if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    return 'Atualize ou instale o Google Play Services para continuar.';
  }

  if (error.code === statusCodes.SIGN_IN_REQUIRED) {
    return 'Escolha uma conta Google para continuar.';
  }

  return 'Não foi possível entrar com Google. Tente novamente.';
};

export const googleSignInService = {
  async signIn(): Promise<GoogleAccountToken | null> {
    configureGoogleSignIn();

    try {
      if (process.env.EXPO_OS === 'android') {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      }

      const response = await GoogleSignin.signIn();

      if (isCancelledResponse(response)) {
        return null;
      }

      if (!isSuccessResponse(response)) {
        throw new Error('Não foi possível obter os dados da conta Google.');
      }

      const idToken = response.data.idToken ?? (await GoogleSignin.getTokens()).idToken;

      if (!idToken) {
        throw new Error('O Google não retornou um token válido para autenticar no Firebase.');
      }

      return { idToken };
    } catch (error) {
      if (isErrorWithCode(error) && error.code === statusCodes.SIGN_IN_CANCELLED) {
        return null;
      }

      throw new Error(mapGoogleSignInError(error));
    }
  },

  signOut: () => GoogleSignin.signOut().catch(() => null),
};
