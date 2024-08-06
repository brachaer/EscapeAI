import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Introduction.module.css";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import { Container } from "@mui/system";
import { Box } from "@mui/system";
import TypewriterLine from "../../components/Typewriter/TypewriterLine";

const Introduction = ({ onStartGame }) => {
  const { t } = useTranslation();

  const handleStartGame = () => {
    console.log("Starting game...");
    onStartGame();
  };
  const instructions = t("instructions", { returnObjects: true });
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);

  const handleComplete = () => {
    if (currentInstructionIndex < instructions.length - 1) {
      setCurrentInstructionIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("All instructions displayed!");
    }
  };

  return (
    <Container
      classes={styles.Container}
      maxWidth="sm"
      sx={{ p: 2, border: "2px solid grey", bgcolor: "babackground.default" }}
    >
      <Header text="intro" variant="h3" />
      <Box>
        {instructions.map((instruction, index) => (
          <div key={index}>
            {index < currentInstructionIndex && (
              <Typography variant="body1">{instruction}</Typography>
            )}
            {index === currentInstructionIndex && (
              <TypewriterLine text={instruction} onComplete={handleComplete} />
            )}
          </div>
        ))}
      </Box>
      <Button variant="contained" color="primary" onClick={handleStartGame}>
        {t("start_game")}{" "}
      </Button>
    </Container>
  );
};

export default Introduction;
