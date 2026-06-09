const readPublicEnv = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed || undefined;
};

export const googleAuthConfig = {
  webClientId: readPublicEnv(process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID),
  iosClientId: readPublicEnv(process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID),
  scopes: ['profile', 'email'],
};

export const assertGoogleAuthConfig = () => {
  if (!googleAuthConfig.webClientId) {
    throw new Error('Configure EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID no .env para ativar o login com Google.');
  }

  return googleAuthConfig;
};
