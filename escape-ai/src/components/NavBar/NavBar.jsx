import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ToggleThemeButton from "../ToggleThemeButton/ToggleThemeButton";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LogoImage from "../LogoImage/LogoImage";
import img from "../../assets/escape-logo.jpeg";

const FullWidthAppBar = styled(AppBar)(({ theme }) => ({
  width: "100%",
  left: 0,
  right: 0,
  backgroundColor: theme.palette.secondary.main,
}));

const ResponsiveToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 1),
  },
}));

const NavText = styled(Typography)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
  fontFamily: "'Special Elite', Roboto",
  color: "white",
}));

const ButtonContainer = styled("div")({
  display: "flex",
  gap: "1%",
});

const Navbar = ({ gameStarted }) => {
  return (
    <FullWidthAppBar position="fixed">
      <ResponsiveToolbar>
        <LogoImage src={img} width="10vw" />
        <NavText variant="h1">Escape AI</NavText>
        <ButtonContainer>
          {!gameStarted && <LanguageSwitcher />}
          <ToggleThemeButton />
        </ButtonContainer>
      </ResponsiveToolbar>
    </FullWidthAppBar>
  );
};

export default Navbar;
