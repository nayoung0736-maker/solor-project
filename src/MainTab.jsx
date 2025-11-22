import React, { useState, useEffect } from "react";
import PlantDropdown from "./PlantDropdown";

export default function MainTab() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 반응형: 화면 크기 감지
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const outerStyle = {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#0F2F1C",
    position: "relative",
    overflow: "hidden",
  };

  const topBoxStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    minHeight: windowWidth < 768 ? "8vh" : "5vh",
    backgroundColor: "#060333",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  };

  return (
    <div style={outerStyle}>
      <div style={topBoxStyle}>
        <PlantDropdown windowWidth={windowWidth} />
      </div>
    </div>
  );
}
