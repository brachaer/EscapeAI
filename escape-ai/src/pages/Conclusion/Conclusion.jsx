import React from "react";
import Container from "@mui/material/Container";
import Header from "../../components/Header/Header";
import MyText from "../../components/MyText/MyText";

const Conclusion = () => {
  return (
    <Container maxWidth="sm" sx={{ p: 2, border: "2px solid grey" }}>
      <Header text="congratulations" variant="h2" />
      <MyText text="completed" variant="body1" />
      <MyText text="thanks" variant="body1" />
    </Container>
  );
};

export default Conclusion;
