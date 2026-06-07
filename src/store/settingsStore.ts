import { create } from 'zustand';

type SettingsState = {
  fontScale: number;
  notificationsEnabled: boolean;
  semanticSearchEnabled: boolean;
  setFontScale: (fontScale: number) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setSemanticSearchEnabled: (enabled: boolean) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  fontScale: 1,
  notificationsEnabled: true,
  semanticSearchEnabled: true,
  setFontScale: (fontScale) => set({ fontScale }),
  setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
  setSemanticSearchEnabled: (semanticSearchEnabled) => set({ semanticSearchEnabled }),
}));
