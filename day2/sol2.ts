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

interface Password {
  pos1: number;
  pos2: number;
  letter: string;
  password: string;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";

let input: string[] = readAll(FILE_DIR + FILE_NAME);
let data: Password[] = input.map((inputLine) => {
  let pos1: string;
  let pos2: string;
  let letter: string;
  let password: string;
  [pos1, pos2] = inputLine.split("-");
  [pos2, letter, password] = pos2.replace(":", "").split(" ");
  return { pos1: parseInt(pos1) - 1, pos2: parseInt(pos2) - 1, letter, password };
});
let result = data.filter((x) => {
  if (x.password[x.pos1] === x.letter && x.password[x.pos2] !== x.letter) {
    return true;
  }
  if (x.password[x.pos2] === x.letter && x.password[x.pos1] !== x.letter) {
    return true;
  }
  return false;
}).length;

console.log(result);
