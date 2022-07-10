import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationUK from './locales/uk/translation.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'uk',
    debug: true,
    resources: {
      uk: {
        translation: translationUK
      },
      en: {
        translation: translationEN
      }
    },
    ns: ['translation'],
    defaultNS: 'translation'
  });

  i18n.languages = ['uk', 'en'];

export default i18n;