import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ThemeProvider from "./components/Theme/ThemeProvider.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import GlobalStyles from "./GlobalStyles.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
