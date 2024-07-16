import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "./Introduction.module.css";
import Header from "../../components/Header/Header";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
const Introduction = ({ onStartGame }) => {
  const handleStartGame = () => {
    console.log("Starting game...");
    onStartGame();
  };

  return (
    <Container maxWidth="sm" sx={{ p: 2, border: "2px solid grey" }}>
      <Header text="Introduction" varient="h3" />
      <Typography variant="body1" gutterBottom>
        You find yourself trapped in a mysterious digital labyrinth. Navigate
        through rooms, interact with objects, and solve puzzles to escape.
      </Typography>
      <br />
      <Typography variant="body1" gutterBottom>
        Explore the futuristic tech facility where AI experiments have gone
        wrong. Your goal is to uncover its secrets and find a way out.
      </Typography>
      <br />
      <Button variant="contained" color="primary" onClick={handleStartGame}>
        Let's Start
      </Button>
    </Container>
  );
};

export default Introduction;
