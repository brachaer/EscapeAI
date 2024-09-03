import React, { useState, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import useSocket from "../../hooks/useSocket";
import GameContent from "../../components/GameContent/GameContent";
import GameEnd from "../../components/GameEnd/GameEnd";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import {
  handleGameStarted,
  handleActionResult,
  handleGameEnded,
} from "./socketHandlers";

const EscapeRoom = ({ initialData }) => {
  const { emit, disconnect, on, off } = useSocket("http://localhost:5000");
  const [gameState, setGameState] = useState({
    description: "",
    options: [],
    isGameOver: false,
    isLoading: true,
    error: null,
  });
  const [stateId, setStateId] = useState(null);

  useEffect(() => {
    on("connect", () => {
      console.log("Connected to server");
      startGame();
    });

    on("game_started", (data) =>
      handleGameStarted(data, setGameState, setStateId)
    );
    on("action_result", (data) => handleActionResult(data, setGameState, emit));
    on("game_ended", (data) => handleGameEnded(data, disconnect));

    return () => {
      off("connect");
      off("game_started");
      off("action_result");
      off("game_ended");
      disconnect();
    };
  }, [on, off, emit, disconnect]);

  const startGame = () => {
    setGameState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));
    setStateId(null);
    emit("start_game", initialData);
  };

  const handleAction = (choiceId) => {
    setGameState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));
    emit("game_action", {
      state_id: stateId,
      choice: choiceId,
      lang: initialData.lang,
    });
  };

  if (gameState.isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Header text={"Escape AI"} variant={"h4"} />
        {gameState.isGameOver || gameState.error ? (
          <GameEnd
            description={gameState.description}
            isGameOver={gameState.isGameOver}
            startGame={startGame}
          />
        ) : (
          <GameContent
            description={gameState.description}
            options={gameState.options}
            handleAction={handleAction}
            isGameOver={gameState.isGameOver}
            error={gameState.error}
            stateId={stateId}
          />
        )}
      </Paper>
    </Container>
  );
};

export default EscapeRoom;
