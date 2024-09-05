import React, { useState, useEffect } from "react";
import { Container, Paper, Alert } from "@mui/material";
import useSocket from "../../hooks/useSocket";
import GameContent from "../../components/GameContent/GameContent";
import GameEnd from "../../components/GameEnd/GameEnd";
import Loading from "../../components/Loading/Loading";
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

  const startGame = () => {
    setGameState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));
    setStateId(null);
    emit("start_game", initialData);
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to server");
      startGame();
    };

    const handleGameStartedEvent = (data) => {
      console.log("Game started:", data);
      handleGameStarted(data, setGameState, setStateId);
    };

    const handleActionResultEvent = (data) => {
      console.log("Action result:", data);
      handleActionResult(data, setGameState, emit);
    };

    const handleGameEndedEvent = (data) => {
      console.log("Game ended:", data);
      handleGameEnded(data, disconnect);
    };

    on("connect", handleConnect);
    on("game_started", handleGameStartedEvent);
    on("action_result", handleActionResultEvent);
    on("game_ended", handleGameEndedEvent);

    return () => {
      off("connect", handleConnect);
      off("game_started", handleGameStartedEvent);
      off("action_result", handleActionResultEvent);
      off("game_ended", handleGameEndedEvent);
      disconnect();
    };
  }, [on, off, emit, disconnect]);

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
        {gameState.error && (
          <Alert severity="error" style={{ marginTop: "20px" }}>
            {gameState.error}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default EscapeRoom;
