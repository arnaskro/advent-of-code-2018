const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split('');
const map = {};

const checkIfPolymer = (prev, curr) => 
  prev.length-1 >= 0 && 
  prev[prev.length-1] != curr && 
  prev[prev.length-1].toLowerCase() == curr.toLowerCase();

const removeAdjacentPolymers = (prev, curr) => (checkIfPolymer(prev, curr) ? prev.pop() : prev.push(curr)) && prev;
const reactPolymer = data => data.reduce(removeAdjacentPolymers, []).join('').length;
const shortestPolymer = data => data.reduce(findShortestPolymer, Number.MAX_SAFE_INTEGER);

const findShortestPolymer = (prev, curr, i, data) =>
  (!map[curr.toLowerCase()]) ?
    ((map[curr.toLowerCase()] = true) && 
    Math.min(prev, reactPolymer(data.join('').replace(new RegExp(curr, 'ig'), '').split('')))) : prev;

const part1 = () => console.log("Part1: " + reactPolymer(input));
const part2 = () => console.log("Part2: " + shortestPolymer(input));

part1(); // 9462
part2(); // 4952