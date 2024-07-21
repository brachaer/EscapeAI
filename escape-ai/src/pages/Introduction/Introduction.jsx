import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Introduction.module.css";
import Header from "../../components/Header/Header";
import { t } from "i18next";
import { Container } from "@mui/system";
const Introduction = ({ onStartGame }) => {
  const handleStartGame = () => {
    console.log("Starting game...");
    onStartGame();
  };

  return (
    <Container
      classes={styles.Container}
      maxWidth="sm"
      sx={{ p: 2, border: "2px solid grey" }}
    >
      <Header text="intro" variant="h3" />
      <Typography variant="body1" gutterBottom>
        {t("instructions")
          .split("\\n")
          .map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </Typography>
      <br />

      <Button variant="contained" color="primary" onClick={handleStartGame}>
        {t("start_game")}{" "}
      </Button>
    </Container>
  );
};

export default Introduction;
