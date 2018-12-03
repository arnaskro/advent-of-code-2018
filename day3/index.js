var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8').split('\n');

const part1 = () => {
  // Parse input
  var data = input.map(x => ({
    id: x.split('#')[1].split(' ')[0],
    x: x.split('@ ')[1].split(',')[0],
    y: x.split(',')[1].split(':')[0],
    width: x.split(': ')[1].split('x')[0],
    height: x.split('x')[1],
  }))

  var board = {};
  var x, posX, posY;

  data.map(claim => {
    for (var i = 0; i < claim.width; i++) {
      posX = parseInt(claim.x) + i;
      board[posX] = board[posX] || {};

      for (var j = 0; j < claim.height; j++) {
        posY = parseInt(claim.y) + j;
        board[posX][posY] = board[posX][posY] ? "X" : claim.id;
      }
    }
  })


  printBoardAndCountX(board)
}

const printBoardAndCountX = (board) => {
  let total = 0;
  
  for (var x = 0; x < 1000; x++) {
    var line = "";
    for (var y = 0; y < 1000; y++) {
      if (board[y] && board[y][x] == "X") {
        total++;
      }

      if (board[y] && board[y][x]) line += board[y][x] + " ";
      else line += "# ";
    }

    // Uncomment to show the board. Only works for test input
    // console.log(line)
  }

  console.log(total)
}

part1(); // 111326