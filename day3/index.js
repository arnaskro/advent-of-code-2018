var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8').split('\n');

let overlaps = {};
const run = () => {
  // Parse input
  var data = input.map(x => ({
    id: x.split('#')[1].split(' ')[0],
    x: x.split('@ ')[1].split(',')[0],
    y: x.split(',')[1].split(':')[0],
    width: x.split(': ')[1].split('x')[0],
    height: x.split('x')[1],
  }))

  var board = {};
  var posX, posY;

  data.map((claim) => {
    overlaps[claim.id] = true;

    for (var i = 0; i < claim.width; i++) {
      posX = parseInt(claim.x) + i;
      board[posX] = board[posX] || {};

      for (var j = 0; j < claim.height; j++) {
        posY = parseInt(claim.y) + j;

        if (board[posX][posY]) {
          if (Array.isArray(board[posX][posY])) {
            if (board[posX][posY].indexOf(claim.id) == -1) {
              board[posX][posY].push(claim.id);
            }
          } else {
            board[posX][posY] = [board[posX][posY], claim.id];
          }
        } else {
          board[posX][posY] = claim.id;
        }

      }
    }
  })

  printBoardAndCountOverlaps(board)
}

const printBoardAndCountOverlaps = (board) => {
  let total = 0;
  
  for (var x = 0; x < 1000; x++) {
    var line = "";
    for (var y = 0; y < 1000; y++) {
      if (board[y] && Array.isArray(board[y][x])) {
        total++;
        
        for (var i = 0; i < board[y][x].length; i++) {
          if (overlaps[board[y][x][i]])
            delete overlaps[board[y][x][i]];
        }
      }

      if (board[y] && board[y][x]) line += board[y][x] + " ";
      else line += "# ";
    }

    // Uncomment to show the board. Only works for test input
    // console.log(line)
  }

  console.log("Part1: " + total); // 111326
  console.log("Part2: " + Object.keys(overlaps)) // 1019
}

run();