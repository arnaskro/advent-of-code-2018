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

const calcSum = (state, length) => 
	state.split('')
	.map((x, i) => [x, i])
	.filter(x => x[0] == '#')
	.reduce((p, c) => p+c[1]-length, 0);

const part1 = (state, rules) => {
	let prefix = '.'.repeat(100);
	state = prefix + state + prefix

	for (let i = 0; i < 20; i++)
		state = step(state, rules);

	return calcSum(state, prefix.length);
}	

const part2 = (state, rules) => {
	let prefix = '.'.repeat(200), // increase this number if the answer is wrong
		removeDots = new RegExp(/^\.*|\.*$/, 'g'),
		previousState, generation = 0;

	state = prefix + state + prefix

	while (true) {
		generation++;
		state = step(state, rules);
		// console.log(state.replace(removeDots, '')) // Show state
		if (state.replace(removeDots, '') == previousState) break;
		else previousState = state.replace(removeDots, '');
	}

	let nPots = state.split('').filter(x => x == '#').length;
	return (50000000000 - generation) * nPots + calcSum(state, prefix.length);
}

// Execution & log
console.log("Part 1: " + part1(initialState, rules)) // 2542
console.log("Part 2: " + part2(initialState, rules)) // 2550000000883