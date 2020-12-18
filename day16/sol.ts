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

interface Rule {
  field: string;
  minRange: number[];
  maxRange: number[];
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const input: string[] = readAll(FILE_DIR + FILE_NAME);
const auxRange1 = input.indexOf("your ticket:");
const auxRange2 = input.indexOf("nearby tickets:");
const rules: Rule[] = input.slice(undefined, auxRange1 - 1).map((line) => {
  const ruleRegex: RegExp = /^(\w+(?:\s\w+)?):\s(\d+)-(\d+)\sor\s(\d+)-(\d+)$/;
  const match = line.match(ruleRegex) || [];
  return {
    field: match[1],
    minRange: [Number(match[2]), Number(match[3])],
    maxRange: [Number(match[4]), Number(match[5])],
  };
});
const myTicket: string = input[auxRange1 + 1];
const tickets: string[] = input.slice(auxRange2 + 1);
const cache: Map<number, boolean> = new Map();
/*const invalids: string[] =*/ console.log(
  tickets.reduce((acc, ticket) => {
    const summ: number = ticket.split(",").reduce((acc, value) => {
      const auxValue = Number(value);
      if (cache.has(auxValue)) {
        return !cache.get(auxValue) ? acc + auxValue : acc;
      }
      const result = rules.some((rule) => {
        if (
          (rule.minRange[0] <= auxValue && auxValue <= rule.minRange[1]) ||
          (rule.maxRange[0] <= auxValue && auxValue <= rule.maxRange[1])
        )
          return true;
        return false;
      }, 0);
      cache.set(auxValue, result);
      return !result ? acc + auxValue : acc;
    }, 0);
    return acc + summ;
  }, 0)
);

// let acc = 0;
// cache.forEach((value, key)=>{
//     if(!value) acc += key;
// });
// console.log(cache);
// console.log(acc);
