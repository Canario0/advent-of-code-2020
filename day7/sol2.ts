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

function countBags(
  currentBag: string,
  bagsContent: object,
  memoization: object
): number {
  if (memoization[currentBag] !== undefined) {
    /* console.log(`${currentBag} is meomized`); */
    return memoization[currentBag];
  }
  let bags: number = bagsContent[currentBag].reduce((acc, bag) => {
    let aux: number = countBags(bag, bagsContent, memoization);
    /* console.log(`${currentBag} contains ${bag} ${aux}`); */
    return (
      acc +
      bagsContent[currentBag + bag + "Num"]+
      bagsContent[currentBag + bag + "Num"] * aux
    );
  }, 0);
  /* console.log(bags); */
  memoization[currentBag] = bags;
  /* console.log(memoization); */
  return bags;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
let data: string[] = readAll(FILE_DIR + FILE_NAME);
let aux = data.reduce(
  (acc, line) => {
    let nonEmptyBagRegex: RegExp = /^(.*?) bags contain (.*?)\.$/;
    let emptyBagRegex: RegExp = /^(.*?) bags contain no other bags\.$/;
    let color: string;
    let content: string;
    let bagsContent: object = acc["bagsContent"];
    let memoization: object = acc["memoization"];
    if (emptyBagRegex.test(line)) {
      color = line.match(emptyBagRegex)[1];
      memoization[color] = 0;
      bagsContent[color] = [];
      return { bagsContent, memoization };
    } else if (nonEmptyBagRegex.test(line)) {
      [color, content] = line.match(nonEmptyBagRegex).slice(1);
      memoization[color] = undefined;
      bagsContent[color] = content.split(",").map((item) => {
        let match = item.match(/(\d+) (.*?) bag(?:s)?/);
        bagsContent[color + match[2] + "Num"] = parseInt(match[1]);
        return match[2];
      });
      return { bagsContent, memoization };
    }
    return acc;
  },
  { bagsContent: {}, memoization: {} }
);

/* console.log(aux); */
console.log(countBags("shiny gold", aux.bagsContent, aux.memoization));
/* console.log(partOne(aux.bagsContent, aux.memoization).length); */
