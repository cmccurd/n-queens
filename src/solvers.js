/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// 0, 0
// if row and column === n, return the board.
// is there a conflict in this row?
// if yes, increment row
// if no,
// check if conflict is in column?
// if yes, increment column
// if no, toggle piece, then pass new board into inner function

window.findNRooksSolution = function(n) {
  var solution = [];
  var emptyBoard = new Board({n: n});
  var count = 0;

  //iterate
  var innerFunction = function (board) {
    var rows = board.rows();
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      for (var colIndex = 0; colIndex < rows.length; colIndex++) {
        if (rows[rowIndex][colIndex] === 0) {
          board.togglePiece(rowIndex, colIndex);
          if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
            board.togglePiece(rowIndex, colIndex);
          } else {
            count++;
            if (count === n) {
              solution = board.rows();
              return;
            } else {
              innerFunction(board);
            }
          }
        }
      }
    }
  };

  innerFunction(emptyBoard);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  var findSolution = function(col, b) {
    // console.log(board.rows());
    if (col === n) {
      solutionCount++;
      return;
    }
    for (var row = 0; row < n; row++) {
      b.togglePiece(row, col);
      // console.log(b.rows());
      if (!b.hasAnyRooksConflicts()) {
        findSolution(col + 1, b);
      }
      // if (solution.length === n) {
      //   return;
      // }
      b.togglePiece(row, col);

    }
  };
  findSolution(0, board);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});
  if (n === 0) {
    return solution;
  }
  if (n === 1) {
   board.rows()[0][0] = 1;
   solution = board.rows();
  }
  if (n === 2 || n === 3) {
    solution = board.rows();
  }

  if (n > 3) {
    var findSolution = function(col, b) {
      // console.log(board.rows());
      if (col === n) {
        solution = b.rows();
        return;
      }
      for (var row = 0; row < n; row++) {
        b.togglePiece(row, col);
        // console.log(b.rows());
        if (!b.hasAnyQueensConflicts()) {
          findSolution(col + 1, b);
        }
        if (solution.length === n) {
          return;
        }
          b.togglePiece(row, col);

      }
    };
  findSolution(0, board);
  }
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme

  var board = new Board({n: n});
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
   board.rows()[0][0] = 1;
   solutionCount = 1;
  }
  if (n === 2 || n === 3) {
    solutionCount = 0;
  }
  if (n > 3) {
    var findSolution = function(col) {
      if (col === n) {
        solutionCount++;
        return;
      } else {
        for (var row = 0; row < n; row++) {
          board.togglePiece(row, col);

          if (!board.hasAnyQueensConflicts()) {
            findSolution(col + 1);
          }
          board.togglePiece(row, col);
        }
      }
    };
  findSolution(0);
  }
  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



// window.findNQueensSolution = function(n) {
//   var solutionBoard = new Board({n: n});
//   var solution = solutionBoard.rows();
//   var count = 0;

//   var board = solutionBoard.rows();
//   // 0, 0
//   // if row and column === n, return the board.
//   // is there a conflict in this row?
//   // if yes, increment row
//   // if no,
//   // check if conflict is in column?
//   // if yes, increment column
//   // if no, toggle piece, then pass new board into inner function
//   var findSolution = function(row, col) {
//     console.log(row, col);
//     if (row === n) {
//       solution = board;
//     } else if (col === n) {
//       solution = solutionBoard.rows();
//       findSolution(row + 1, 0);
//     } else {
//       solutionBoard.togglePiece(row, col);
//       if (solutionBoard.hasRowConflictAt(row)) {
//         solutionBoard.togglePiece(row, col);
//         findSolution(row + 1, col);
//       }
//       if (solutionBoard.hasColConflictAt(col)) {
//         solutionBoard.togglePiece(row, col);
//         findSolution(row, col + 1);
//       }
//       if (solutionBoard.hasMajorDiagonalConflictAt(solutionBoard._getFirstRowColumnIndexForMajorDiagonalOn(row, col)) ||
//           solutionBoard.hasMinorDiagonalConflictAt(solutionBoard._getFirstRowColumnIndexForMinorDiagonalOn(row, col))) {
//             solutionBoard.togglePiece(row, col);
//             findSolution(row, col + 1);
//       }

//       findSolution(row + 1, 0);
//     }
//   };

//   debugger;
//   findSolution(0, 0);

//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };