const cups: number[] = [3, 8, 9, 5, 4, 7, 6, 1, 2];
const cupsNum = cups.length;
const minLabel = Math.min(...cups);
const maxLabel = Math.max(...cups);

for (let i = 1; i <= 100; i++) {
  console.log(`-- move ${i} --`);
  console.log(`cups: ${cups}`);
  const current = cups.shift() || NaN;
  console.log(`selected cup: ${current}`);
  let destination = current - 1;
  let pickUp: number[] = [];
  pickUp = cups.splice(0, 3);
  if (destination < minLabel) destination = maxLabel;
  while (pickUp.includes(destination)) {
    destination -= 1;
    if (destination < minLabel) destination = maxLabel;
  }
  console.log(`pick up: ${pickUp}`);
  console.log(`destination: ${destination}`);
  const indexOfDestination = cups.indexOf(destination);
  cups.splice(indexOfDestination + 1, 0, ...pickUp);
  cups.push(current);
  console.log();
}
const indexOf1 = cups.indexOf(1);
if (indexOf1 === cups.length - 1) console.log(cups.slice(0, -1).join(""));
else
  console.log(
    cups
      .slice(indexOf1 + 1)
      .concat(cups.slice(0, indexOf1))
      .join("")
  );
