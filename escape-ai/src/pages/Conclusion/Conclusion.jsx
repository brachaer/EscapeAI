import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header/Header";

const Conclusion = () => {
  return (
    <Container maxWidth="sm" sx={{ p: 2, border: "2px solid grey" }}>
      <Header text="Congratulations" varient="h2" />
      <Typography variant="body1" gutterBottom>
        You have successfully completed Escape AI.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thank you for playing.
      </Typography>
    </Container>
  );
};

export default Conclusion;
