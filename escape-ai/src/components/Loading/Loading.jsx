import React from "react";
import videoSrc from "../../assets/please_wait.mp4";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        style={{
          maxHeight: "100%",
          objectFit: "contain",
          marginTop: "10vh",
        }}
      />
    </div>
  );
};

export default Loading;
