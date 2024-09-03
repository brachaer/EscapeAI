export const handleGameStarted = (data, setGameState, setStateId) => {
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
};

export const handleActionResult = (data, setGameState, emit) => {
  if (data.error) {
    setGameState((prevState) => ({
      ...prevState,
      error: data.error,
      isLoading: false,
    }));
  } else if (data.exit) {
    handleGameEnded();
    setGameState((prevState) => ({
      ...prevState,
      isGameOver: true,
      isLoading: false,
      description: data.description || "Game Over!",
      error: null,
    }));
    emit("game_ended");
  } else {
    setGameState((prevState) => ({
      ...prevState,
      description: data.description,
      options: data.options || [],
      isGameOver: data.exit,
      isLoading: false,
      error: null,
    }));
  }
  console.log("Action result", data);
};

export const handleGameEnded = (data, disconnect) => {
  console.log(data.message);
  alert(data.message);
  disconnect();
};
