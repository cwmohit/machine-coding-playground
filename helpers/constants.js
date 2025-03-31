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
      { name: "Resume.pdf" },
    ],
  },
  {
    name: "Images",
    key: "images",
    children: [{ name: "Vacation.png" }],
  },
];
