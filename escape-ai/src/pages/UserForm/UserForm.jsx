import React, { useEffect } from "react";
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
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& > *": {
    marginBottom: "1rem",
    width: "100%",
  },
});

const validate = (values, t) => {
  const errors = {};
  if (!values.name) {
    errors.name = t("required");
  }
  if (!values.theme) {
    errors.theme = t("required");
  }

  return errors;
};

const UserForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const formik = useFormik({
    initialValues: {
      lang: language,
      name: "",
      theme: "",
      difficulty: "",
    },
    validate: (values) => validate(values, t),
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      onSubmit(values);
    },
  });

  useEffect(() => {
    formik.setFieldValue("lang", language);
  }, [language]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={6}>
        <Header text="sign_in" variant="h2" />
        <Form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label={t("name")}
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
            label={t("interest_theme")}
            variant="outlined"
            name="theme"
            value={formik.values.theme}
            onChange={formik.handleChange}
            error={formik.touched.theme && Boolean(formik.errors.theme)}
            helperText={formik.touched.theme && formik.errors.theme}
            required
            margin="normal"
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>{t("difficulty")}</InputLabel>
            <Select
              name="difficulty"
              value={formik.values.difficulty}
              onChange={formik.handleChange}
              label={t("difficulty")}
              required
            >
              <MenuItem value="easy">{t("easy")}</MenuItem>
              <MenuItem value="medium">{t("medium")}</MenuItem>
              <MenuItem value="hard">{t("hard")}</MenuItem>
            </Select>
            <br />
          </FormControl>
          <Button type="submit" variant="contained">
            {t("start_game")}
          </Button>
        </Form>
      </Grid>
    </Grid>
  );
};

export default UserForm;
