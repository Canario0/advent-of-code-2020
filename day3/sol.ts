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

function treeCounter(data: string[][]): number {
  let col: number = 0;
  let row: number = 0;
  let treeCount: number = 0;
  let rowSize: number = data.length;
  let colSize: number = data[0].length;
  while (row < rowSize - 1) {
    col = col + 3 < colSize ? col + 3 : col + 3 - colSize;
    row = row + 1;
    console.log(data[row][col]);
    if (data[row][col] === "#") {
      treeCount++;
      data[row][col] = "X";
    } else data[row][col] = "O";
  }
  return treeCount;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";

let input: string[][] = readAll(FILE_DIR + FILE_NAME).map((row) =>
  row.split("")
);
input.pop();
console.log(treeCounter(input));
