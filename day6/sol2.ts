import * as fs from "fs";
import { argv0 } from "process";
// Functions
function fileRead(fileRoute: string): string {
  return fs.readFileSync(fileRoute, "utf8");
}

function readAll(fileRoute: string): string[] {
  const data: string[] = fileRead(fileRoute)
    .split("\n")
    .map((a) => a.replace("\r", ""));
  data.pop();
  return data;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
let data: string[] = readAll(FILE_DIR + FILE_NAME);
let tmp: number[] = [];
let counter: number = 0;
let people: number = 0;
let set: Set<string> = new Set();
for (let line of data) {
  if (line === "") {
    tmp.forEach((x, i) => {
      if (x < people) set.delete(String.fromCharCode(i + 97))
    });
    counter = counter + set.size;
    set = new Set();
    tmp = [];
    people = 0;
  } else {
    line.split("").forEach((x) => {
      if (!set.has(x)) {
        tmp[x.charCodeAt(0) - 97] = 1;
        set.add(x);
      } else {
        tmp[x.charCodeAt(0) - 97] += 1;
      }
    });
    people += 1;
  }
}

console.log(counter);
