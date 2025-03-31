import { useEffect, useRef, useState } from "react";

const useTicTacToe = ({ cells }) => {
  const [gameHistory, setGameHistory] = useState([]);
  const [emptyCells, setEmptyCells] = useState(cells);
  const [userMoves, setUserMoves] = useState([]);
  const [botMoves, setBotMoves] = useState([]);
  const [disableUser, setDisableUser] = useState(false);
  const [highLightedRowCells, setHighLightedCells] = useState([]);
  const [currentWon, setCurrentWon] = useState(null);
  const botRef = useRef(null);

  /* User cell click action */
  const onClickCell = (cell) => {
    if (disableUser || userMoves.includes(cell) || botMoves.includes(cell)) return;
    setUserMoves([...userMoves, cell]);
    setEmptyCells(emptyCells.filter((c) => c !== cell));
  };

  /* Get cell color */
  const getCellColor = (cell) => {
    if (highLightedRowCells.includes(cell)) return 'highlighted-cell'; // Highlight winning cells
    if (userMoves.includes(cell)) return 'bg-gray-700 text-white';
    if (botMoves.includes(cell)) return 'bg-gray-400 text-secondary';
    return 'bg-white';
  };

  /* Get cell value */
  const getValue = (cell) => {
    if (userMoves.includes(cell)) return 'X';
    if (botMoves.includes(cell)) return 'O';
    return '';
  };

  /* Check who won */
  const checkWin = () => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of winningCombinations) {
      if (userMoves.includes(a) && userMoves.includes(b) && userMoves.includes(c)) {
        setHighLightedCells([a, b, c]); // Highlight winning cells
        return "user";
      }
      if (botMoves.includes(a) && botMoves.includes(b) && botMoves.includes(c)) {
        setHighLightedCells([a, b, c]); // Highlight winning cells
        return "bot";
      }
    }
    return null;
  };

  /* Check if draw */
  const checkDraw = () => emptyCells.length === 0;

  /* Reset the game */
  const resetGame = () => {
    setBotMoves([]);
    setUserMoves([]);
    setEmptyCells(cells);
    setHighLightedCells([]);
    clearTimeout(botRef.current);
    setDisableUser(false);
    setCurrentWon(null);
  };

  const getBestBotMove = (emptyCells, userMoves, botMoves) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]
    ];

    // 1. Check if bot can win
    for (let [a, b, c] of winningCombinations) {
      const botSet = new Set(botMoves);
      const missing = [a, b, c].filter(cell => !botSet.has(cell));
      if (missing.length === 1 && emptyCells.includes(missing[0])) return missing[0]; 
    }

    // 2. Check if user is about to win and block
    for (let [a, b, c] of winningCombinations) {
      const userSet = new Set(userMoves);
      const missing = [a, b, c].filter(cell => !userSet.has(cell));
      if (missing.length === 1 && emptyCells.includes(missing[0])) return missing[0]; 
    }

    // 3. Take center if available
    if (emptyCells.includes(4)) return 4;

    // 4. Take a corner if available
    const corners = [0, 2, 6, 8].filter(cell => emptyCells.includes(cell));
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

    // 5. Pick a random move
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  useEffect(() => {
    if (userMoves.length && !disableUser) {
      setDisableUser(true);
      botRef.current = setTimeout(() => {
        const bestMove = getBestBotMove(emptyCells, userMoves, botMoves);
        if (bestMove !== undefined) {
          setBotMoves([...botMoves, bestMove]);
          setEmptyCells(emptyCells.filter((c) => c !== bestMove));
        }
        setDisableUser(false);
      }, 1000);
    }
  }, [userMoves]);

  useEffect(() => {
    /* Continuously checking who won / draw */
    const winner = checkWin();
    const draw = checkDraw();
    if (winner || draw) {
      setTimeout(() => {
        setCurrentWon(winner || "draw");
        setGameHistory([...gameHistory, { win: winner || "draw", time: new Date() }]);
        setDisableUser(true);
        clearTimeout(botRef.current);
      }, 500); // Delay reset to allow highlighting effect
    }
  }, [userMoves, botMoves]);

  return {
    gameHistory,
    onClickCell,
    getCellColor,
    getValue,
    highLightedRowCells, // Pass to UI for styling
    resetGame,
    currentWon
  };
};

export default useTicTacToe;