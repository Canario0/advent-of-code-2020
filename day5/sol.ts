import * as fs from "fs";
// Functions
function fileRead(fileRoute: string): string {
  return fs.readFileSync(fileRoute, "utf8");
}

function* fileByLines(fileRoute: string) {
  const data: string[] = fileRead(fileRoute)
    .split("\n")
    .map((a) => a.replace("\r", ""));
  data.pop();
  for (let i of data) {
    yield i;
  }
  return "done";
}

function readAll(fileRoute: string): string[] {
  const data: string[] = fileRead(fileRoute)
    .split("\n")
    .map((a) => a.replace("\r", ""));
  data.pop();
  return data;
}

function findNumber(
  data: string,
  start: number,
  end: number,
  lower: String,
  upper: String
): number {
  let L: number = start;
  let R: number = end;
  let index: number = -1;
  for (let letter of data) {
    index = L + Math.ceil((R - L) / 2);
    /* console.log(`index: ${index} L: ${L} R: ${R} value: ${letter}`); */
    if (letter === lower) {
      R = index - 1;
    } else if (letter === upper) {
      L = index;
    }
  }
  return data[data.length - 1] === lower ? index - 1 : index;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
let data: string[] = readAll(FILE_DIR + FILE_NAME);
console.log(
  Math.max(
    ...data.map((line) => {
      let row: string;
      let col: string;
      let match = line.match(/^([FB]{7})([LR]{3})$/);
      row = match[1];
      col = match[2];
      let block: number = findNumber(row, 0, 127, "F", "B");
      let sitNum: number = findNumber(col, 0, 7, "L", "R");
      return block * 8 + sitNum;
    })
  )
);
