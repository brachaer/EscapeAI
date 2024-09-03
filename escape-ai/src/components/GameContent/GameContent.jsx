import React from "react";
import { Button, Grid, Alert } from "@mui/material";
import MyText from "../MyText/MyText";
const GameContent = ({
  description,
  options,
  handleAction,
  isGameOver,
  error,
  stateId,
}) => (
  <div>
    {error && (
      <Alert severity="error" style={{ marginBottom: "20px" }}>
        {error}
      </Alert>
    )}
    <MyText variant={"body1"} text={description} />
    <Grid container spacing={2}>
      {options &&
        options.map((option) => (
          <Grid item xs={12} key={option.id}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleAction(option.id)}
              disabled={isGameOver || error || !stateId}
            >
              {option.description}
            </Button>
          </Grid>
        ))}
    </Grid>
  </div>
);

export default GameContent;
