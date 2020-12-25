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

interface Coordinate {
  x: number;
  y: number;
}

function* neighborsGenerator(coordinate: Coordinate) {
  const neighbors = [
    [+2, 0],
    [+1, -1],
    [-1, -1],
    [-2, 0],
    [-1, +1],
    [+1, +1],
  ];
  for (let neighbor of neighbors) {
    yield { x: coordinate.x + neighbor[0], y: coordinate.y + neighbor[1] };
  }
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const tiles: string[] = readAll(FILE_DIR + FILE_NAME);
let floorPattern: Map<string, string> = new Map();
let coordinates: Coordinate[] = [];
tiles.forEach((tile) => {
  const regex = /(?:e|se|ne|nw|w|sw)/g;
  const delimiters = tile.match(regex);
  const coordinate: Coordinate = delimiters!.reduce(
    (acc, direction) => {
      switch (direction) {
        case "ne":
          acc.x += 1;
          acc.y -= 1;
          break;
        case "e":
          acc.x += 2;
          break;
        case "se":
          acc.x += 1;
          acc.y += 1;
          break;
        case "sw":
          acc.x -= 1;
          acc.y += 1;
          break;
        case "w":
          acc.x -= 2;
          break;
        case "nw":
          acc.x -= 1;
          acc.y -= 1;
          break;
        default:
          console.log("ERROR");
          break;
      }
      return acc;
    },
    { x: 0, y: 0 }
  );
  coordinates.push(coordinate);
  const currentColor = floorPattern.get(JSON.stringify(coordinate));
  floorPattern.set(
    JSON.stringify(coordinate),
    currentColor === "white" || currentColor == null ? "black" : "white"
  );
});
for (let process = 0; process < 100; process++) {
  /* const xValues = coordinates.map((coodinate) => coodinate.x); */
  /* const yValues = coordinates.map((coodinate) => coodinate.y); */
  // more efficient
  const xValues: number[] = [];
  const yValues: number[] = [];
  coordinates.forEach((coordinate) => {
    xValues.push(coordinate.x);
    yValues.push(coordinate.y);
  });
  const xLimist = [Math.min(...xValues) - 2, Math.max(...xValues) + 2];
  const yLimist = [Math.min(...yValues) - 1, Math.max(...yValues) + 1];
  let auxCoordinates: Coordinate[] = [];
  let auxMap: Map<string, string> = new Map();
  for (let x = xLimist[0]; x <= xLimist[1]; x++) {
    for (let y = yLimist[0]; y <= yLimist[1]; y++) {
      const currentCoordinate: Coordinate = { x, y };
      auxCoordinates.push(currentCoordinate);
      const currentState =
        floorPattern.get(JSON.stringify(currentCoordinate)) || "white";
      const neighborsState = [];
      const neighbors = neighborsGenerator(currentCoordinate);
      for (let coordinate of neighbors) {
        neighborsState.push(
          floorPattern.get(JSON.stringify(coordinate)) || "white"
        );
      }
      const blackNeighbors = neighborsState.filter((state) => state === "black")
        .length;
      if (currentState === "white") {
        if (blackNeighbors === 2) {
          auxMap.set(JSON.stringify(currentCoordinate), "black");
        } else auxMap.set(JSON.stringify(currentCoordinate), "white");
      }

      if (currentState === "black") {
        if (blackNeighbors === 0 || blackNeighbors > 2) {
          auxMap.set(JSON.stringify(currentCoordinate), "white");
        } else auxMap.set(JSON.stringify(currentCoordinate), "black");
      }
    }
  }
  floorPattern = auxMap;
  coordinates = auxCoordinates;
  /* let blackCounter = 0; */
  /* floorPattern.forEach((value) => { */
  /*   if (value === "black") blackCounter++; */
  /* }); */
  /* console.log(`Day ${process + 1}: ${blackCounter}`); */
  /* console.log(floorPattern); */
}
let blackCounter = 0;
floorPattern.forEach((value) => {
  if (value === "black") blackCounter++;
});
console.log(blackCounter);
