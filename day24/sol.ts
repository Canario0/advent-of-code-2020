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

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const tiles: string[] = readAll(FILE_DIR + FILE_NAME);
const floorPattern: Map<string, string> = new Map();
tiles.forEach((tile) => {
  const regex = /(?:e|se|ne|nw|w|sw)/g;
  const delimiters = tile.match(regex);
  console.log(delimiters);
  const coordinates: number[] = delimiters!.reduce(
    (acc, direction) => {
      switch (direction) {
        case "ne":
          acc[0] += 1;
          acc[1] -= 1;
          break;
        case "e":
          acc[0] += 2;
          break;
        case "se":
          acc[0] += 1;
          acc[1] += 1;
          break;
        case "sw":
          acc[0] -= 1;
          acc[1] += 1;
          break;
        case "w":
          acc[0] -= 2;
          break;
        case "nw":
          acc[0] -= 1;
          acc[1] -= 1;
          break;
        default:
          console.log("ERROR");
          break;
      }
      console.log(direction, acc);
      return acc;
    },
    [0, 0]
  );
  console.log(coordinates);
  const currentColor = floorPattern.get(JSON.stringify(coordinates));
  floorPattern.set(
    JSON.stringify(coordinates),
    currentColor === "white" || currentColor == null ? "black" : "white"
  );
});
let blackCounter = 0;
floorPattern.forEach(value => {
  if (value === 'black') blackCounter ++;
})
console.log(blackCounter);
