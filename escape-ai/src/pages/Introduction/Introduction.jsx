import React from "react";
import Button from "@mui/material/Button";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MyText from "../../components/MyText/MyText";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Introduction = ({ onStartGame }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // פונקציה גמישה יותר לטיפוגרפיה
  const getVariant = (baseVariant) => {
    const variantsMap = {
      h3: "h4",
      h5: "h6",
      body1: "body2",
    };
    return isMobile ? variantsMap[baseVariant] || baseVariant : baseVariant;
  };

  const handleStartGame = () => onStartGame();

  const instructions = t("instructions", { returnObjects: true });

  // הגדרת סגנון רשימה בסגנון אחד במקום כפילות
  const listStyles = {
    border: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(1, 0),
    bgcolor: "background.paper",
    "& .MuiListItem-root": {
      display: "flex",
      flexDirection: i18n.language === "he" ? "row-reverse" : "row",
      alignItems: "center",
      padding: theme.spacing(1),
    },
    "& .MuiListItemIcon-root": {
      minWidth: isMobile ? theme.spacing(3) : theme.spacing(4),
    },
    maxHeight: "30vh",
    overflowY: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "4px",
    },
  };

  return (
    <Container
      maxWidth="100%"
      disableGutters
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: theme.spacing(0),
        [theme.breakpoints.up("sm")]: {
          padding: theme.spacing(1),
        },
      }}
    >
      <Container>
        <Header text="intro" variant={getVariant("h3")} />
        <Header text="welcome_intro" variant={getVariant("h6")} />
        <List component="ol" sx={listStyles}>
          {instructions.map((instruction, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <MyText
                  text={
                    i18n.language === "en" ? `${index + 1}.` : `.${index + 1}`
                  }
                  variant={getVariant("body1")}
                />
              </ListItemIcon>
              <ListItemText
                primary={instruction}
                primaryTypographyProps={{ variant: getVariant("body1") }}
              />
            </ListItem>
          ))}
        </List>
        <Header text="goal_title" variant={getVariant("h5")} />
        <MyText text="goal_intro" variant={getVariant("body1")} />
        <Header text="good_luck" variant={getVariant("h5")} />
      </Container>
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartGame}
        sx={{
          mt: theme.spacing(1), // מרווח קטן יותר בין הטקסט לכפתור
          padding: theme.spacing(1, 2),
          fontSize: theme.typography[isMobile ? "body2" : "body1"].fontSize,
        }}
      >
        {t("start_game")}
      </Button>
    </Container>
  );
};

export default Introduction;
