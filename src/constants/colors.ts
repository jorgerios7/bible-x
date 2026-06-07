export const colors = {
  primary: '#1E88FF',
  secondary: '#7A5CFF',
  accentOrange: '#FF9B2F',
  accentRed: '#FF4D5A',
  success: '#22C55E',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceSoft: '#26364D',
  border: '#334155',
  textPrimary: '#FFFFFF',
  textSecondary: '#CBD5E1',
  textDisabled: '#64748B',
  overlay: 'rgba(15, 23, 42, 0.72)',
  glass: 'rgba(30, 41, 59, 0.72)',
  glassBorder: 'rgba(203, 213, 225, 0.14)',
  gradient: ['#1E88FF', '#7A5CFF', '#FF4D5A'] as const,
  chart: ['#1E88FF', '#7A5CFF', '#FF9B2F', '#FF4D5A', '#22C55E'] as const,
};

export type AppColor = keyof typeof colors;
