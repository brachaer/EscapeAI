export const handleGameStarted = (data, setGameState, setStateId) => {
  if (data.error) {
    setGameState((prevState) => ({
      ...prevState,
      error: data.error,
      isLoading: false,
    }));
  } else {
    setGameState({
      description: data.description || "Welcome to the game!",
      options: data.options || [],
      isGameOver: false,
      isLoading: false,
      error: null,
    });
    setStateId(data.state_id || null);
  }
  console.log("Game started", data);
};

export const handleActionResult = (data, setGameState, emit) => {
  if (data && typeof data === "object") {
    if (data.error) {
      setGameState((prevState) => ({
        ...prevState,
        error: data.error,
        isLoading: false,
      }));
    } else if (data.exit) {
      handleGameEnded(data, () => {});
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
        description: data.description || "No description available.",
        options: data.options || [],
        isGameOver: false,
        isLoading: false,
        error: null,
      }));
    }
    console.log("Action result", data);
  } else {
    console.error("Invalid data format:", data);
  }
};

export const handleGameEnded = (data, disconnect) => {
  if (data && data.description) {
    console.log("Game ended:", data);

    if (disconnect) {
      disconnect();
    }
  } else {
    console.error("Data is missing or description is undefined:", data);
  }
};
