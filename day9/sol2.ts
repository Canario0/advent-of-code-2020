// Functions
function fileRead(fileRoute: string): string {
  return Deno.readTextFileSync(fileRoute);
}

function readAll(fileRoute: string): string[] {
  const data: string[] = fileRead(fileRoute)
    .split("\n")
    .map((a) => a.replace("\r", ""));
  data.pop();
  return data;
}

function findInvalid(data: number[], preambleLength: number): number {
  for (let index = preambleLength; index < data.length; index++) {
    const preambles = new Set(data.slice(index - preambleLength, index));
    let found = index;
    for (let num of preambles) {
      if (preambles.has(data[index] - num)) found = -1;
    }
    if (found != -1) return data[found];
  }
  return -1;
}

function findContiguos(data: number[], total: number): number[] {
  for (let index = data.length; index >= 1; index--) {
    let response: number[] = [];
    let acc = total;
    /* console.log("--- Start counting ---"); */
    for (let i = index; i >= 0; i--) {
      /* console.log(`index: ${i} value: ${data[i]}`); */
      acc = acc - data[i];
      if (acc === 0) {
        response.push(data[i]);
        break;
      }
      if (acc < 0) {
        break;
      }
      response.push(data[i]);
    }
    if (acc === 0 && response.length >= 2) return response;
  }
  return [];
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const data: number[] = readAll(FILE_DIR + FILE_NAME).map((input) =>
  Number(input)
);
const invalidNum = findInvalid(data, 25);
const result = findContiguos(data, invalidNum).sort((a, b) => a - b);
console.log(result[0] + result[result.length - 1]);
