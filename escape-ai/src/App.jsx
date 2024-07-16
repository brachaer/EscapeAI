import React, { useState, useEffect } from "react";
import UserForm from "./pages/UserForm/UserForm";
import ThemeProvider from "./components/Theme/ThemeProvider";
import ToggleThemeButton from "./components/Theme/ToggleThemeButton";
import Header from "./components/Header/Header";
import Introduction from "./pages/Introduction/Introduction";
import PracticeStage from "./pages/PracticsStage/PracticeStage";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Language from "./components/Language/Language";
import Conclusion from "./pages/Conclusion/Conclusion";
import GamePage from "./pages/GamePage/GamePage";
import { useTranslation } from "react-i18next";
import NavBar from "./components/NavBar/NavBar";
function App() {
  const { t } = useTranslation();

  const [gameStarted, setGameStarted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState("intro");

  const handleCompleteGame = () => {
    setGameStarted(true);
    setPage("conclusion");
  };
  const handleCompletePractice = () => {
    setPage("stages");
  };

  const handleFormSubmit = (formData) => {
    setUserData(formData);

    setGameStarted(true);
    console.log("Starting game with data:", userData);
  };

  const handleStartGame = () => {
    setPage("practice");

    console.log("Starting game...");
  };

  return (
    <ThemeProvider>
      <CssBaseline />
      <Box>
        <NavBar />
        {!gameStarted ? (
          <Box sx={{ textAlign: "center", marginTop: "50px" }}>
            <UserForm onSubmit={handleFormSubmit} />
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", marginTop: "50px" }}>
            <Box sx={{ flexGrow: 1, mx: 2 }}>
              <Normal>RTL normal behavior</Normal>
              <Noflip>RTL noflip</Noflip>
            </Box>
            <Header text={`ברוכים הבאים ${userData.name}`} varient="h2" />
            {page === "intro" && <Introduction onStartGame={handleStartGame} />}
            {page === "practice" && (
              <PracticeStage onComplete={handleCompletePractice} />
            )}
            {page === "stages" && <GamePage onComplete={handleCompleteGame} />}
            {page === "conclusion" && <Conclusion />}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
