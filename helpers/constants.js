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
      { name: "Nested Checkbox", link: "/machine-coding/nested-checkbox" },
    ],
  },
  {
    name: "Images",
    key: "images",
    children: [{ name: "Mohit.png", link: "/images/mohit.png" }],
  },
];


export const checkboxData = [
  {
    id: 1,
    name: "Parent 1",
    children: [
      {
        id: 1,
        name: "Child 1.1",
        children: [
          { id: 1, name: "Child 1.1.1" },
          { id: 2, name: "Child 1.1.2" },
          {
            id: 3,
            name: "Child 1.1.3",
            children: [
              { id: 1, name: "Child 1.1.3.1" },
              { id: 2, name: "Child 1.1.3.2" },
              { 
                id: 3,
                name: "Child 1.1.3.3",
                children: [
                  { id: 1, name: "Child 1.1.3.3.1" },
                  { 
                    id: 2, 
                    name: "Child 1.1.3.3.2",
                    children: [
                      { id: 1, name: "Child 1.1.3.3.2.1" },
                      { id: 2, name: "Child 1.1.3.3.2.2" },
                    ]
                  },
                  { id: 3, name: "Child 1.1.3.3.3" },
                ]
              },
            ],
          }
        ],
      },
      { id: 2, name: "Child 1.2" },
      { id: 3, name: "Child 1.3" },
      {
        id: 4,
        name: "Child 1.4",
        children: [
          { id: 1, name: "Child 1.4.1" },
          { id: 2, name: "Child 1.4.2" },
          { id: 3, name: "Child 1.4.3" },
        ],
      }
    ]
  }
]


export const MENU_VERSION = 'v2.0';