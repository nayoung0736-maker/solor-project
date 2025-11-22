import React, { useState, useEffect } from "react";

export default function PlantDropdown({ windowWidth }) {
  const [generators, setGenerators] = useState([]);
  const [selected, setSelected] = useState("");

  // CSV에서 발전소명 가져오기
  useEffect(() => {
    fetch("/solor_data.csv")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const decoder = new TextDecoder("euc-kr");
        const text = decoder.decode(buffer);
        const lines = text.split(/\r?\n/).slice(1); // 헤더 제외
        const uniqueGenerators = Array.from(
          new Set(lines.map((line) => line.split(",")[0]?.trim()).filter(Boolean))
        );
        setGenerators(uniqueGenerators);
      })
      .catch((err) => console.error("CSV fetch 실패:", err));
  }, []);

  const dropdownStyle = {
    width: windowWidth < 768 ? "70%" : "30%",
    maxWidth: "250px",
    minWidth: "120px",
    height: "30px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#060333",
    color: "white",
    textAlign: "center",
  };

  return (
    <select
      style={dropdownStyle}
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
    >
      {generators.map((gen, idx) => (
        <option key={idx} value={gen}>
          {gen}
        </option>
      ))}
    </select>
  );
}
