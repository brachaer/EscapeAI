import React from "react";
import { Container, Paper, CircularProgress } from "@mui/material";
import MyText from "../MyText/MyText";
import videoSource from "../../assets/escape_bg_mobile.mp4";
import { Box } from "@mui/system";

const Loading = () => (
  <Container
    maxWidth="sm"
    sx={{
      position: "relative",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
    }}
  >
    <Box>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "85%",
          height: "85%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support video.
      </video>
      <Container
        maxWidth="sm"
        sx={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
          <CircularProgress />
          <MyText variant={"h6"} text={"loading"} />
        </Paper>
      </Container>
    </Box>
  </Container>
);

export default Loading;
