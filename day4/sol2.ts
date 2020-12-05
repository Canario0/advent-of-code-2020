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
  let parsedObject = input
    .substr(0, input.length - 1)
    .split(" ")
    .map((x) => {
      let key, value;
      [key, value] = x.split(":");
      return `"${key}":"${value}"`;
    });
  parsedObject = JSON.parse(`{${parsedObject.join(",")}}`);
  console.log(parsedObject);
  let data = new Set(Object.keys(parsedObject));
  data.delete("cid");
  console.log(data);
  if (data.size !== 7) return false;

  let byr = parseInt(parsedObject["byr"]);
  /* console.log(byr); */
  if (1920 > byr || byr > 2002) {
    console.log("Wrong byr");
    return false;
  }

  let iyr = parseInt(parsedObject["iyr"]);
  /* console.log(iyr); */
  if (2010 > iyr || iyr > 2020) {
    console.log("Wrong iyr");
    return false;
  }

  let eyr = parseInt(parsedObject["eyr"]);
  /* console.log(eyr); */
  if (2020 > eyr || eyr > 2030) {
    console.log("Wrong eyr");
    return false;
  }

  let hgt = parsedObject["hgt"];
  /* console.log(hgt); */
  let aux = parseInt(hgt.substr(0, hgt.length - 2));
  /* console.log(aux); */
  let suffix = hgt.substr(hgt.length - 2, hgt.length);
  if (suffix === "cm") {
    if (150 > aux || aux > 193) {
      console.log("Wrong hgt");
      return false;
    }
  } else if (suffix === "in") {
    if (59 > aux || aux > 76) {
      console.log("Wrong hgt");
      return false;
    }
  } else return false;

  /* console.log(parsedObject["hcl"]); */
  if (!/^#[a-f0-9]{6}$/.test(parsedObject["hcl"])) {
    console.log("Wrong hcl");
    return false;
  }

  let ecls: Set<string> = new Set([
    "amb",
    "blu",
    "brn",
    "gry",
    "grn",
    "hzl",
    "oth"
  ]);
  if (!ecls.has(parsedObject["ecl"])) {
    console.log("Wrong ecl");
    return false;
  }

  if (!/^[0-9]{9}$/.test(parsedObject["pid"])) {
    console.log("Wrong pid");
    return false;
  }

  return true;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
let data: string[] = readAll(FILE_DIR + FILE_NAME);
let aux: string = "";
let validCount: number = 0;
let test;
for (let line of data) {
  if (line === "") {
    test = checkPresent(aux);
    console.log(test);
    if (test) validCount++;
    aux = "";
  } else {
    aux = aux + line + " ";
  }
}
test = checkPresent(aux);
console.log(test);
if (test) validCount++;
console.log(validCount);
