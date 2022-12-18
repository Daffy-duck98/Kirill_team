/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
const size = 9;

function solve(string) {
  const arrBoard = stringToArr(string);
  step = () => {
    const currPos = findEmptySpace(arrBoard);
    if (currPos === null) {
      return true;
    }
    for (let num = 1; num <= size; num += 1) {
      const isValid = validate(currPos, arrBoard, num);
      if (isValid) {
        const [y, x] = currPos;
        arrBoard[y][x] = String(num);
        if (step()) {
          return true;
        }
        arrBoard[y][x] = '-';
      }
    }
    return false;
  };
  step();
  return arrBoard;
}

function stringToArr(boardString) {
  const re = /.{9}/g;
  return boardString.match(re).map((line) => {
    return line.split('');
  });
}

function findEmptySpace(arrBoard) {
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (arrBoard[y][x] === '-') {
        return [y, x];
      }
    }
  }
  return null;
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
function isSolved(arrBoard) {
  arrBoard.every((line) => {
    if (line.reduce((a, b) => a + Number(b), 0) !== 45) return false;
  });
  for (let i = 0; i < size; i += 1) {
    const result = [];
    for (let j = 0; j < size; j += 1) {
      result.push(arrBoard[j][i]);
    }
    if (result.reduce((a, b) => a + Number(b), 0) !== 45) {
      return false;
    }
  }
  if (
    arrToString(arrBoard)
      .split('')
      .reduce((a, b) => a + Number(b), 0) !== 405
  ) {
    return false;
  }
  return true;
}

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
