import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainContentWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.mixins.toolbar.minHeight,
  padding: theme.spacing(15),
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    marginTop: "10%",
    padding: theme.spacing(2),
  },
}));

const MainContent = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MainContentWrapper>
      <Container
        maxwidth={isMobile ? "sm" : "xl"}
        my={2}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "8px",
          padding: "5%",
          marginTop: "5vh",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Container>
    </MainContentWrapper>
  );
};

export default MainContent;
