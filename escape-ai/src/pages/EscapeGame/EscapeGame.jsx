import React, { useState, useEffect } from "react";
import { Container, Paper, Alert } from "@mui/material";
import GameContent from "../../components/GameContent/GameContent";
import GameEnd from "../../components/GameEnd/GameEnd";
import Loading from "../../components/Loading/Loading";

const API_BASE_URL = "https://escape-ai-server.vercel.app";

const EscapeGame = ({ initialData }) => {
  const [gameState, setGameState] = useState({
    description: "",
    options: [],
    isGameOver: false,
    isLoading: true,
    error: null,
  });
  const [stateId, setStateId] = useState(null);

  const startGame = async () => {
    setGameState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));
    setStateId(null);

    try {
      const response = await fetch(`${API_BASE_URL}/start_game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialData),
      });
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorDetails}`
        );
      }
      const data = await response.json();
      handleGameStarted(data);
    } catch (error) {
      setGameState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: "Failed to start the game. Please try again.",
      }));
    }
  };

  const handleGameStarted = (data) => {
    setGameState((prevState) => ({
      ...prevState,
      description: data.description,
      options: data.options,
      isLoading: false,
      error: null,
    }));
    setStateId(data.state_id);
  };

  const handleAction = async (choiceId) => {
    setGameState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));
    try {
      const response = await fetch(`${API_BASE_URL}/game_action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state_id: stateId,
          choice: choiceId,
          lang: initialData.lang,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      handleActionResult(data);
    } catch (error) {
      setGameState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: "Failed to process action. Please try again.",
      }));
    }
  };

  const handleActionResult = (data) => {
    if (data.game_over) {
      setGameState((prevState) => ({
        ...prevState,
        description: data.description,
        isGameOver: true,
        isLoading: false,
      }));
    } else {
      setGameState((prevState) => ({
        ...prevState,
        description: data.description,
        options: data.options,
        isLoading: false,
      }));
      setStateId(data.state_id);
    }
  };

  useEffect(() => {
    startGame();
  }, []);

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

export default EscapeGame;
