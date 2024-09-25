import React, { useState } from "react";
import UserForm from "./pages/UserForm/UserForm";
import EscapeGame from "./pages/EscapeGame/EscapeGame";
import Introduction from "./pages/Introduction/Introduction";
import NavBar from "./components/NavBar/NavBar";
import MainContent from "./components/MainContent/MainContent";
import "./App.css";
import { Container } from "@mui/system";
import imgSrc from "./assets/escape_bg.jpeg";
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
    <Container
      disableGutters
      sx={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        minHeight: "130vh",
        minWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      <NavBar />
      <MainContent>
        {!gameStarted ? (
          <UserForm onSubmit={handleFormSubmit} />
        ) : page === "intro" ? (
          <Introduction onStartGame={handleStartGame} />
        ) : (
          <EscapeGame initialData={userData} />
        )}
      </MainContent>
    </Container>
  );
};

export default App;
