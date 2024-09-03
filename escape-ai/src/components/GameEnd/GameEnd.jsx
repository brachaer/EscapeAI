import React from "react";
import { Button } from "@mui/material";
import Header from "../Header/Header";
import MyText from "../MyText/MyText";
const GameEnd = ({ description, isGameOver, startGame }) => (
  <div style={{ marginTop: "20px", textAlign: "center" }}>
    <Header
      text={isGameOver ? "Game Over!" : "Error Occurred"}
      variant={"h5"}
    />
    <MyText variant="body1" text={description} />
    <Button variant="contained" color="secondary" onClick={startGame}>
      Start New Game
    </Button>
  </div>
);

export default GameEnd;
