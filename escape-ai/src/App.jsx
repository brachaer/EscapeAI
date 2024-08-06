import React, { useState } from "react";
import UserForm from "./pages/UserForm/UserForm";
import EscapeRoom from "./pages/EscapeRoom/EscapeRoom";
import Introduction from "./pages/Introduction/Introduction";
import Conclusion from "./pages/Conclusion/Conclusion";
import ThemeProvider from "./components/Theme/ThemeProvider";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import GlobalStyles from "./GlobalStyles";
import { LanguageProvider } from "./context/LanguageContext";
import videoSource from "./assets/escape_bg_desktop.mp4";
import "./App.css";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState("intro");

  const handleCompleteGame = () => {
    setGameStarted(true);
    setPage("conclusion");
  };

  const handleFormSubmit = (formData) => {
    console.log(formData);
    setUserData(formData);

    setGameStarted(true);
    console.log("Starting game with data:", userData);
  };

  const handleStartGame = () => {
    setPage("game");

    console.log("Starting game...");
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <GlobalStyles />
        <CssBaseline />
        <Box>
          <video autoPlay loop muted className="background-video">
            <source src={videoSource} type="video/mp4" />
            Your browser does not support video.
          </video>

          <NavBar />
          {!gameStarted ? (
            <Box className="content-container">
              <Paper elevation={10} className="paper">
                <Header text="welcome" variant="h2" />
                <UserForm onSubmit={handleFormSubmit} />
              </Paper>
            </Box>
          ) : (
            <Box className="content-container">
              <Paper elevation={10} className="paper">
                {page === "intro" && (
                  <Introduction onStartGame={handleStartGame} />
                )}
                {page === "game" && (
                  <EscapeRoom
                    initialData={userData}
                    onComplete={handleCompleteGame}
                  />
                )}
                {page === "conclusion" && <Conclusion />}
              </Paper>
            </Box>
          )}
        </Box>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
