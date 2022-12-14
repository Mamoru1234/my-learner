import { SettingsEntity } from "../entities/settings.entity";

const USER_SETTINGS_KEY = 'user/settings';

export const settingsRepository = {
  get(): Promise<SettingsEntity | null> {
    const value = localStorage.getItem(USER_SETTINGS_KEY);
    if (!value) {
      return Promise.resolve(null);
    }
    return Promise.resolve(JSON.parse(value));
  },

  save(settings: SettingsEntity): Promise<void> {
    localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settings));
    return Promise.resolve();
  }
};