import React, { useState } from "react";
import styles from "./GameStage.module.css";

const GameStage = ({ stage, onNextStage, showTransition }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    if (index === stage.correctOption) {
      setSelectedOption(null);
      onNextStage();
    } else {
      alert("נסה שוב...");
    }
  };

  return (
    <div className={styles.container}>
      {showTransition ? (
        <div className={styles.transitionMessage}>כל הכבוד! הדלת נפתחה!</div>
      ) : (
        <div>
          <h1>{stage.title}</h1>
          <p>{stage.description}</p>
          <p>{stage.question}</p>
          <div className={styles.options}>
            {stage.options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${
                  selectedOption === index ? styles.selectedOption : ""
                }`}
                onClick={() => handleOptionClick(index)}
                style={{
                  borderColor:
                    selectedOption === stage.correctOption &&
                    selectedOption === index
                      ? "green"
                      : "#ccc",
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStage;
