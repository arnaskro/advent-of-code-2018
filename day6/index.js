const fs = require('fs');
const data = fs.readFileSync('test.txt', 'utf8').trim().split('\n')
  .map(coordinates => coordinates.split(', ').map(coordinate => parseInt(coordinate)))

const board = {
  x: {
    min: data.reduce((x, y) => x[0] < y[0] ? x : y)[0],
    max: data.reduce((x, y) => x[0] > y[0] ? x : y)[0]
  },
  y: {
    min: data.reduce((x, y) => x[1] < y[1] ? x : y)[1],
    max: data.reduce((x, y) => x[1] > y[1] ? x : y)[1]
  }
}

const startPos = [board.x.min, board.y.min];
const endPos = [board.x.max, board.y.max];

const manhattanDistance = (x1, x2, y2, y1) => Math.abs(x2 - x1) + Math.abs(y2 - y1);

const run = (start, end) => {
  const points = {}

  for(let y = start[1]; y < end[1]; ++y){
    for(let x = start[0]; x < end[0]; ++x){
      const coordinate = data
        .map(cord => [cord, manhattanDistance(cord[0], x, cord[1], y)])
        .reduce((a, b) => {
          if(a[1] < b[1]) return a
          else if(b[1] < a[1]) return b
          else return [[null, null], a[1]]
        })[0]
        
      if (points[coordinate]) ++points[coordinate];
      else points[coordinate] = 1;
    }
  }
  
  return points
}


const board1 = run(startPos, endPos)
const board2 = run([board.x.min-1, board.y.min-1], [board.x.max+1, board.y.max+1])

const closest = data.filter(c => board1[c] === board2[c]).reduce((a,b) => (board1[b] && (board1[a] < board1[b])) ? b : a)

const part1 = () => console.log("Part1: " + board1[closest]);
const part2 = () => {
  let totalSize = 0, totalDistance;
  for(let y = startPos[1]; y < endPos[1]; ++y)
    for(let x = startPos[0]; x < endPos[0]; ++x){
      totalDistance = data.map(cord => manhattanDistance(cord[0], x, cord[1], y)).reduce((a, b) => a + b);
      if(totalDistance < 10000) ++totalSize;
    }
    
  console.log("Part2: " + totalSize)
}

part1(); // 4589
part2(); // 40252