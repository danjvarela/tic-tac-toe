import TicTacToe from "./tictactoe.js";

/********************************************************************************
 * Helper functions
 ********************************************************************************/
const curry = (func) => {
  return function curried(...args) {
    return func.length !== args.length
      ? curried.bind(null, ...args)
      : func(...args);
  };
};

const convertToPosition = (index) => ({
  row: Math.floor(index / 3),
  col: index % 3,
});

const query = (str, element = document) => element.querySelector(str);
const queryAll = (str, element = document) => element.querySelectorAll(str);
const addClass = curry((className, element) =>
  element.classList.add(className)
);
const removeClass = curry((className, element) =>
  element.classList.remove(className)
);
/********************************************************************************/

let tictactoe = new TicTacToe();

const xmark = `<i class="fa-solid fa-x"></i>`;
const circlemark = `<i class="fa-regular fa-circle"></i>`;
const cells = queryAll(".cell");
const gameStatus = query("#game-status");
const prevBtn = query("#prev-btn");
const nextBtn = query("#next-btn");
const resetBtn = query("#reset-btn");

const makeUnclickable = addClass("unclickable");
const makeClickable = removeClass("unclickable");
const show = removeClass("d-none");
const unShow = addClass("d-none");

const markMap = {
  X: xmark,
  O: circlemark,
};

const renderBoard = () => {
  tictactoe.currentBoard.flat().forEach((mark, index) => {
    cells[index].innerHTML = markMap[mark] ?? "";
  });
};

const resetGame = () => {
  tictactoe = new TicTacToe();
  renderBoard();
  // make the cells clickable
  cells.forEach((cell) => makeClickable(cell));
  // show these elements
  [gameStatus, prevBtn, nextBtn].forEach((element) => unShow(element));
};

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    tictactoe.mark(convertToPosition(index));
    renderBoard();
    // make the cell unclickable
    makeUnclickable(cell);

    if (tictactoe.isGameOver) {
      // make all cells unclickable
      cells.forEach((cell) => makeUnclickable(cell));
      [gameStatus, prevBtn, nextBtn].forEach((element) => show(element));
      gameStatus.innerHTML = tictactoe.isDraw
        ? "Draw"
        : `${tictactoe.winner} wins`;
    } else {
      tictactoe.switchPlayer();
    }
  });
});

resetBtn.addEventListener("click", resetGame);
nextBtn.addEventListener("click", () => {
  tictactoe.cycleNext();
  renderBoard();
});
prevBtn.addEventListener("click", () => {
  tictactoe.cyclePrev();
  renderBoard();
});

tictactoe.randomPlayer();
