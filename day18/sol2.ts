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

function applyOp(op: string, a: number, b: number): number {
  switch (op) {
    case "+":
      return a + b;
    case "*":
      return a * b;
  }
  return 0;
}

function precedence(op1: string, op2: string): boolean {
  return op1 === "*" && op2 === "+";
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const input: string[] = readAll(FILE_DIR + FILE_NAME);
const sols: number[] = input.map((line) => {
  const opsStack: string[] = [];
  // Transform infix to postfix
  let p = line
    .replace(/\s/g, "")
    .split("")
    .reduce((acc, value) => {
      if (/\d+/.test(value)) {
        return acc + " " + value;
      }
      if (value === "(") {
        opsStack.push("(");
      } else if (value === ")") {
        while (opsStack.length !== 0 && opsStack[opsStack.length - 1] != "(") {
          acc = acc + " " + opsStack.pop();
        }
        opsStack.pop();
      }
      if (value === "+" || value === "*") {
        if (opsStack.length === 0 || opsStack[opsStack.length - 1] === "(")
          opsStack.push(value);
        else {
          while (
            opsStack.length !== 0 &&
            opsStack[opsStack.length - 1] !== "(" &&
            precedence(value, opsStack[opsStack.length - 1])
          )
            acc = acc + " " + opsStack.pop();
          opsStack.push(value);
        }
      }
      return acc;
    }, "");
  while (opsStack.length !== 0) p = p + " " + opsStack.pop();
  p = p.slice(1);
  const numStack: number[] = [];
  p.split(" ").forEach((value) => {
    if (/\d+/.test(value)) numStack.push(Number(value));
    if (value === "+" || value === "*")
      numStack.push(applyOp(value, numStack.pop()!, numStack.pop()!));
  });
  return numStack.pop() || NaN;
});
console.log(sols.reduce((acc, value) => acc + value, 0));
