// NOT WORKING TODO: CHECK WHY?
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

// Failed aproach
function testInput(
  input: string[],
  ruleNum: string,
  ruleGraph: Map<string, Rule>,
  chache: Map<string, boolean>
): boolean {
  /* console.log(input, ruleNum); */
  if (input.length === 0) return true;
  /* const subMessage = input.slice(1).join(""); */
  /* if (chache.has(subMessage)) return cache.get(subMessage)!; */
  const rule: Rule = ruleGraph.get(ruleNum)!;
  /* console.log(rule); */
  if (rule.final) {
    const character = input.shift()!;
    const charactersEquals = character === rule.character;
    /* console.log(charactersEquals); */
    if (!charactersEquals) input.unshift(character);
    return charactersEquals;
  }
  const matchRule: boolean =
    rule.subRules?.some((subRules) => {
      return subRules.every((ruleNum, index) =>
        testInput(input, ruleNum, ruleGraph, cache)
      );
    }) || false;
  /* cache.set(subMessage, matchRule); */
  /* console.log(matchRule); */
  return matchRule;
}

interface Rule {
  final: boolean;
  subRules?: string[][];
  character?: string;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const input: string[] = readAll(FILE_DIR + FILE_NAME);
const sepIndex = input.indexOf("");
const messages = input.slice(sepIndex + 1);
const ruleGraph = input.slice(undefined, sepIndex).reduce((acc, line) => {
  const ruleRegex = /^(\d+):\s((?:\d+\s?)+)(?:\s\|\s((?:\d+\s?)+))?$/;
  const finalRuleRegex = /^(\d+):\s"(\w)"$/;
  if (finalRuleRegex.test(line)) {
    let [_, ruleNum, character] = line.match(finalRuleRegex) || [];
    acc.set(ruleNum, { final: true, character });
  } else {
    let [_, ruleNum, subRule1, subRule2] = line.match(ruleRegex) || [];
    acc.set(ruleNum, {
      final: false,
      subRules: subRule2
        ? [subRule1.split(" "), subRule2.split(" ")]
        : [subRule1.split(" ")],
    });
  }
  return acc;
}, new Map<string, Rule>());
const cache: Map<string, boolean> = new Map();
/* console.log(messages); */
/* console.log(ruleGraph); */
console.log(
  messages.filter((message) => {
    const messageSplitted = message.split("");
    return (
      testInput(messageSplitted, "0", ruleGraph, cache) &&
      messageSplitted.length === 0
    );
    /* console.log(message); */
    /* return test; */
  }).length
);
