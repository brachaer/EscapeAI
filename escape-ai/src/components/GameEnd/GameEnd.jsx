import React from "react";
import { Button, Container } from "@mui/material";
import Header from "../Header/Header";
import MyText from "../MyText/MyText";
const GameEnd = ({ description, isGameOver, startGame }) => (
  <Container style={{ marginTop: "20px", textAlign: "center" }}>
    <Header
      text={isGameOver ? "Game Over!" : "Error Occurred"}
      variant={"h5"}
    />
    <MyText variant="body1" text={description} />
    <Button variant="contained" color="secondary" onClick={startGame}>
      Start New Game
    </Button>
  </Container>
);

export default GameEnd;
