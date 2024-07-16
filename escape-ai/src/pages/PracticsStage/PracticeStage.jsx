import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./PracticeStage.module.css";
import Header from "../../components/Header/Header";
import Container from "@mui/material/Container";

const PracticeStage = ({ onComplete }) => {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (answer.toLowerCase() === "escape") {
      setIsCorrect(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    } else {
      alert("Try again!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ p: 2, border: "2px solid grey" }}>
      <Header text="Practice Stage" varient="h3" />
      <Typography variant="body1" gutterBottom>
        Solve this simple puzzle to proceed. What is the secret word?
      </Typography>

      <Typography variant="body2" gutterBottom className={styles.hint}>
        Hint: It's what you're trying to do in this game.
      </Typography>
      <br />

      <TextField
        label="Your Answer"
        variant="outlined"
        value={answer}
        onChange={handleInputChange}
        // className={styles.input}
      />
      <br />
      <br />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        //        className={styles.button}
      >
        Submit
      </Button>
      <br />

      {isCorrect && (
        <Typography
          variant="body2"
          //className={styles.correctMessage}
        >
          Correct! Moving to the next stage...
        </Typography>
      )}
    </Container>
  );
};

export default PracticeStage;
