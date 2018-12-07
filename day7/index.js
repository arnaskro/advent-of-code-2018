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

const processData = (data) => {
  // Get elements with no parent
  let current = deduplicate(data.reduce(noParent, []));
  let children = {}, rules = {};
  // Loop data to map child element and root elements
  data.forEach(x => {
    // Map children
    if (children[x[0]]) children[x[0]].push(x[1]) && children[x[0]];
    else children[x[0]] = [x[1]]
    // Map rules
    if (!rules[x[1]]) rules[x[1]] = getRules(x[1]);
  });

  return {current, children, rules};
}

const part1 = (data) => {
  let { current, children, rules } = processData(data);
  let res = [], letter;
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
  console.log("Part1: " + res.join(''));
  return res.join('')
}

const getCharVal = (char) => char.charCodeAt(0) - 64;
const getAvailableWorkers = (workers) => Object.keys(workers).filter(key => workers[key].time == 0);

const part2 = (data) => {
  let { current, children, rules } = processData(data);
  let letter, charVal, res = [], totalSeconds = 0, popped = [], step = 0;
  let workers = { 0: { key: null, time: 0}, 1: { key: null, time: 0}, 2: { key: null, time: 1}, 3: { key: null, time: 0}, 4: { key: null, time: 0} };

  while (true) {
    // Take a step
    step += 60;
    for (var i = 0; i < 5; i++) {
      if (workers[i].time > 0) {
        --workers[i].time;

        if (workers[i].time == 0 && workers[i].key) {
          res.push(workers[i].key)
          if (children[workers[i].key]) current = combineAndDeduplicate(children[workers[i].key], current);
          workers[i].key = null;
        }
      }
    }


    getAvailableWorkers(workers).map(id => {
      if (current.length == 0) return;
      letter = current.sort(sortAlphabet)[current.length-1]
      if (!rules[letter] || rulesCompleted(rules[letter], res)) {
        letter = current.sort(sortAlphabet).pop();
        charVal = getCharVal(letter)
        workers[id].key = letter;
        workers[id].time = charVal;
        totalSeconds += charVal
      }
    })
  
    if (getAvailableWorkers(workers).length == 5)
      break;
    
  }

  console.log("Part2: " + (step - totalSeconds - 6))
}


part1(input); // GJKLDFNPTMQXIYHUVREOZSAWCB
part2(input); // 967