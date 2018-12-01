var fs = require('fs');
var data = fs.readFileSync('input.txt', 'utf8');

const part1 = () => {
  let res = data.split('\n')
    .map(x => parseInt(x))
    .reduce((a = 0, b) => a + b);

  console.log("Part1: " + res)
}

const part2 = () => {
  let map = {};
  let firstRepeating; 

  let parsed = data.split('\n')
    .map(x => parseInt(x));

  let prevRes = 0;
  
  while(firstRepeating == null) {
    prevRes = parsed.reduce((a, b) => {
      let sum = a + b;
      if (firstRepeating == null && map[sum]) firstRepeating = sum;
      map[sum] = map[sum] ? ++map[sum] : 1;
      return sum;
    }, prevRes);
  }

  console.log("Part2: " + firstRepeating)
}

part1(); //435
part2(); //245