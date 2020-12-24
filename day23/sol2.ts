const cups: number[] = [3, 8, 9, 5, 4, 7, 6, 1, 2];
const cupsNum = cups.length;
let count = 10;
const maxCup = 1000000;
// Array that contains the indexes are the cup label and the value are the next cup label.
const next = [];
for (let i = 0; i < maxCup + 1; i++) {
  next.push(i + 1);
}
// At position 0 whe save the first value (to start the moves) and the next cap immediately clockwise of the last one
// (1000000) is the first cup (cup[0])
next[0] = next[next.length - 1] = cups[0];
for (let i = 0; i < cups.length - 1; i++) next[cups[i]] = cups[i + 1];
next[cups[cups.length - 1]] = 10;
let currentCup = 0;

for (let i = 1; i <= 10000000; i++) {
  /* console.log(`-- move ${i} --`); */
  /* console.log(`cups: ${cups}`); */
  currentCup = next[currentCup];
  /* console.log(`selected cup: ${current}`); */
  let destination = currentCup - 1;
  const cup1: number = next[currentCup];
  const cup2: number = next[cup1];
  const cup3: number = next[cup2];
  while (destination === cup1 || destination === cup2 || destination === cup3) {
    destination -= 1;
  }
  if (destination < 1) destination += maxCup;
  /* console.log(`pick up: ${pickUp}`); */
  /* console.log(`destination: ${destination}`); */
  [next[cup3], next[destination], next[currentCup]] = [
    next[destination],
    next[currentCup],
    next[cup3],
  ];
  /* console.log(); */
}
console.log(next[1] * next[next[1]]);
