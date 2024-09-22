import { useMediaQuery } from "@mui/material";

export const useBreakpoints = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:600px) and (max-width:960px)"
  );
  const isLargeScreen = useMediaQuery("(min-width:960px)");

  return { isSmallScreen, isMediumScreen, isLargeScreen };
};
