// Process input
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8')
	.trim().split('\n').filter(line => line != "");

let initialState = input[0].replace('initial state: ', '');
let rules = {};
// Parse rules
input.slice(1, input.length)
	.map(line => ({ from: line.split(' => ')[0], to: line.split(' => ')[1] }))
	.forEach(rule => { rules[rule.from] = rule.to; });
	




// Main
const step = (state, rules) => 
	state.split('').map((_, i) => rules[state.slice(i-2, i+3)] || '.').join('');

const part1 = (state, rules) => {
	let prefix = '.'.repeat(100);
	state = prefix + state + prefix

	for (let i = 0; i < 20; i++)
		state = step(state, rules);

	return state.split('')
		.map((x, i) => [x, i])
		.filter(x => x[0] == '#')
		.reduce((p, c) => p+c[1]-prefix.length, 0);
}	




// Execution & log
console.log("Part 1: " + part1(initialState, rules)) // 2542