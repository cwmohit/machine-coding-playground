export const menuItems = [
  {
    name: "Home",
    key: "",
    link: "/"
  },
  {
    name: "Machine Coding",
    key: "machine-coding",
    children: [
      {
        name: "Counter",
        key: "counter",
        children: [
          { name: "CountDown Timer", link: "/machine-coding/counters/countdown-timer" },
          { name: "Undoable counter", link: "/machine-coding/counters/undoable-counter" },
          { name: "StopWatch / Counter", link: "/machine-coding/counters/counter-stopwatch" },
        ],
      },
      {
        name: "Games",
        key: "games",
        children: [
          { name: "Memory Game", link: "/machine-coding/games/memory-game" },
          { name: "Tic Tac Toe", link: "/machine-coding/games/tic-tac-toe" },
        ],
      },
    ],
  },
  {
    name: "Images",
    key: "images",
    children: [{ name: "Mohit.png", link: "/images/mohit.png" }],
  },
];
