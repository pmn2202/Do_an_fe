// import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_VI from "../../src/locales/vi/home.json";
import HOME_EN from "../locales/en/home.json";
// khi ko có truyền ns vào
export const defaultNS = "home";
export const locales = {
  en: "English",
  vi: "Tiếng Việt",
};
export const resources = {
  en: {
    home: HOME_EN,
  },
  vi: {
    home: HOME_VI,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  ns: ["home", "product"],
  fallbackLng: "vi",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});
