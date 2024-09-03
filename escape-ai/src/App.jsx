import React, { useState } from "react";
import UserForm from "./pages/UserForm/UserForm";
import EscapeRoom from "./pages/EscapeRoom/EscapeRoom";
import Introduction from "./pages/Introduction/Introduction";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import videoSource from "./assets/escape_bg_desktop.mp4";
import "./App.css";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState("intro");

  const handleFormSubmit = (formData) => {
    setUserData(formData);
    setGameStarted(true);
  };

  const handleStartGame = () => {
    setPage("game");
  };

  return (
    <Box>
      <video autoPlay loop muted className="background-video">
        <source src={videoSource} type="video/mp4" />
        Your browser does not support video.
      </video>
      <NavBar />
      <Box className="content-container">
        <Paper elevation={10} className="paper">
          <Header text={gameStarted ? "" : "welcome"} variant="h3" />
          {!gameStarted ? (
            <UserForm onSubmit={handleFormSubmit} />
          ) : page === "intro" ? (
            <Introduction onStartGame={handleStartGame} />
          ) : (
            <EscapeRoom initialData={userData} />
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default App;
