import TicTacToeCell from "@/Components/TicTacToe/TicTacToeCell";
import TicTacToeResult from "@/Components/TicTacToe/TicTacToeResult";
import useTicTacToe from "@/hooks/useTicTacToe";

const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function GameHome() {
  const {
    onClickCell,
    getCellColor,
    getValue,
    gameHistory,
    resetGame,
    currentWon,
  } = useTicTacToe({ cells });

  return (
    <div className="min-h-screen w-full p-8">
      <div className="w-[320px] md:w-[400px] h-[320px] xl:h-[400px] gap-2 mx-auto grid grid-cols-3 p-2 justify-center rounded-2xl bg-amber-400 border-4 border-gray-400">
        {cells?.map((cell) => (
          <TicTacToeCell
            key={cell}
            cell={cell}
            onClickCell={onClickCell}
            cellColor={getCellColor(cell)}
            value={getValue(cell)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 flex-row-reverse mt-4">
        <button
          className="px-10 py-2 border-2 rounded-2xl font-bold border-black bg-gray-900 sketch-button"
          onClick={resetGame}
        >
          Reset
        </button>
        {currentWon ? (
          <p className="text-lg">
            Result:{" "}
            {currentWon === "user"
              ? "Win"
              : currentWon === "bot"
              ? "Lost"
              : "Tie"}
          </p>
        ) : (
          ""
        )}
      </div>

      <hr className="mt-14 md:mt-20 border-t border-gray-500" />
      <TicTacToeResult gameHistory={gameHistory} />
    </div>
  );
}