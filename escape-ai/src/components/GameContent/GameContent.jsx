import React from "react";
import { Button, Grid, Alert, Typography } from "@mui/material";
import MyText from "../MyText/MyText";

const GameContent = ({
  description,
  options,
  handleAction,
  isGameOver,
  error,
  stateId,
}) => (
  <div maxwidth="100%">
    {error && (
      <Alert severity="error" style={{ marginBottom: "20px" }}>
        {error}
      </Alert>
    )}
    <Typography
      variant={"body1"}
      text={description}
      style={{ maxwidth: "100%", wordWrap: "break-word" }}
    />
    <Grid container spacing={2}>
      {options &&
        options.map((option) => (
          <Grid item xs={12} sm={6} key={option.id}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleAction(option.id)}
              disabled={isGameOver || !!error || !stateId}
              sx={{
                borderRadius: "12px",
                padding: "10px",
                fontSize: "0.875rem",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              {option.description}
            </Button>
          </Grid>
        ))}
    </Grid>
  </div>
);

export default GameContent;
