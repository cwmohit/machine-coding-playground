import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isStarted) {
      setIsRunning(false);
      alert("⏰ Time's up!");
      resetTimer();
    }
  }, [timeLeft, isStarted]);

  const resetTimer =() => {
    setTimeLeft(0);
    setIsRunning(false);
    setIsStarted(false);
    setHours("00");
    setMinutes("00");
    setSeconds("00");
  };

  const formatTime = (time) => {
    const hrs = String(Math.floor(time / 3600)).padStart(2, "0");
    const mins = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    return `${hrs} : ${mins} : ${secs}`;
  };

  const startTimer = () => {
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    setTimeLeft(totalSeconds);
    setIsRunning(true);
    setIsStarted(true);
  };

  return (
    <div className="flex flex-col items-center rounded-lg p-20 h-screen">
      <h1 className="text-2xl font-handwritten mb-4">Countdown Timer</h1>
      {!isStarted ? (
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-28 p-2 text-center border-2 border-gray-500 rounded-md"
            placeholder="HH"
            min="0"
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-28 p-2 text-center border-2 border-gray-500 rounded-md"
            placeholder="MM"
            min="0"
          />
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-28 p-2 text-center border-2 border-gray-500 rounded-md"
            placeholder="SS"
            min="0"
          />
        </div>
      ) : (
        <div className="text-2xl font-mono mb-4">{formatTime(timeLeft)}</div>
      )}

      {!isStarted ? (
        <button
          onClick={startTimer}
          className="px-10 py-2 border-2 rounded-2xl font-bold border-black bg-gray-900 sketch-button"
        >
          Start
        </button>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-10 py-2 border-2 rounded-2xl font-bold border-black bg-gray-900 sketch-button"
          >
            {isRunning ? "Pause" : "Resume"}
          </button>
          <button
            onClick={resetTimer}
            className="px-10 py-2 border-2 rounded-2xl font-bold border-black bg-gray-900 sketch-button"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;