function calculateLoopSize(subjectNumber: number): number {
  let value = 1;
  let loopSize = 0;
  while (value !== subjectNumber) {
    value = value * 7;
    value = value % 20201227;
    loopSize++;
  }
  return loopSize;
}

function calculateEncription(subjectNumber: number, loopSize: number): number {
  let value = 1;
  for (let i = 0; i < loopSize; i++) {
    value = value * subjectNumber;
    value = value % 20201227;
  }
  return value;
}

const cardSubjectNumber = 3418282;
const doorSubjectNumber = 8719412;
const cardLoopSize = calculateLoopSize(cardSubjectNumber);
const doorLoopSize = calculateLoopSize(doorSubjectNumber);

if (cardLoopSize < doorLoopSize) {
  console.log(calculateEncription(doorSubjectNumber, cardLoopSize));
} else {
  console.log(calculateEncription(cardSubjectNumber, doorLoopSize));
}
