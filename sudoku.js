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

function arrToString(stepdBoardArr) {
  return stepdBoardArr
    .map((line) => {
      return line.join('');
    })
    .join('');
}

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {
  const stringBoard = arrToString(board);
  let result = stringBoard.match(/.{9}/g).map((el) => {
    el = el.split('');
    el.unshift('\uD83D\uDE00');
    el.push('\uD83D\uDE00');
    el.splice(4, 0, '\uD83D\uDE00');
    el.splice(8, 0, '\uD83D\uDE00');
    return el;
  });

  const border =
    '-------------------------\n           \n\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00';
  const border11 =
    '\n\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\n';
  const border2 =
    '\n\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\n       \n\n\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00\uD83D\uDE00';

  result = result.map((el) => el.join(' '));
  result.unshift(border);
  result.push(border11);
  result.splice(4, 0, border2);
  result.splice(8, 0, border2);

  return result.join('\n');
}
function validate(currPos, arrBoard, num, boxSize) {
  const [y, x] = currPos;

  for (let i = 0; i < size; i++) {
    if (Number(arrBoard[y][i]) === num && i !== x) {
      return false;
    }
  }

  for (let i = 0; i < size; i++) {
    if (Number(arrBoard[i][x]) === num && i !== y) {
      return false;
    }
  }

  const firstBlockOfBoxY = Math.floor(y / boxSize) * boxSize;
  const firstBlockOfBoxX = Math.floor(x / boxSize) * boxSize;

  for (let i = firstBlockOfBoxY; i < boxSize + firstBlockOfBoxY; i++) {
    for (let j = firstBlockOfBoxX; j < boxSize + firstBlockOfBoxX; j++) {
      if (Number(arrBoard[i][j]) === num && i !== y && j !== x) {
        return false;
      }
    }
  }
  return true;
}

//Делаем проверку на валидность
function validate(currPos, arrBoard, num, boxSize) {
  const [y, x] = currPos;
  //Проверка что число встречается в строке
  for (let i = 0; i < size; i++) {
    //для проверки уникальности элемета в строке и не проверять текущее значение
    if (Number(arrBoard[i][x]) === num && i !== y) {
      return false;
    }
  }

  //Проверка что число встречается в колонке
  for (let i = 0; i < arrBoard.length; i += 1) {
    //для проверки уникальности элемета в колонке и не проверять текущее значение
    if (Number(arrBoard[y][i]) === num && i !== x) {
      return false;
    }
  }
  // Проверка что число встречается в секторе квадрата
  //Проверяем инаходим начало квадрата, где левая верхняя ячейка
  //Вычисляем в какой строке находится наш квадрат размер квадрата 3
  const firstBlockOfBoxY = Math.floor(y / 3) * 3;
  //Вычисляем в какой колонке находится наш квадрат  размер квадрата 3
  const firstBlockOfBoxX = Math.floor(x / 3) * 3;
  //Проводим проверку по квадрату
  for (let i = firstBlockOfBoxY; i < 3 + firstBlockOfBoxY; i++) {
    for (let j = firstBlockOfBoxX; j < 3 + firstBlockOfBoxX; j++) {
      if (Number(arrBoard[i][j]) === num && i !== y && j !== x) {
        return false;
      }
    }
  }
  return true;
}

// Экспортировать функции для использования в другом файле (например, readAndSolve.js).
module.exports = {
  solve,
  isSolved,
  prettyBoard,
};
