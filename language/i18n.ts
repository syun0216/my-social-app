import zh from './zh';
import en from './en';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  en,
  zh,
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default i18n;
