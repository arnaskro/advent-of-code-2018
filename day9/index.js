class Marble {
  constructor(value, marble = false) {
    this.value = value
    this.next = null
    this.prev = null

    if (marble) {
      this.prev = marble,
      this.next = marble.next
      marble.next.prev = this;
      marble.next = this;
    }
  }
} 

const findHighestScore = (players, lastMarbleWorth) => {
  let curr = new Marble(0);
  let scores = {}, player, largest = 0;
  curr.next = curr;
  curr.prev = curr;

  for (let i=1; i<=lastMarbleWorth; i++) {
    player = i%players + 1;
    scores[player] = (scores[player] || 0);

    if (i%23 === 0) {
      curr = curr.prev.prev.prev.prev.prev.prev;
      scores[player] += curr.prev.value + i;
      curr.prev.prev.next = curr;
      curr.prev = curr.prev.prev;
      largest = largest < scores[player] ? scores[player] : largest;
    } else {
      curr = new Marble(i, curr.next);
    }
  }
  
  return largest;
}

console.log("Part1: " + findHighestScore(459, 71320)); // 375414
console.log("Part2: " + findHighestScore(459, 71320 * 100)); // 3168033673
