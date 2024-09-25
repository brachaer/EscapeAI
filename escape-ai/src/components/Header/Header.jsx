import React from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

function Header({ text, variant, lang }) {
  const { t } = useTranslation();

  return (
    <div>
      <Typography
        variant={variant}
        gutterBottom
        sx={{ direction: lang === "he" ? "rtl" : "ltr" }}
      >
        {t(text)}
      </Typography>
    </div>
  );
}
export default Header;
