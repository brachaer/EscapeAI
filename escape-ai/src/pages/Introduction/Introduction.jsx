import React from "react";
import Button from "@mui/material/Button";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import MyText from "../../components/MyText/MyText";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Introduction = ({ onStartGame }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isRTL = i18n.language === "he";

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

  const listStyles = {
    border: `1px solid ${theme.palette.divider}`,
    marginBlock: theme.spacing(1),
    bgcolor: "background.paper",
    maxHeight: "20vh",
    overflowY: "auto",
    "& .MuiListItem-root": {
      display: "flex",
      flexDirection: isRTL ? "row-reverse" : "row",
      alignItems: "flex-start",
      paddingInline: theme.spacing(1),
    },
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
      maxwidth="100vw"
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <Container
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header text="intro" variant={getVariant("h4")} />
        <Header text="welcome_intro" variant={getVariant("body1")} />
        <List
          component="ol"
          sx={listStyles}
          aria-label={t("instructions_aria_label")}
        >
          {instructions.map((instruction, index) => (
            <ListItem key={index}>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant={getVariant("body2")}
                    component="span"
                    sx={{
                      display: "block",
                      unicodeBidi: "plaintext",
                      direction: isRTL ? "rtl" : "ltr",
                    }}
                  >
                    {instruction}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Header text="goal_title" variant={getVariant("h6")} />
        <MyText text="goal_intro" variant={getVariant("body2")} />
        <Header text="good_luck" variant={getVariant("h6")} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartGame}
          sx={{
            // marginBlock: theme.spacing(1),
            // paddingInline: theme.spacing(2),
            fontSize: theme.typography[isMobile ? "body2" : "body1"].fontSize,
          }}
          aria-label={t("start_game")}
        >
          {t("start_game")}
        </Button>
      </Container>
    </Container>
  );
};

export default Introduction;
