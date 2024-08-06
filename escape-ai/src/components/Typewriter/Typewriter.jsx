import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import TypewriterLine from "./TypewriterLine";

const Typewriter = ({ text, speed = 50, onComplete }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const lines = text.replace(/\\n/g, "\n").split("\n");

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (onComplete) onComplete();
      return;
    }
  }, [currentLineIndex, lines, onComplete]);

  const handleLineComplete = () => {
    setTimeout(() => {
      setCurrentLineIndex((prev) => prev + 1);
    }, 500);
  };

  return (
    <Box>
      {lines.slice(0, currentLineIndex + 1).map((line, index) => (
        <TypewriterLine
          key={index}
          text={line}
          speed={speed}
          onComplete={
            index === currentLineIndex ? handleLineComplete : undefined
          }
        />
      ))}
    </Box>
  );
};

export default Typewriter;
