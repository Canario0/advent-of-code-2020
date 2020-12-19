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
function generateRegex(ruleNum: string, ruleGraph: Map<string, Rule>): string {
  /* console.log(input, ruleNum); */
  const rule: Rule = ruleGraph.get(ruleNum)!;
  /* console.log(rule); */
  if (rule.final) return rule.character!;
  const subRulesConcat: string[] =
    rule.subRules?.map((subRules) => {
      return subRules
        .map((ruleNum) => generateRegex(ruleNum, ruleGraph))
        .join("");
    }) || [];
  /* cache.set(subMessage, matchRule); */
  /* console.log(matchRule); */
  return rule.subRules?.length == 1
    ? subRulesConcat.join("")
    : `(?:${subRulesConcat.join("|")})`;
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
/* console.log(generateRegex("0", ruleGraph)); */
const regex = new RegExp("^" + generateRegex("0", ruleGraph) + "$");
console.log(messages.filter((message) => regex.test(message)).length);
