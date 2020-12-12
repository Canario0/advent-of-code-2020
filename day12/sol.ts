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

interface NavInstruction {
  action: string;
  value: number;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const instructions: NavInstruction[] = readAll(FILE_DIR + FILE_NAME).map(
  (input) => {
    let action = input.charAt(0);
    let value = Number(input.slice(1));
    return { action, value };
  }
);

let facingAt: string = "E";
let y: NavInstruction = { action: "N", value: 0 };
let x: NavInstruction = { action: "E", value: 0 };

for (let instruction of instructions) {
  switch (instruction.action) {
    case "N":
    case "S":
      if (y.action === instruction.action) y.value += instruction.value;
      else {
        y.action = instruction.action;
        y.value = instruction.value - y.value;
      }
      break;
    case "E":
    case "W":
      if (x.action === instruction.action) x.value += instruction.value;
      else {
        x.action = instruction.action;
        x.value = instruction.value - x.value;
      }
      break;
    case "L":
    case "R":
      const directions =
        instruction.action === "R"
          ? ["N", "E", "S", "W"]
          : ["N", "E", "S", "W"].reverse();
      /* console.log(instruction); */
      const jumps =
        instruction.value % 360 === 0
          ? instruction.value / 360 / 90
          : instruction.value / 90;
      const i = directions.indexOf(facingAt) + jumps;
      facingAt = directions[i % directions.length];
      /* console.log(facingAt); */
      break;
    case "F":
      const aux = facingAt === "W" || facingAt === "E" ? x : y;
      /* console.log(aux); */
      if (facingAt === aux.action) aux.value += instruction.value;
      else {
        aux.action = facingAt;
        aux.value = instruction.value - aux.value;
      }
      /* console.log(aux); */
      break;
    default:
      console.log("Error in input");
      Deno.exit();
  }
}
console.log(Math.abs(x.value) + Math.abs(y.value));
