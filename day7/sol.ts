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

function partOne(bagsContent: object, memoization: object): string[] {
  return Object.keys(bagsContent).filter((bag) =>
    findBag(bag, "shiny gold", bagsContent, memoization)
  );
}

function findBag(
  currentBag: string,
  searchingBag: string,
  bagsContent: object,
  memoization: object
): boolean {
  /* console.log(memoization); */
  if (memoization[currentBag] !== undefined) {
    /* console.log(`${currentBag} is meomized`); */
    return memoization[currentBag];
  }
  if (bagsContent[currentBag].includes(searchingBag)) {
    /* console.log(`${currentBag} includes ${searchingBag}`); */
    memoization[currentBag] = true;
    return true;
  }
  let bags: string[] = bagsContent[currentBag].filter((bag) => {
    let aux: boolean = findBag(bag, searchingBag, bagsContent, memoization);
    /* console.log(`${bag} contains ${searchingBag} ${aux}`); */
    return aux;
  });
  /* console.log(bags); */
  if (bags.length !== 0) {
    memoization[currentBag] = true;
    return true;
  } else {
    memoization[currentBag] = false;
    return false;
  }
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
      memoization[color] = false;
      bagsContent[color] = [];
      return { bagsContent, memoization };
    } else if (nonEmptyBagRegex.test(line)) {
      [color, content] = line.match(nonEmptyBagRegex).slice(1);
      memoization[color] = undefined;
      bagsContent[color] = content
        .split(",")
        .map((item) => item.match(/\d+ (.*?) bag(?:s)?/)[1]);
      return { bagsContent, memoization };
    }
    return acc;
  },
  { bagsContent: {}, memoization: {} }
);

/* console.log(aux.bagsContent); */
/* console.log(findBag('vibrant plum','shiny gold',aux.bagsContent, aux.memoization)) */
console.log(partOne(aux.bagsContent, aux.memoization).length);
