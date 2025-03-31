import { useState } from "react";

export default function UndoableCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [undoStack, setUndoStack] = useState([]);

  const handleAction = (value) => {
    const newCount = count + value;
    setHistory([{ action: value, before: count, after: newCount }, ...history].slice(0, 50));
    setCount(newCount);
    setUndoStack([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const [lastAction, ...rest] = history;
    setUndoStack([lastAction, ...undoStack]);
    setCount(lastAction.before);
    setHistory(rest);
  };

  const handleRedo = () => {
    if (undoStack.length === 0) return;
    const [lastUndo, ...rest] = undoStack;
    setHistory([lastUndo, ...history]);
    setCount(lastUndo.after);
    setUndoStack(rest);
  };

  return (
    <div className="flex flex-col items-center p-20 space-y-4 min-h-screen">
      <h1 className="text-3xl font-bold">Undoable Counter</h1>
      <div className="flex space-x-4">
        <button onClick={handleUndo} disabled={history.length === 0} className={`px-4 py-2 border ${history.length === 0 ? 'opacity-50' : 'bg-white'}`}>Undo</button>
        <button onClick={handleRedo} disabled={undoStack.length === 0} className={`px-4 py-2 border ${undoStack.length === 0 ? 'opacity-50' : 'bg-white'}`}>Redo</button>
      </div>
      <div className="flex space-x-2">
        {[-100, -10, -1, 1, 10, 100].map((value) => (
          <button
            key={value}
            onClick={() => handleAction(value)}
            className="px-4 py-2 border shadow-sm hover:bg-gray-200"
          >
            {value > 0 ? `+${value}` : value}
          </button>
        ))}
      </div>
      <div className="text-4xl font-bold">{count}</div>
      <h2 className="text-xl font-semibold">History</h2>
      <div className="border p-4 w-64 shadow-md">
        {history.map((entry, index) => (
          <div key={index} className="text-sm">
            {entry.action > 0 ? `+${entry.action}` : entry.action} ({entry.before} → {entry.after})
          </div>
        ))}
      </div>
    </div>
  );
}