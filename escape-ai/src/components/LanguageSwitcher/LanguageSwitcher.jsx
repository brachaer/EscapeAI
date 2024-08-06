import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Flag from "react-flagkit";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang) => {
    if (lang) {
      toggleLanguage(lang);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            {language === "he" ? "HE" : "EN"}
          </Typography>
          <ExpandMoreIcon />
        </Box>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
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
