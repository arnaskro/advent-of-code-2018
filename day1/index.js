var fs = require('fs');
var data = fs.readFileSync('input.txt', 'utf8');

const part1 = () => {
  let res = data.split('\n')
    .map(x => parseInt(x))
    .reduce((a = 0, b) => a + b);

  console.log("Part1: " + res)
}

part1(); //435