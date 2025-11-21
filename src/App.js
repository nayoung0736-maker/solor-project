import React, { useEffect, useState } from "react";

function App() {
  const [generators, setGenerators] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("/solor_data.csv")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const decoder = new TextDecoder("euc-kr");
        const text = decoder.decode(buffer);

        const lines = text.split(/\r?\n/);
        const dataLines = lines.slice(1);

        const uniqueGenerators = Array.from(
          new Set(
            dataLines
              .map((line) => line.split(",")[0]?.trim())
              .filter((name) => name)
          )
        );

        setGenerators(uniqueGenerators);
      })
      .catch((err) => console.error("CSV fetch 실패:", err));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // 가로 중앙
        alignItems: "center",     // 세로 중앙
        height: "5vh",           // 화면 높이의 80%
        outline: "none",        // 클릭 시 생기는 검정 테두리 제거
        textAlign: "center",        // ★ 가운데 정렬
        textAlignLast: "center",    // ★ 선택된 항목도 가운데 정렬
        
      }}
    >
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ width: "250px", padding: "10px", fontSize: "16px" }}
      >
        <option value="">선택하세요</option>
        {generators.map((gen, idx) => (
          <option key={idx} value={gen}>
            {gen}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
