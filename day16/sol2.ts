// Functions
function fileRead(fileRoute: string): string {
  return Deno.readTextFileSync(fileRoute);
}

function readAll(fileRoute: string): string[] {
  const data: string[] = fileRead(fileRoute)
    .split("\n")
    .map((a) => a.replace("\r", ""));
  data.pop();
  return data;
}

interface Field {
  field: string;
  minRange: number[];
  maxRange: number[];
  validIndexes: number[];
  index?: number;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const input: string[] = readAll(FILE_DIR + FILE_NAME);
const auxRange1 = input.indexOf("your ticket:");
const auxRange2 = input.indexOf("nearby tickets:");
const fields: Field[] = input.slice(undefined, auxRange1 - 1).map((line) => {
  const ruleRegex: RegExp = /^(\w+(?:\s\w+)?):\s(\d+)-(\d+)\sor\s(\d+)-(\d+)$/;
  const match = line.match(ruleRegex) || [];
  return {
    field: match[1],
    minRange: [Number(match[2]), Number(match[3])],
    maxRange: [Number(match[4]), Number(match[5])],
    validIndexes: [],
  };
});
const myTicket: string = input[auxRange1 + 1];
const tickets: string[] = input.slice(auxRange2 + 1);
const cache: Map<number, boolean> = new Map();
const valids: string[] = tickets.filter((ticket) => {
  return ticket.split(",").every((value) => {
    const auxValue = Number(value);
    if (cache.has(auxValue)) {
      return cache.get(auxValue);
    }
    const result = fields.some((field) => {
      return (
        (field.minRange[0] <= auxValue && auxValue <= field.minRange[1]) ||
        (field.maxRange[0] <= auxValue && auxValue <= field.maxRange[1])
      );
    }, 0);
    cache.set(auxValue, result);
    return result;
  }, 0);
}, 0);

const validNum = valids.length;

fields.forEach((field) => {
  let indexesCounts: number[] = [];
  valids.forEach((valid) => {
    valid.split(",").forEach((value, i) => {
      const auxValue = Number(value);
      if (
        (field.minRange[0] <= auxValue && auxValue <= field.minRange[1]) ||
        (field.maxRange[0] <= auxValue && auxValue <= field.maxRange[1])
      ) {
        /* let indexes = field.validIndexes; */
        indexesCounts[i] = indexesCounts[i] != null ? indexesCounts[i] + 1 : 1;
      }
    });
  }, []);
  field.validIndexes = indexesCounts
    .map((value, i) => {
      if (value === validNum) return i;
      return NaN;
    })
    .filter((value) => !isNaN(value));
});

fields.sort((a, b) => a.validIndexes.length - b.validIndexes.length);
const usedIndexes: Set<number> = new Set();
fields.forEach((field) => {
  let index = field.validIndexes.find((i) => !usedIndexes.has(i));
  if (index == null) {
    console.log("ERROR: index is duplicated");
    index = NaN;
  }
  usedIndexes.add(index);
  field.index = index;
});

const departureFileds = fields.filter((field) =>
  field.field.includes("departure")
);
console.log(
  myTicket
    .split(",")
    .map((value) => Number(value))
    .filter((_, i) => departureFileds.some((field) => field.index! === i))
    .reduce((acc, value) => acc * value, 1)
);
