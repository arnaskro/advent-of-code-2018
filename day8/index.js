const fs = require('fs');
const data = fs.readFileSync('input.txt', 'utf8').split(' ').map(x => parseInt(x));

const run = () => {
  // total meta sum
  // get child count
  // get meta count
  // run recursive for each child 
  // for each meta entry; add it to the total; move to next element
  // return total sum

  let t = 0,
      c = data.shift(),
      m = data.shift();
  while (c-- > 0) t += run();
  while (m-- > 0) t += data.shift();
  return t;
}

const part1 = () => console.log("Part1: " + run());

part1();