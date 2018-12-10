const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim()
.split('\n').map(line => ({
    pos: {
      x: parseInt(line.replace(/ /g, '').match(/position=<(-?\d+),/)[1]),
      y: parseInt(line.replace(/ /g, '').match(/,(-?\d+)>/)[1]),
    },
    vel: {
      x: parseInt(line.replace(/ /g, '').match(/velocity=<(-?\d+),/)[1]),
      y: parseInt(line.replace(/ /g, '').match(/velocity=<(-?\d+),(-?\d+)>/)[2])
    }
  }));

const loop = (data, secs) => {
  // Get highest and lowest coordinate points, both X and Y
  let lowX = Math.min(...data.map(n => n.pos.x));
  let highX = Math.max(...data.map(n => n.pos.x));
  let lowY = Math.min(...data.map(n => n.pos.y));
  let highY = Math.max(...data.map(n => n.pos.y));

  let height = highY - lowY + 1;
  let width = highX - lowX + 1;
  
  if (height > 10) return;
  let rows = new Array(height);

  for (let y = 0; y <= height; y++) {
    rows[y] = new Array(width);
    rows[y].fill(' ');
  }

  data.forEach(obj => rows[obj.pos.y - lowY][obj.pos.x - lowX] = '#');

  let res = rows.map(line => line.join('')).join('\n');
  console.log("Part1:\n" + res); // ZRABXXJC
  console.log("Part2: " + secs); // 10710
}

for (let sec = 0; sec < 20000; sec++) {
  loop(input, sec);

  input.forEach(obj => {
    obj.pos.x += obj.vel.x;
    obj.pos.y += obj.vel.y;
  });
}