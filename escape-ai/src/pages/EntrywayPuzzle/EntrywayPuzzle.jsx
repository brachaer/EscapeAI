import React, { useState } from "react";
import styles from "./EntrywayPuzzle.module.css";

const EntrywayPuzzle = () => {
  const [symbolsState, setSymbolsState] = useState({
    symbol1: false,
    symbol2: false,
    symbol3: false,
    symbol4: false,
  });

  const handleClickSymbol = (symbol) => {
    // Implement logic to handle symbol clicks, reveal hints, or trigger mechanisms
    // Example logic:
    if (!symbolsState[symbol]) {
      // Set symbol state to true to reveal hint or trigger mechanism
      setSymbolsState({ ...symbolsState, [symbol]: true });
    }
  };

  const solvePuzzle = () => {
    // Implement logic to solve the puzzle
    // Example logic: Check if all symbols are interacted with correctly
    if (
      symbolsState.symbol1 &&
      symbolsState.symbol2 &&
      symbolsState.symbol3 &&
      symbolsState.symbol4
    ) {
      return true; // Puzzle solved
    }
    return false; // Puzzle not solved
  };

  const handleDoorOpen = () => {
    // Implement logic to open the door upon solving the puzzle
    if (solvePuzzle()) {
      // Open the door, transition to the next stage or reveal further content
      console.log("Door opens...");
    } else {
      // Display message or feedback indicating the puzzle is not yet solved
      console.log("Puzzle not yet solved...");
    }
  };

  return (
    <div className={styles.entryway}>
      <h1>Stage 1: Entryway Puzzle</h1>
      <p className={styles.description}>
        As players enter the game, they find themselves in a dimly lit entryway
        with mysterious symbols etched on the walls. A faint glow emanates from
        a locked door at the far end of the room.
      </p>
      <p className={styles.objective}>
        Objective: To proceed further into the game, players must decipher the
        meaning of the symbols and find the correct sequence to unlock the door.
        The puzzle involves observing clues hidden in the environment, such as
        patterns in the symbols, and applying logical reasoning to deduce the
        solution.
      </p>

      {/* Interactive elements (symbols) */}
      <div className={styles.symbols}>
        <div
          className={`${styles.symbol} ${
            symbolsState.symbol1 && styles.symbolActive
          }`}
          onClick={() => handleClickSymbol("symbol1")}
        >
          Symbol 1
        </div>
        <div
          className={`${styles.symbol} ${
            symbolsState.symbol2 && styles.symbolActive
          }`}
          onClick={() => handleClickSymbol("symbol2")}
        >
          Symbol 2
        </div>
        <div
          className={`${styles.symbol} ${
            symbolsState.symbol3 && styles.symbolActive
          }`}
          onClick={() => handleClickSymbol("symbol3")}
        >
          Symbol 3
        </div>
        <div
          className={`${styles.symbol} ${
            symbolsState.symbol4 && styles.symbolActive
          }`}
          onClick={() => handleClickSymbol("symbol4")}
        >
          Symbol 4
        </div>
      </div>

      {/* Visual design and ambiance */}
      <div className={styles.entrywayDesign}>
        {/* Visuals and ambient sounds described in the design */}
      </div>

      {/* Transition upon solving the puzzle */}
      <button className={styles.openDoorButton} onClick={handleDoorOpen}>
        Open Door
      </button>
    </div>
  );
};

export default EntrywayPuzzle;
