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

function generateRegex(ruleNum: string, ruleGraph: Map<string, Rule>): string {
  const rule: Rule = ruleGraph.get(ruleNum)!;
  if (rule.final) return rule.character!;
  const subRulesConcat: string[] =
    rule.subRules?.map((subRules) => {
      return subRules
        .map((ruleNum) => generateRegex(ruleNum, ruleGraph))
        .join("");
    }) || [];
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
const regex = `${generateRegex("42", ruleGraph)}+?${generateRegex('42', ruleGraph)}{x}${generateRegex('31',ruleGraph)}{x}`;
const toReturn = [];
messages.forEach(message=>{
  for (let i = 1; i < message.length; i++){
    const test =regex.replace(/x/g, `${i}`);
    const currentRegex = new RegExp(`^${test}$`);
    if(currentRegex.test(message)){
      toReturn.push(message);
      break;
    }
  }
});
console.log(toReturn.length);
