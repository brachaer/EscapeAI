import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Fade } from "@mui/material";
import { Replay as ReplayIcon } from "@mui/icons-material";
import Header from "../Header/Header";
import MyText from "../MyText/MyText";
import { useTranslation } from "react-i18next";

const GameEnd = ({ description, startGame }) => {
  const [showContent, setShowContent] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <Fade in={showContent} timeout={1000}>
      <Container
        sx={{
          textAlign: "center",
          minWidth: "100%",
        }}
      >
        <Header text="success" variant="h4" />
        <Typography
          variant="body1"
          style={{ wordWrap: "break-word", marginBottom: "3%" }}
        >
          {description}
        </Typography>
        <MyText variant="h6" text="thanks" />
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
