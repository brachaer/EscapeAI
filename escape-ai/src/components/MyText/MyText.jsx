import React from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";

function MyText({ text, variant, padding }) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  return (
    <div>
      <Typography
        variant={variant}
        gutterBottom
        sx={{
          padding: { padding },
          lineHeight: 2,
          direction: lang === "he" ? "rtl" : "ltr",
        }}
      >
        {t(text)}
      </Typography>
    </div>
  );
}
export default MyText;
