export const menuItems = [
  {
    name: "Home",
    key: "",
    children: [
      { name: "Resume.pdf", link: "/resume.pdf"  },
    ],
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
    children: [{ name: "Vacation.png" }],
  },
];
