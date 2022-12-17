/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
const size = 9;

function solve(boardString) {
  //   // let regexp = /(.{9})\s*(.{9})\s*(.{9})\s*(.{9})\s*(.{9})\s*(.{9})\s*(.{9})\s*(.{9})\s*(.{9})/gi
  //   // return boardString.replace(regexp, '$1,$2,$3,$4,$5,$6,$7,$8,$9').split(',')
  const regX = /.{9}/g;
  const board = boardString.match(regX).map((el) => el.split(''));

  const findEmpty = (board) => {
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board.length; j += 1) {
        if (board[i][j] === '-') {
          // board[i][j] = (Math.floor(Math.random() * (10 - 1)) + 1).toString();
          return [i, j];
        }
      }
    }
    return null;
  };
}
console.log(
  solve(
    '6-873----2-----46-----6482--8---57-19--618--4-31----8-86-2---39-5----1--1--4562--'
  )
);

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(board) {
  board.every((el) => {
    if (el.reduce((acc, elS) => acc + Number(elS), 0) !== 45) return false;
  });

  for (let i = 0; i < size; i += 1) {
    const result = [];
    for (let q = 0; q < size; q += 1) {
      result.push(board[q][i]);
    }
    if (result.reduce((a, b) => a + Number(b), 0) !== 45) {
      return false;
    }
  }
}
// console.log(isSolved(solve('6-873----2-----46-----6482--8---57-19--618--4-31----8-86-2---39-5----1--1--4562--')))

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
