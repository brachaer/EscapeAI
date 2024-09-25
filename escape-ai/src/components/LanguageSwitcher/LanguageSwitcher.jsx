import React, { useState } from "react";
import { useTheme } from "../Theme/ThemeProvider";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Container,
  Typography,
} from "@mui/material";
import { useLanguage } from "../../context/LanguageContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Flag from "react-flagkit";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  const { lang, setLang } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedLang) => {
    if (selectedLang) {
      setLang(selectedLang);
      toggleLanguage(selectedLang);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Container sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 1, color: "white" }}>
            {lang && language === "he" ? "HE" : "EN"}
          </Typography>
          <ExpandMoreIcon sx={{ color: "white" }} />
        </Container>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
        <MenuItem onClick={() => handleClose("en")}>
          <Flag country="US" />
          <ListItemText primary="EN" />
        </MenuItem>
        <MenuItem onClick={() => handleClose("he")}>
          <Flag country="IL" />
          <ListItemText primary="HE" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
