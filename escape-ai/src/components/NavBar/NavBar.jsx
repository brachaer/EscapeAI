import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ToggleThemeButton from "../Theme/ToggleThemeButton";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LogoImage from "../LogoImage/LogoImage";
import { useTheme } from "@mui/material/styles";
import img from "../../assets/escape-logo.jpeg";

const NavBar = () => {
  const theme = useTheme();
  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: theme.palette.background.header,
        padding: 1,
      }}
    >
      <Toolbar variant="dense">
        <LogoImage src={img} width="8%" />
        <Typography
          variant="h3"
          component="div"
          sx={{
            flexGrow: 1,
            marginLeft: 1,
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
