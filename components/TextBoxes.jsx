import { useState } from "react";

export default function TextBoxes({ numberToColors, eliminatedNumbers, setEliminatedNumbers }) {
  const [boxes, setBoxes] = useState(Array(30).fill(""));
  const [inputValue, setInputValue] = useState("");

  const handleEliminate = (num) => {
    setEliminatedNumbers((prev) => {
      const updated = prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num];
      return [...updated]; // ✅ Force new reference so React detects change
    });
  };

  const handleSubmit = () => {
    const firstEmptyIndex = boxes.findIndex((text) => text === "");
    if (firstEmptyIndex !== -1 && inputValue.trim()) {
      const updatedBoxes = [...boxes];
      updatedBoxes[firstEmptyIndex] = inputValue;
      setBoxes(updatedBoxes);
      setInputValue("");
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 justify-center my-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==="Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="border p-2 w-64"
          placeholder="Enter text"
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">
          Submit
        </button>
      </div>
      <div className="grid 2xl:grid-cols-8 lg:grid-cols-4 md:grid-cols-3 gap-4">
        {boxes.map((text, index) => {
          const boxNumber = index + 1;
          const colors = numberToColors[boxNumber] || [];
          const isEliminated = eliminatedNumbers.includes(boxNumber);
          const backgroundStyle = isEliminated
  ? "#000000" // 🔥 Explicitly set background to black when eliminated
  : colors.length > 1
  ? `linear-gradient(to right, ${colors[0]} 0%, ${colors[0]} 40%, ${colors[1]} 60%, ${colors[1]} 100%)`
  : colors[0] || "white";
          return (
            <div
    key={index}
    className={`border border-black flex flex-col items-center relative ${
      isEliminated ? "line-through text-white" : ""
    }`}
    style={{ background: backgroundStyle }}
  >
    <span className="mb-2 bg-black text-white p-1 text-4xl">{boxNumber}</span>
    <div className={`h-10 w-full border flex items-center justify-center bg-white text-black text-3xl ${isEliminated ? 'opacity-20' : ''}`}>
      {text.toUpperCase()}
    </div>
    <div className="flex justify-around w-[200px]">
    <button
      onClick={() => handleEliminate(boxNumber)}
      className={`mt-2 p-1 ${isEliminated ? "bg-gray-500 opacity-50 text-white" : "bg-white text-black"} `}
    >
      {isEliminated ? "Undo Elimination" : "Eliminate"}
    </button>
    <button
      onClick={() => {
        const updatedBoxes = [...boxes];
        updatedBoxes[index] = "";
        setBoxes(updatedBoxes);
      }}
      className={`mt-2 bg-white text-black p-1 ${isEliminated ? 'opacity-10' : ''}`}
    >
      Clear
    </button>
    </div>
  </div>
          );
        })}
      </div>
    </div>
  );
}
