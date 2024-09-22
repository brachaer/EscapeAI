import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainContentWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.mixins.toolbar.minHeight,
  padding: theme.spacing(3),
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
      <Container maxWidth={isMobile ? "sm" : "xl"} my={2}>
        {children}
      </Container>
    </MainContentWrapper>
  );
};

export default MainContent;
