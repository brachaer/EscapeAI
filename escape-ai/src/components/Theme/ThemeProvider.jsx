import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import useMediaQuery from "@mui/material/useMediaQuery";

import "@fontsource/roboto";
import "@fontsource/assistant";
import "@fontsource/amatic-sc";
import "@fontsource/special-elite";
import "@fontsource/rubik";

import { getTypography } from "./typography.js";
import { lightPalette, darkPalette } from "./palette.js";
import { useBreakpoints } from "./useBreakpoints.js";

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

  const { isMobile, isTablet, isDesktop } = useBreakpoints();

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const themeOptions = {
    direction: lang === "he" ? "rtl" : "ltr",
    palette: mode === "light" ? lightPalette : darkPalette,
    typography: getTypography(lang, isMobile, isTablet),
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: darkPalette.text.secondary,
            backgroundColor:
              theme.palette.mode === "light"
                ? lightPalette.secondary.main
                : darkPalette.secondary.main,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "light"
                  ? lightPalette.main
                  : darkPalette.main,
            },
          }),
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "light" ? lightPalette.main : darkPalette.main,
            color:
              mode === "light" ? lightPalette.text.main : darkPalette.text.main,
            "& .MuiInputBase-input": {
              padding: "1%",
              borderRadius: "4px",
              border: `1px solid ${
                mode === "light"
                  ? lightPalette.text.secondary
                  : darkPalette.text.secondary
              }`,
            },
            "&.Mui-focused": {
              border: `1px solid ${
                mode === "light"
                  ? lightPalette.text.main
                  : darkPalette.text.main
              }`,
              boxShadow: `0 0 0 2px ${lightPalette.main}`,
            },
          },
        },
      },
    },
  };

  const theme = useMemo(
    () => createTheme(themeOptions),
    [mode, lang, isMobile, isTablet]
  );

  useEffect(() => {
    document.body.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleTheme,
        lang,
        setLang,
        isMobile,
        isTablet,
        isDesktop,
      }}
    >
      <CacheProvider value={lang === "he" ? cacheRtl : cacheLtr}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
