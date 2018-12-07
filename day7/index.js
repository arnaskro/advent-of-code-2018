const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split('\n')
  .map(line => line.split(/Step ([A-Z]) must be finished before step ([A-Z]) can begin./).filter(x => x != ""));

const getRules = (letter) => input.filter(x => letter == x[1]).map(x => x[0]);
const intersection = (a, b) => a.filter(c => !b.includes(c));
const rulesCompleted = (rules, res) => intersection(rules, res).length == 0;
const sortAlphabet = (a, b) => a < b ? 1 : -1;
const deduplicate = (a) => a.reduce((prev, curr) => prev.indexOf(curr) < 0 ? (prev.push(curr) && prev) : prev, []);
const combineAndDeduplicate = (a, b) => deduplicate(a.concat(b));
const noParent = (prev, curr, i, data) => data.filter(x => x[1] == curr[0]).length == 0 ? (prev.push(curr[0]) && prev) : prev;

const run = (data) => {
  // Get elements with no parent
  let current = deduplicate(data.reduce(noParent, []));
  let children = {}, rules = {}, res = [];
  // Loop data to map child element and root elements
  data.forEach(x => {
    // Map children
    if (children[x[0]]) children[x[0]].push(x[1]) && children[x[0]];
    else children[x[0]] = [x[1]]
    // Map rules
    if (!rules[x[1]]) rules[x[1]] = getRules(x[1]);
  });
  // While we still have element that are not processed
  while (current.length > 0) {
    // Sort the list and get the last one
    letter = current.sort(sortAlphabet).pop();
    // If element doesnt have rules or they are completed
    if (!rules[letter] || rulesCompleted(rules[letter], res)) {
      // Add the letter to the result
      res.push(letter);
      // Attach the child element to the current list
      if (children[letter]) current = combineAndDeduplicate(children[letter], current);
    }
  }

  return res.join('');
}

const part1 = () => console.log("Part1: " + run(input));

part1(); // GJKLDFNPTMQXIYHUVREOZSAWCB
