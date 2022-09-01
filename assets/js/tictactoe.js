// Helper functions

// Deep copies an object
// will not work on objects with functions
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const TicTacToe = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  history: [
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  ],
  replayIndex: 0,
  currentPlayer: "X",
};

TicTacToe.getBoard = function () {
  return this.board;
};

TicTacToe.reset = function () {
  this.board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  this.history = [
    [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  ];
  this.replayIndex = 0;
  this.currentPlayer = "X";
};

TicTacToe.setRandomPlayer = function () {
  this.currentPlayer = ["O", "X"][Math.floor(Math.random() * 2)];
};

TicTacToe.switchPlayer = function () {
  this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
};

TicTacToe.saveboard = function () {
  this.history.push(deepCopy(this.board));
  this.replayIndex = this.history.length;
};

TicTacToe.mark = function (mark, position) {
  const { col, row } = position;
  const newBoard = deepCopy(this.board);
  newBoard[row][col] = mark;
  this.board = newBoard;
  this.saveboard();
};

TicTacToe.cycleNext = function () {
  this.replayIndex = Math.min(this.history.length - 1, this.replayIndex + 1);
  this.board = this.history[this.replayIndex];
};

TicTacToe.cyclePrev = function () {
  this.replayIndex = Math.max(0, this.replayIndex - 1);
  this.board = this.history[this.replayIndex];
};

TicTacToe.getWinner = function () {
  const marks = ["O", "X"];
  const winIndexCombinations = [
    "012",
    "345",
    "678",
    "036",
    "147",
    "258",
    "048",
    "246",
  ];

  const getIndexStrOf = (mark) => {
    return this.board
      .flat()
      .reduce((acc, val, index) => {
        if (val === mark) return [...acc, index];
        return acc;
      }, [])
      .sort()
      .join("");
  };

  const winner = marks.find((mark) => {
    const indexStr = getIndexStrOf(mark);

    // true if atleast one of the combinations
    // has each of the indeces included in indexStr
    return winIndexCombinations.some((combination) => {
      // true if all of the characters in combination
      // is included in indexStr
      return Array.from(combination).every(
        (char) => indexStr.indexOf(char) !== -1
      );
    });
  });

  return winner;
};

TicTacToe.isDraw = function () {
  return this.history.length === 10 && !!this.getWinner();
};

TicTacToe.isGameOver = function () {
  return this.isDraw() || !!this.getWinner();
};

export default TicTacToe;
