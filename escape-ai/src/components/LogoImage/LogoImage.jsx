import React from "react";
import { Box } from "@mui/system";
function LogoImage({ src, width }) {
  return (
    <Box
      component="img"
      src={src}
      alt="Escape AI"
      sx={{
        width: { width },
        height: "auto",
        mb: 2,
        padding: "1%",
        margin: "2%",
        borderRadius: "50%",
        border: "2px solid #ccc",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    />
  );
}

export default LogoImage;
