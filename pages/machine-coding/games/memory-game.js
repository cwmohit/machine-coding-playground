import React, { useEffect, useMemo, useState } from "react";

const MemoryGame = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const grid = useMemo(() => {
    const numbers = [...Array(18).keys()].flatMap((n) => [n + 1, n + 1]);
    numbers.sort(() => Math.random() - 0.5);

    return Array.from({ length: 6 }, (_, row) =>
      numbers.slice(row * 6, row * 6 + 6)
    );
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setDisabled(true);
      const [first, second] = selectedCards;
      const [row1, col1] = first.split("_").map(Number);
      const [row2, col2] = second.split("_").map(Number);

      if (grid[row1][col1] === grid[row2][col2]) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, first, second]);
          setSelectedCards([]);
          setDisabled(false);
        }, 1000);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
          setDisabled(false);
        }, 1000);
      }
    }
  }, [selectedCards, grid]);

  useEffect(() => {
    if (matchedCards.length === 36) {
      setGameOver(true);
    }
  }, [matchedCards]);

  const onCellClick = (rowIndex, colIndex) => {
    const key = `${rowIndex}_${colIndex}`;
    if (selectedCards.includes(key) || matchedCards.includes(key) || disabled) return;
    setSelectedCards((prev) => [...prev, key]);
  };

  const resetGame = () => {
    setSelectedCards([]);
    setMatchedCards([]);
    setGameOver(false);
  };

  return (
    <div className="memory-game mt-10 text-center">
      <h1 className="text-3xl font-bold mb-5">Memory Game</h1>
      {gameOver && (
        <button className="px-10 py-2 border-2 rounded-2xl font-bold border-black bg-gray-900 sketch-button" onClick={resetGame}>
          Play Again
        </button>
      )}
      <div className="grid grid-cols-6 gap-2 max-w-md mx-auto">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const key = `${rowIndex}_${colIndex}`;
            const isRevealed = selectedCards.includes(key) || matchedCards.includes(key);

            return (
              <div
                key={key}
                className={`p-4 border cursor-pointer text-xl text-center ${
                  isRevealed ? "bg-white" : "bg-gray-300"
                } ${matchedCards.includes(key) ? "invisible" : ""}`}
                onClick={() => onCellClick(rowIndex, colIndex)}
              >
                {isRevealed ? cell : "?"}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MemoryGame;