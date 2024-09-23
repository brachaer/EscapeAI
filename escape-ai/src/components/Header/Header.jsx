import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";

function Header({ text, variant, lang }) {
  const { t } = useTranslation();
  // const { lang } = useLanguage();

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
