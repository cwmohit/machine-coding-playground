import useTimer from "@/hooks/useTimer";

// Timer Component
function Timer({ initialTime, mode, label }) {
  const { time, isRunning, start, stop, reset } = useTimer(initialTime, mode);

  return (
    <div className="flex flex-col items-center text-white p-4 gap-3">
      <h2 className="text-3xl font-bold">{label}</h2>
      <div className="text-5xl my-2">{time}s</div>
      <div className="flex gap-2">
        <button
          onClick={start}
          disabled={isRunning}
          className="px-10 py-2 border-2 rounded-2xl font-bold  bg-gray-900 sketch-button"
        >
          Start
        </button>
        <button
          onClick={stop}
          disabled={!isRunning}
          className="px-10 py-2 border-2 rounded-2xl font-bold  bg-gray-900 sketch-button"
        >
          Stop
        </button>
        <button
          onClick={reset}
          className="px-10 py-2 border-2 rounded-2xl font-bold  bg-gray-900 sketch-button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// App Component
export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center p-20 space-y-20">
      <Timer initialTime={0} mode="countup" label="Stopwatch" />
      <Timer initialTime={60} mode="countdown" label="Countdown" />
    </div>
  );
}
