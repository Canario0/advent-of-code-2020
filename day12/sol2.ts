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

let yWaypoint: NavInstruction = { action: "N", value: 1 };
let xWaypoint: NavInstruction = { action: "E", value: 10 };
const y: NavInstruction = { action: "N", value: 0 };
const x: NavInstruction = { action: "E", value: 0 };

for (let instruction of instructions) {
  /* console.log("---------"); */
  /* console.log(instruction); */
  /* console.log( */
  /*   `Waypoint ${JSON.stringify(xWaypoint)}, ${JSON.stringify(yWaypoint)}` */
  /* ); */
  /* console.log(`Ship ${JSON.stringify(x)}, ${JSON.stringify(y)}`); */
  switch (instruction.action) {
    case "N":
    case "S":
      if (yWaypoint.action === instruction.action)
        yWaypoint.value += instruction.value;
      else {
        yWaypoint.action = instruction.action;
        yWaypoint.value = instruction.value - yWaypoint.value;
      }
      break;
    case "E":
    case "W":
      if (xWaypoint.action === instruction.action)
        xWaypoint.value += instruction.value;
      else {
        xWaypoint.action = instruction.action;
        xWaypoint.value = instruction.value - xWaypoint.value;
      }
      break;
    case "L":
    case "R":
      const directions =
        instruction.action === "R"
          ? ["N", "E", "S", "W"]
          : ["N", "E", "S", "W"].reverse();
      const jumps =
        instruction.value % 360 === 0
          ? instruction.value / 360 / 90
          : instruction.value / 90;
      const i = directions.indexOf(xWaypoint.action) + jumps;
      const j = directions.indexOf(yWaypoint.action) + jumps;
      xWaypoint.action = directions[i % directions.length];
      yWaypoint.action = directions[j % directions.length];
      if(xWaypoint.action !== 'E' && xWaypoint.action !== 'W'){
        let aux = xWaypoint;
        xWaypoint = yWaypoint;
        yWaypoint = aux;
      }
      break;
    case "F":
      const tmpX = xWaypoint.value * instruction.value;
      const tmpY = yWaypoint.value * instruction.value;
      if (xWaypoint.action === x.action) x.value += tmpX;
      else {
        x.action = xWaypoint.action;
        x.value = tmpX - x.value;
      }
      if (yWaypoint.action === y.action) y.value += tmpY;
      else {
        y.action = yWaypoint.action;
        y.value = tmpY - y.value;
      }
      break;
    default:
      console.log("Error in input");
      Deno.exit();
  }
  /* console.log( */
  /*   `Waypoint ${JSON.stringify(xWaypoint)}, ${JSON.stringify(yWaypoint)}` */
  /* ); */
  /* console.log(`Ship ${JSON.stringify(x)}, ${JSON.stringify(y)}`); */
  /* console.log("---------"); */
}
console.log(Math.abs(x.value) + Math.abs(y.value));
