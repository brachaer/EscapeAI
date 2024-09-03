import React from "react";
import { Container, Paper, CircularProgress } from "@mui/material";
import MyText from "../MyText/MyText";

const Loading = () => (
  <Container maxWidth="sm">
    <Paper
      elevation={3}
      style={{ padding: "20px", marginTop: "20px", textAlign: "center" }}
    >
      <CircularProgress />
      <MyText variant={"h6"} text={"loading"} />
    </Paper>
  </Container>
);

export default Loading;
