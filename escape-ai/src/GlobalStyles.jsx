import React from "react";
import { Global, css } from "@emotion/react";
import { useLanguage } from "./context/LanguageContext";

const GlobalStyles = () => {
  const { language } = useLanguage();

  return (
    <Global
      styles={css`
        body {
          direction: ${language === "he" ? "rtl" : "ltr"};
          text-align: ${language === "he" ? "right" : "left"};
        }

        input,
        textarea,
        select,
        button {
          direction: ${language === "he" ? "rtl" : "ltr"};
        }
      `}
    />
  );
};

export default GlobalStyles;
