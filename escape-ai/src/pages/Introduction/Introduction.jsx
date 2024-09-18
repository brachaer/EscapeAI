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
    onStartGame();
  };

  const instructions = t("instructions", { returnObjects: true });

  return (
    <Container
      maxWidth="sm"
      sx={{
        p: 2,
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Header text="intro" variant="h3" />
        <Header text="welcome_intro" variant="h5" />
        <List
          component="ol"
          sx={{
            border: "1px solid",
            margin: "10px",
            bgcolor: "background.default",
            "& .MuiListItem-root": {
              display: "flex",
              flexDirection: i18n.language === "he" ? "row-reverse" : "row",
              alignItems: "center",
            },
            "& .MuiListItemIcon-root": {
              minWidth: "30px",
            },
            height: "20vh",
            overflowX: "auto",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track": {},
          }}
        >
          {instructions.map((instruction, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Box mr={2}>
                  <MyText
                    text={
                      i18n.language === "en"
                        ? index + 1 + "."
                        : "." + (index + 1)
                    }
                    variant="body1"
                    padding={"5px"}
                  />
                </Box>
              </ListItemIcon>
              <ListItemText>{instruction}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Header text="goal_title" variant="h5" />
        <MyText text="goal_intro" variant="body1" padding={"5px"} />
        <Header text="good_luck" variant="h5" />
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartGame}
          sx={{ mt: 2, padding: "5px" }}
        >
          {t("start_game")}
        </Button>
      </Box>
    </Container>
  );
};

export default Introduction;
