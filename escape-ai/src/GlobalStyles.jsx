import React from "react";
import { Global, css } from "@emotion/react";
import { useLanguage } from "./context/LanguageContext";

const GlobalStyles = () => {
  const { language } = useLanguage();

  return (
    <Global
      styles={css`
        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-y: auto;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          direction: ${language === "he" ? "rtl" : "ltr"};
          text-align: ${language === "he" ? "right" : "left"};
        }

        #root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100vw;
          overflow-x: hidden;
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
