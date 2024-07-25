import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ToggleThemeButton from "../Theme/ToggleThemeButton";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LogoImage from "../LogoImage/LogoImage";
const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <LogoImage src="../src/assets/escape-logo.jpeg" width="10%" />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
          }}
        >
          Escape AI
        </Typography>
        <LanguageSwitcher />
        <ToggleThemeButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
