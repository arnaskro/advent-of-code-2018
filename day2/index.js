var fs = require('fs');
var data = fs.readFileSync('input.txt', 'utf8').split('\n');

const part1 = () => {
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

const part2 = () => {
  let map = {}

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      // remove 1 char from the id
      let newId = data[i].substring(0, j) + data[i].substring(j+1, data[i].length);

      // check if similar id was defined && if its matching the same char pos change
      if (!!map[newId] && map[newId] == j) {
        console.log("part2: " + newId);
        return newId;
      } else map[newId] = j;
    }
  }
}

part1(); // 7808
part2(); // efmyhuckqldtwjyvisipargno