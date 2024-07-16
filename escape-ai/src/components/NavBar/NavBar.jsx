import React from "react";
import { useTranslation } from "react-i18next";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Language from "../Language/Language";
import ToggleThemeButton from "../Theme/ToggleThemeButton";
const NavBar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.setAttribute("dir", lng === "he" ? "rtl" : "ltr");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("escape_ai")}
        </Typography>
        <Language />
        <ToggleThemeButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
