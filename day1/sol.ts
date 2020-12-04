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

function find2020(data: number[]): number[] {
  let calc = {};
  for (let index = 0; index < data.length; index++) {
    for (let i = 0; i < data.length; i++) {
      if (calc[`${data[index]}+${data[i]}`]) {
        if (calc[`${data[index]}+${data[i]}`] === 2020)
          return [data[index], data[i]];
      }
      calc[`${data[index]}+${data[i]}`] = data[index] + data[i];
      calc[`${data[i]}+${data[index]}`] = data[index] + data[i];
      if (data[index] + data[i] === 2020) return [data[index], data[i]];
    }
  }
  return []
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";

let input: number[] = readAll(FILE_DIR + FILE_NAME).map((num) => parseInt(num));
let result = find2020(input);
if (result.length !== 0) console.log(result[0] * result[1]);
