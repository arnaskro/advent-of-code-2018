var fs = require('fs');
var input = fs.readFileSync('test.txt', 'utf8').trim().split('');

const checkIfPolymer = (prev, curr) => 
  prev.length-1 >= 0 && 
  prev[prev.length-1] != curr && 
  prev[prev.length-1].toLowerCase() == curr.toLowerCase();

const removeAdjacentPolymers = (prev, curr) => 
  (checkIfPolymer(prev, curr) ? prev.pop() : prev.push(curr)) && prev;

const part1 = () =>
  console.log("Part1: " + input.reduce(removeAdjacentPolymers, []).join('').length);

part1(); // 9462