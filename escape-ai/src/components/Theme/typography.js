import { fontWeight } from "@mui/system";

export const getTypography = (lang, isMobile, isTablet) => ({
  fontFamily: lang === "he" ? " 'rubik', cursive" : "'Special Elite', Roboto",
  h1: {
    fontWeight: "bold",
    fontFamily: lang === "he" ? " 'rubik', cursive" : "'Special Elite', Roboto",
    fontSize: isMobile ? "2rem" : isTablet ? "2.5rem" : "3rem",
  },
  h2: {
    fontWeight: "bold",
    fontFamily: lang === "he" ? "'rubik', cursive" : "'Special Elite', Roboto",
    fontSize: isMobile ? "1.75rem" : isTablet ? "2rem" : "2.5rem",
  },
  h3: {
    fontWeight: "bold",
    fontFamily: lang === "he" ? " 'rubik', cursive" : "'Special Elite', Roboto",
    fontSize: isMobile ? "1.5rem" : isTablet ? "1.75rem" : "2rem",
  },
  h5: {
    fontFamily: lang === "he" ? "'rubik', cursive" : "'Special Elite', Roboto",
    fontSize: isMobile ? "1.25rem" : isTablet ? "1.4rem" : "1.5rem",
  },
  h6: {
    fontFamily: lang === "he" ? "'rubik', cursive" : "'Special Elite', Roboto",
    fontSize: isMobile ? "1.15rem" : isTablet ? "1.3rem" : "1.4rem",
  },
  body1: {
    fontFamily: lang === "he" ? "'rubik', cursive" : "'Special Elite', Roboto",
    fontSize: isMobile ? "0.875rem" : isTablet ? "1rem" : "1.1rem",
  },
  body2: {
    fontFamily: lang === "he" ? "'rubik', cursive" : "'Special Elite', Roboto",
    fontSize: isMobile ? "0.700rem" : isTablet ? "0.9rem" : "1rem",
  },

  button: {
    fontWeight: "500",
    fontFamily:
      lang === "he"
        ? "'rubik', 'Amatic SC', cursive"
        : "'Special Elite', Roboto",
    fontSize: isMobile ? "0.8rem" : isTablet ? "0.9rem" : "1rem",
  },
});
