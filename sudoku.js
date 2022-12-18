/**
 * Принимает игровое поле в формате строки — как в файле sudoku-puzzles.txt.
 * Возвращает игровое поле после попытки его решить.
 * Договорись со своей командой, в каком формате возвращать этот результат.
 */
// function solve(boardString) {
// //   // let regexp = /(.{9})\s*(.{9})\s*(.{9})\s*(.{9})\s*(.{9})\s*(.{9})\s*(.{9})\s*(.{9})\s*(.{9})/gi
// //   // return boardString.replace(regexp, '$1,$2,$3,$4,$5,$6,$7,$8,$9').split(',')
//   const regX = /.{9}/g;
//   const board = boardString.match(regX).map((el) => el.split(''));

//   for (let i = 0; i < board.length; i += 1) {
//     for (let j = 0; j < board.length; j += 1) {
//       if (board[i][j] === '-') {
//         board[i][j] = (Math.floor(Math.random() * (10 - 1)) + 1).toString();
//         // return [i, j];
//       }
//     }
//   }
//   return board;
// }
// console.log(solve('6-873----2-----46-----6482--8---57-19--618--4-31----8-86-2---39-5----1--1--4562--'));

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает булевое значение — решено это игровое поле или нет.
 */
// function isSolved(board) {
//   board.map((arr) => arr.map((el) => {
//     if (el === '-') {
//       return false;
//     }
//     return true;
//   }));
// }
// console.log(isSolved(solve('6-873----2-----46-----6482--8---57-19--618--4-31----8-86-2---39-5----1--1--4562--')));

/**
 * Принимает игровое поле в том формате, в котором его вернули из функции solve.
 * Возвращает строку с игровым полем для последующего вывода в консоль.
 * Подумай, как симпатичнее сформировать эту строку.
 */
function prettyBoard(board) {

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
  for (i=0; i<board.length, i+=1){
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
