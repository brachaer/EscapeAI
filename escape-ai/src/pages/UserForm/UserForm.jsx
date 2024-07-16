import React from "react";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/system";
import Header from "../../components/Header/Header";

const languages = [
  { value: "hebrew", label: "Hebrew" },
  { value: "english", label: "English" },
];

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& > *": {
    marginBottom: "1rem",
    width: "100%",
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.theme) {
    errors.theme = "Required";
  }
  if (!values.numStages) {
    errors.numStages = "Required";
  } else if (values.numStages < 3 || values.numStages > 10) {
    errors.numStages = "Please select a number between 3 and 10";
  }

  return errors;
};

const UserForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      theme: "",
      numStages: "",
      difficulty: "",
      language: "",
    },
    validate,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Header text="Sign In" varient="h2" />

        <Form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Intrest Theme"
            variant="outlined"
            name="theme"
            value={formik.values.theme}
            onChange={formik.handleChange}
            error={formik.touched.theme && Boolean(formik.errors.theme)}
            helperText={formik.touched.theme && formik.errors.theme}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Number of Stages"
            variant="outlined"
            type="number"
            name="numStages"
            value={formik.values.numStages}
            onChange={formik.handleChange}
            error={formik.touched.numStages && Boolean(formik.errors.numStages)}
            helperText={formik.touched.numStages && formik.errors.numStages}
            required
            margin="normal"
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              name="difficulty"
              value={formik.values.difficulty}
              onChange={formik.handleChange}
              label="Difficulty"
              required
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Language</InputLabel>
            <Select
              name="language"
              value={formik.values.language}
              onChange={formik.handleChange}
              label="Language"
            >
              {languages.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Start Game
          </Button>
        </Form>
      </Grid>
    </Grid>
  );
};

export default UserForm;
