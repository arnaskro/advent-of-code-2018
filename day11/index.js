const serialNumber = 8141;
let grid = [];

// Calc power level
const calcPowerLevel = (x,y) => {
  let rackID = x + 10;
  let powerLevelStart = ((rackID * y + serialNumber) * rackID).toString();
  return parseInt(powerLevelStart[powerLevelStart.length - 3]) - 5;
}

// create the grid
for (var x = 1; x < 300; x++) {
  grid[x] = [];
  for (var y = 1; y < 300; y++)
    grid[x][y] = calcPowerLevel(x, y);
}

let part1 = () => {
  let largest = {x:0,y:0,power:0};
  let power = 0;
  
  for (var x = 1; x < 298; x++)
    for (var y = 1; y < 298; y++) {
      power = 0;
      for (var row = 0; row < 3; row++)
        for (var col = 0; col < 3; col++)
          power += grid[x+row][y+col]
  
      if (power > largest.power) largest = {x,y,power}
    }
  
  return `${largest.x},${largest.y}`;
}

console.log("Part1: " + part1()) // 235,16