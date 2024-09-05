import React, { createContext, useContext, useState, useMemo } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { blueGrey, amber, cyan } from "@mui/material/colors";

import "@fontsource/roboto";
import "@fontsource/assistant";
import "@fontsource/nosifer";
import "@fontsource/eater";
import "@fontsource/suez-one";
import "@fontsource/amatic-sc";
import "@fontsource/special-elite";
import "@fontsource/heebo";

import "@fontsource/rubik";
import "@fontsource/open-sans";
import "@fontsource/rubik-mono-one";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer],
});

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [lang, setLang] = useState("en");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        direction: lang === "he" ? "rtl" : "ltr",
        typography: {
          fontFamily:
            lang === "he"
              ? "'Amatic SC', 'rubik', cursive"
              : "'Special Elite', Roboto",
          h1: {
            fontFamily:
              lang === "he"
                ? "'Suez One', 'Amatic SC', cursive"
                : "'Nosifer', 'Eater', cursive",
          },
          h2: {
            fontFamily:
              lang === "he"
                ? "'Amatic SC', 'Suez One', cursive"
                : "'Eater', 'Nosifer', cursive",
          },
          h3: {
            fontWeight: "bold",
          },
          h5: {
            fontWeight: "bold",
            fontFamily:
              lang === "he" ? "'rubik', cursive" : "'Special Elite', Roboto",
          },
          body1: {
            fontWeight: "lighter",
            fontFamily:
              lang === "he" ? "'rubik', cursive" : "'Special Elite', Roboto",
          },
          button: {
            fontWeight: "500",
            fontFamily:
              lang === "he"
                ? "'rubik', 'Amatic SC', cursive"
                : "'Special Elite', Roboto",
          },
        },
        palette: {
          mode,
          primary: cyan,
          secondary: {
            main: mode === "light" ? cyan[600] : cyan[900],
          },
          background: {
            default: mode === "light" ? cyan[100] : cyan[800],
            paper: mode === "light" ? blueGrey[50] : "#000001",
            header: cyan[800],
          },
          text: {
            primary: mode === "light" ? blueGrey[900] : amber[50],
            secondary: mode === "light" ? blueGrey[800] : cyan[50],
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "light" ? cyan[700] : cyan[800],
                color: amber[50],
                "&:hover": {
                  backgroundColor: mode === "light" ? cyan[600] : cyan[700],
                },
              },
            },
          },
        },
      }),
    [mode, lang]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, lang, setLang }}>
      <CacheProvider value={lang === "he" ? cacheRtl : cacheLtr}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
