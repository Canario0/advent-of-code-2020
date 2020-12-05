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

function treeCounter( data: string[][],
  rowSlope?: number,
  colSlope?: number
): number {
  let col: number = 0;
  let row: number = 0;
  let treeCount: number = 0;
  let rowSize: number = data.length;
  let colSize: number = data[0].length;
  while (row < rowSize - rowSlope) {
    col = col + colSlope < colSize ? col + colSlope : col + colSlope - colSize;
    row = row + rowSlope;
    if (data[row][col] === "#") {
      treeCount++;
    }
  }
  return treeCount;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";

let input: string[][] = readAll(FILE_DIR + FILE_NAME).map((row) =>
  row.split("")
);
let slopes: number[][] = [
  [1, 1],
  [1, 3],
  [1, 5],
  [1, 7],
  [2, 1],
];
console.log(
  slopes
    .map((slope) => treeCounter(input, slope[0], slope[1]))
    .reduce((x, y) => x*y)
);
