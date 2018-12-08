const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split(' ').map(x => parseInt(x));

const part1 = (data) => {

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

  return run();
}


class Node {
  constructor(childCount, metaCount) {
    this.header = {
      childCount,
      metaCount
    }
  }

  addData(childNodes, metaData) {
    this.childNodes = childNodes;
    this.metaData = metaData;
  }

  getValue() {
    // if has children, return children value sum
    // if doesnt have children, return metadata sum
    return this.metaData.reduce((prev, curr) => prev + (this.header.childCount ? ((this.childNodes[curr-1]) ? this.childNodes[curr-1].getValue() : 0) : curr), 0);
  }
}

const part2 = (data) => {
  
  const buildNode = () => {
    // get child count
    // get meta count
    // init childNodes array and metaData array
    // Initialize the node and pass in the chilc and meta count values
    // run recursive to create new child nodes and add them to the array
    // add each meta entry to the meta data array
    // attached the childNodes and metaData info to the node
    // return the node
  
    let c = data.shift(),
        m = data.shift(),
        cn = [], md = [],
        node = new Node(c, m);

    while (c-- > 0) cn.push(buildNode());
    while (m-- > 0) md.push(data.shift());

    node.addData(cn, md);

    return node;
  }

  const root = buildNode();
  return root.getValue();
}

console.log("Part1: " + part1(input.slice())); // 45194
console.log("Part2: " + part2(input.slice())); // 22989