import React, { useState } from "react";
import { stages } from "../../components/Stages/StageData";
import GameStage from "../../components/Stages/GameStage";

const GamePage = ({ onComplete }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [showTransition, setShowTransition] = useState(false);

  const handleNextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setShowTransition(true);
      setTimeout(() => {
        setShowTransition(false);
        setCurrentStageIndex((prevStage) => prevStage + 1);
      }, 3000);
    } else {
      alert("כל הכבוד! סיימת את כל השלבים!");
      onComplete();
    }
  };

  return (
    <div>
      <GameStage
        stage={stages[currentStageIndex]}
        onNextStage={handleNextStage}
        showTransition={showTransition}
      />
    </div>
  );
};

export default GamePage;
