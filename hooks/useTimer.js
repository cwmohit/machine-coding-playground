import { useState, useEffect } from "react";

function useTimer(initialTime, mode = "countup") {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (mode === "countdown" && prevTime === 0) {
          clearInterval(interval); 
          setIsRunning(false);
          return 0;
        }

        return mode === "countup" ? prevTime + 1 : prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  return { time, isRunning, start, stop, reset };
}

export default useTimer;
