import React, { createContext, useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.setAttribute(
      "dir",
      language === "he" ? "rtl" : "ltr"
    );
  }, [language, i18n]);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
