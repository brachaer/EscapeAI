import React from "react";
import styles from "./Subtitle.module.css";

function Subtitle({ value }) {
  return (
    <div>
      <h2 className={styles.subtitle}>{value}</h2>
    </div>
  );
}

export default Subtitle;
