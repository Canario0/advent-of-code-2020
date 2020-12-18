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
  z: number;
}

function* neighborsGenerator(coordinate: Coordinate) {
  for (let z = -1; z <= 1; z++) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && z === 0 && y == 0) continue;
        yield {
          x: coordinate.x + x,
          y: coordinate.y + y,
          z: coordinate.z + z,
        };
      }
    }
  }
}

function getCubeState(
  coordinate: Coordinate,
  cube: Map<number, string[][]>
): string | undefined {
  const plane = cube.get(coordinate.z) || [];
  const row = plane[coordinate.x] || [];
  return row[coordinate.y];
}

function printCube(
  cube: Map<string, string>,
  zLimits: number[],
  xLimits: number[],
  yLimits: number[]
): void {
  for (let z = zLimits[0]; z <= zLimits[1]; z++) {
    for (let x = xLimits[0]; x <= xLimits[1]; x++) {
      let lines = "";
      for (let y = yLimits[0]; y <= yLimits[1]; y++) {
        lines = lines + cube.get(JSON.stringify({ x, y, z })) + " ";
      }
      console.log(lines);
    }
    console.log();
  }
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const input: string[] = readAll(FILE_DIR + FILE_NAME);
let cube: Map<string, string> = new Map();
let coordinates: Coordinate[] = [];
input.forEach((line, x) =>
  line.split("").forEach((value, y) => {
    let currentCoordinate = { x: x, y: y, z: 0 };
    if (value === "#") {
      coordinates.push(currentCoordinate);
    }
    cube.set(JSON.stringify(currentCoordinate), value);
  })
);
let auxCoordinates: Coordinate[] = [];
for (let process = 0; process < 6; process++) {
  let zValues = coordinates.map((coordinate) => coordinate.z);
  let xValues = coordinates.map((coordinate) => coordinate.x);
  let yValues = coordinates.map((coordinate) => coordinate.y);
  let zLimits = [Math.min(...zValues) - 1, Math.max(...zValues) + 1];
  let xLimits = [Math.min(...xValues) - 1, Math.max(...xValues) + 1];
  let yLimits = [Math.min(...yValues) - 1, Math.max(...yValues) + 1];

  let auxCube: Map<string, string> = new Map();
  for (let z = zLimits[0]; z <= zLimits[1]; z++) {
    for (let x = xLimits[0]; x <= xLimits[1]; x++) {
      for (let y = yLimits[0]; y <= yLimits[1]; y++) {
        const currentCoordinate = { x, y, z };
        const currState = cube.get(JSON.stringify(currentCoordinate)) || ".";
        const neighborsState = [];
        const neighbors = neighborsGenerator(currentCoordinate);
        for (let coordinate of neighbors) {
          neighborsState.push(cube.get(JSON.stringify(coordinate)) || ".");
        }
        const activeNeighbors = neighborsState.filter((value) => value === "#")
          .length;
        if (currState === "#") {
          if (activeNeighbors === 2 || activeNeighbors === 3) {
            auxCoordinates.push(currentCoordinate);
            auxCube.set(JSON.stringify(currentCoordinate), currState);
          } else {
            auxCube.set(JSON.stringify(currentCoordinate), ".");
          }
        } else {
          if (activeNeighbors === 3) {
            auxCoordinates.push(currentCoordinate);
            auxCube.set(JSON.stringify(currentCoordinate), "#");
          } else auxCube.set(JSON.stringify(currentCoordinate), currState);
        }
      }
    }
  }
  cube = auxCube;
  coordinates = auxCoordinates;
  /* printCube(cube, zLimits, xLimits, yLimits); */
}

let counter = 0;
cube.forEach((value) => {
  if (value === "#") counter++;
});

console.log(counter);
