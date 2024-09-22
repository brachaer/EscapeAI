import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import imgSrc from "../../assets/loading_escape_ai.jpeg";
const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <img src={imgSrc} alt="Loading" style={{ width: "40%" }} />
      <CircularProgress style={{ marginTop: "5%" }} />
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
};

export default Loading;
