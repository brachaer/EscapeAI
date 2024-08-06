import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import useSocket from "../../hooks/useSocket";

const EscapeRoom = ({ initialData, onComplete }) => {
  const { emit, on, off } = useSocket("http://localhost:5000");
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

    on("game_started", (data) => {
      if (data.error) {
        setGameState((prevState) => ({
          ...prevState,
          error: data.error,
          isLoading: false,
        }));
      } else {
        setGameState({
          description: data.description,
          options: data.options || [],
          isGameOver: false,
          isLoading: false,
          error: null,
        });
        setStateId(data.state_id);
      }
      console.log("Game started", data);
    });

    on("action_result", (data) => {
      if (data.error) {
        setGameState((prevState) => ({
          ...prevState,
          error: data.error,
          isLoading: false,
        }));
      } else {
        setGameState((prevState) => ({
          ...prevState,
          description: data.description,
          options: data.options || [],
          isGameOver: data.exit,
          isLoading: false,
          error: null,
        }));
        if (data.exit) {
          onComplete();
        }
      }
      console.log("Action result", data);
    });

    return () => {
      off("connect");
      off("game_started");
      off("action_result");
    };
  }, [on, off, onComplete]);

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
    return (
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          style={{ padding: "20px", marginTop: "20px", textAlign: "center" }}
        >
          <CircularProgress />
          <Typography variant="h6" style={{ marginTop: "10px" }}>
            Loading...
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Escape AI
        </Typography>
        {gameState.error && (
          <Alert severity="error" style={{ marginBottom: "20px" }}>
            {gameState.error}
          </Alert>
        )}
        <Typography variant="body1" paragraph>
          {gameState.description}
        </Typography>
        <Grid container spacing={2}>
          {gameState.options &&
            gameState.options.map((option) => (
              <Grid item xs={12} key={option.id}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleAction(option.id)}
                  disabled={gameState.isGameOver || gameState.error || !stateId}
                >
                  {option.description}
                </Button>
              </Grid>
            ))}
        </Grid>
        {(gameState.isGameOver || gameState.error) && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              {gameState.isGameOver ? "Game Over!" : "Error Occurred"}
            </Typography>
            <Button variant="contained" color="secondary" onClick={startGame}>
              Start New Game
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default EscapeRoom;
