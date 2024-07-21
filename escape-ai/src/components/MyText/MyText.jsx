import React from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

function MyText({ text, variant }) {
  const { t } = useTranslation();

  return (
    <div>
      <Typography variant={variant} gutterBottom>
        {t(text)}
      </Typography>
    </div>
  );
}
export default MyText;
