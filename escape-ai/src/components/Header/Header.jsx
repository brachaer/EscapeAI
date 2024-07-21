import React from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import styles from "./Header.module.css";

function Header({ text, variant }) {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <Typography variant={variant} gutterBottom>
        {t(text)}
      </Typography>
    </div>
  );
}
export default Header;
