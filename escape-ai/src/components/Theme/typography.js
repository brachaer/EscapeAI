export const getTypography = (lang, isMobile, isTablet) => {
  const primaryFont =
    lang === "he"
      ? "'Noto Sans Hebrew', sans-serif"
      : "'Noto Sans', sans-serif";
  const accentFont =
    lang === "he" ? "'Assistant', sans-serif" : "'Quicksand', sans-serif";

  return {
    fontFamily: primaryFont,
    h1: {
      fontWeight: "bold",
      fontFamily: accentFont,
      fontSize: isMobile ? "2rem" : isTablet ? "2.5rem" : "3rem",
    },
    h2: {
      fontWeight: "bold",
      fontFamily: accentFont,
      fontSize: isMobile ? "1.75rem" : isTablet ? "2rem" : "2.5rem",
    },
    h3: {
      fontWeight: "bold",
      fontFamily: accentFont,
      fontSize: isMobile ? "1.5rem" : isTablet ? "1.75rem" : "2rem",
    },
    h5: {
      fontFamily: primaryFont,
      fontSize: isMobile ? "1.25rem" : isTablet ? "1.4rem" : "1.5rem",
    },
    h6: {
      fontFamily: primaryFont,
      fontSize: isMobile ? "1.15rem" : isTablet ? "1.3rem" : "1.4rem",
    },
    body1: {
      fontFamily: primaryFont,
      fontSize: isMobile ? "0.875rem" : isTablet ? "1rem" : "1.1rem",
    },
    body2: {
      fontFamily: primaryFont,
      fontSize: isMobile ? "0.7rem" : isTablet ? "0.9rem" : "1rem",
    },
    button: {
      fontWeight: "500",
      fontFamily: accentFont,
      fontSize: isMobile ? "0.8rem" : isTablet ? "0.9rem" : "1rem",
    },
  };
};
