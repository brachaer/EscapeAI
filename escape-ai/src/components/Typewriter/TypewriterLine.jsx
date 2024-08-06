import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

const TypewriterLine = ({ text, speed = 50, onComplete }) => {
  const { t } = useTranslation();
  const translatedText = t(text);

  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  useEffect(() => {
    if (currentCharIndex >= translatedText.length) {
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + translatedText[currentCharIndex]);
      setCurrentCharIndex((prev) => prev + 1);
    }, speed);

    return () => clearInterval(interval);
  }, [currentCharIndex, translatedText, speed, onComplete]);

  return (
    <Box>
      <Typography>{displayedText}</Typography>
    </Box>
  );
};

export default TypewriterLine;
