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

    return "done";
  }
}

function readAll(fileRoute: string): string[] {
  const data: string[] = fileRead(fileRoute)
    .split("\n")
    .map((a) => a.replace("\r", ""));
  data.pop();
  return data;
}

function checkPresent(input: string): boolean {
  /* let keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]; */
  let data = new Set(
    input
      .substr(0, aux.length - 1)
      .split(" ")
      .map((x) => x.split(":")[0])
  );
  data.delete("cid");
  return data.size === 7;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
let data: string[] = readAll(FILE_DIR + FILE_NAME);
let aux: string = "";
let validCount: number = 0;
for (let line of data) {
  if (line === "") {
    if (checkPresent(aux)) 
      validCount++;
    aux = "";
  } else {
    aux = aux + line + " ";
  }
}
if (checkPresent(aux))
  validCount++;
console.log(validCount);
