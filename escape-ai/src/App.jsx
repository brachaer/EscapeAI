import React, { useState, useEffect } from "react";
import UserForm from "./pages/UserForm/UserForm";
import ThemeProvider from "./components/Theme/ThemeProvider";
import Header from "./components/Header/Header";
import Introduction from "./pages/Introduction/Introduction";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Conclusion from "./pages/Conclusion/Conclusion";
import GamePage from "./pages/GamePage/GamePage";
import NavBar from "./components/NavBar/NavBar";
import GlobalStyles from "./GlobalStyles";
import { LanguageProvider } from "./context/LanguageContext";
import "@fontsource/roboto/300.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState("intro");

  const handleCompleteGame = () => {
    setGameStarted(true);
    setPage("conclusion");
  };

  const handleFormSubmit = (formData) => {
    setUserData(formData);

    setGameStarted(true);
    console.log("Starting game with data:", userData);
  };

  const handleStartGame = () => {
    setPage("stages");

    console.log("Starting game...");
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStyles />
        <CssBaseline />
        <Box>
          <NavBar />

          {!gameStarted ? (
            <Box sx={{ textAlign: "center", marginTop: "50px" }}>
              <Header text="welcome" variant="h2" />
              <UserForm onSubmit={handleFormSubmit} />
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", marginTop: "50px" }}>
              <Header text="welcome" variant="h2" />
              <Header text={userData.name} variant="h3" />

              {page === "intro" && (
                <Introduction onStartGame={handleStartGame} />
              )}
              {page === "stages" && (
                <GamePage onComplete={handleCompleteGame} />
              )}
              {page === "conclusion" && <Conclusion />}
            </Box>
          )}
        </Box>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
