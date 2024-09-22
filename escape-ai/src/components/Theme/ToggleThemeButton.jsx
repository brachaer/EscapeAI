import React from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "./ThemeProvider";

function ToggleThemeButton() {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton onClick={toggleTheme}>
      {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
}

export default ToggleThemeButton;
