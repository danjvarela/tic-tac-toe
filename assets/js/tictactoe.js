// Deep copies an object
// will not work on objects with functions
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

class TicTacToe {
  constructor() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    this.history = [deepCopy(this.board)];
    this.replayIndex = 0;
    this.player = "X";
  }

  get currentBoard() {
    return this.board;
  }

  get currentPlayer() {
    return this.player;
  }

  randomPlayer() {
    this.player = ["O", "X"][Math.floor(Math.random() * 2)];
  }

  switchPlayer() {
    this.player = this.player === "X" ? "O" : "X";
  }

  saveboard() {
    this.history.push(deepCopy(this.board));
    this.replayIndex = this.history.length;
  }

  mark(position) {
    const { col, row } = position;
    const newBoard = deepCopy(this.board);
    newBoard[row][col] = this.currentPlayer;
    this.board = newBoard;
    this.saveboard();
  }

  cycleNext() {
    this.replayIndex = Math.min(this.history.length - 1, this.replayIndex + 1);
    this.board = this.history[this.replayIndex];
  }

  cyclePrev() {
    this.replayIndex = Math.max(0, this.replayIndex - 1);
    this.board = this.history[this.replayIndex];
  }

  get winner() {
    const marks = ["O", "X"];
    const winIndexCombinations = "012/345/678/036/147/258/048/246";

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
      return winIndexCombinations.split("/").some((combination) => {
        // true if all of the characters in combination
        // is included in indexStr
        return Array.from(combination).every(
          (char) => indexStr.indexOf(char) !== -1
        );
      });
    });
    return winner;
  }

  get isDraw() {
    return this.history.length === 10 && !!this.winner;
  }

  get isGameOver() {
    return this.isDraw || !!this.winner;
  }
}

export default TicTacToe;
