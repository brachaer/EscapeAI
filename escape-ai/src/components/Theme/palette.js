import { cyan, grey } from "@mui/material/colors";

export const lightPalette = {
  primary: cyan,
  secondary: {
    main: cyan[800],
  },
  background: {
    default: grey[100],
    paper: grey[50],
  },
  text: {
    primary: cyan[900],
    secondary: cyan[700],
  },
};

export const darkPalette = {
  primary: cyan,
  secondary: {
    main: cyan[600],
  },
  background: {
    default: grey[900],
    paper: "#1c1c1c",
  },
  text: {
    primary: cyan[300],
    secondary: grey[200],
  },
};
