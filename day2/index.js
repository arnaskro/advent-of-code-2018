var fs = require('fs');
var input = fs.readFileSync('input.txt', 'utf8');

const part1 = () => {
  const data = input.split('\n');
  let countForTwo = 0,
      countForThree = 0,
      map = {};

  for (let twos = 0, threes = 0, i = 0; i < data.length; i++) {
    // reset
    map = {};
    twos = 0;
    threes = 0;
    
    for (let j = 0; j < data[i].length; j++) {
      // increase count
      map[data[i][j]] ? ++map[data[i][j]] : (map[data[i][j]] = 1);

      // special cases
      if      (map[data[i][j]] == 2)  ++twos
      else if (map[data[i][j]] == 3) {--twos; ++threes}
      else if (map[data[i][j]] > 3)   --threes
    }

    // total count
    if (twos) ++countForTwo;
    if (threes) ++countForThree;
  }

  console.log("part1: " + (countForThree * countForTwo))
}

part1(); // 7808