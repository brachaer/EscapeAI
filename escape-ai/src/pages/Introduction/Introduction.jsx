import React from "react";
import Button from "@mui/material/Button";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/system";
import MyText from "../../components/MyText/MyText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

const Introduction = ({ onStartGame }) => {
  const { t, i18n } = useTranslation();

  const handleStartGame = () => {
    console.log("Current language:", i18n.language);
    onStartGame();
  };

  const instructions = t("instructions", { returnObjects: true });

  return (
    <Container maxWidth="sm" sx={{ p: 2, bgcolor: "babackground.default" }}>
      <Header text="intro" variant="h3" />
      <Header text="welcome_intro" variant="h5" />
      <List
        component="ol"
        sx={{
          "& .MuiListItem-root": {
            display: "flex",
            flexDirection: i18n.language === "he" ? "row-reverse" : "row",
            alignItems: "center",
          },
          "& .MuiListItemIcon-root": {
            minWidth: "30px",
          },
        }}
      >
        {instructions.map((instruction, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Box mr={2}>
                <MyText
                  text={
                    i18n.language === "en" ? index + 1 + "." : "." + (index + 1)
                  }
                  variant="body1"
                />
              </Box>
            </ListItemIcon>
            <ListItemText>{instruction}</ListItemText>
          </ListItem>
        ))}
      </List>
      <Header text="goal_title" variant="h5" />
      <MyText text="goal_intro" variant="body1" />
      <Header text="good_luck" variant="h5" />

      <Button variant="contained" color="primary" onClick={handleStartGame}>
        {t("start_game")}{" "}
      </Button>
    </Container>
  );
};

export default Introduction;
