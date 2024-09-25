import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Box, Fade } from "@mui/material";
import { Replay as ReplayIcon } from "@mui/icons-material";
import Header from "../Header/Header";
import MyText from "../MyText/MyText";
import { useTranslation } from "react-i18next";

const GameEnd = ({ description, isGameOver, startGame }) => {
  const [showContent, setShowContent] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <Fade in={showContent} timeout={1000}>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: "20px",
          textAlign: "center",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Header
          text="success"
          variant="h4"
          sx={{
            marginBottom: "16px",
          }}
        />
        <Container sx={{ marginBottom: "24px" }}>
          <MyText variant="body1" text={description} />
          <MyText variant="h4" text="thanks" />
        </Container>
        <Button
          variant="contained"
          onClick={startGame}
          startIcon={<ReplayIcon />}
          sx={{
            fontSize: "1.1rem",
            padding: "10px 20px",
            borderRadius: "25px",
          }}
        >
          {t("new_game")}
        </Button>
      </Container>
    </Fade>
  );
};

export default GameEnd;
