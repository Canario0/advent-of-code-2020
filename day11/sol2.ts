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

function countOccupied(sitMap: string[][], i: number, j: number): number {
  let mask = [
    [-1, -1],
    [-1, 0],
    [-1, +1],
    [0, +1],
    [+1, +1],
    [+1, 0],
    [+1, -1],
    [0, -1],
  ];
  return mask
    .map((position) => {
      const [x, y] = position;
      let found = ".";
      let auxI = i + x;
      let auxJ = j + y;
      /* console.log(auxI,auxJ) */
      while (
        auxI >= 0 &&
        auxI < sitMap.length &&
        auxJ >= 0 &&
        auxJ < sitMap[i].length &&
        found === "."
      ) {
        /* console.log(i, j); */
        if (sitMap[auxI][auxJ] !== ".") found = sitMap[auxI][auxJ];
        auxI = auxI + x;
        auxJ = auxJ + y;
      }
      /* console.log(auxI,auxJ) */
      return found;
    })
    .filter((state) => state === "#").length;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
let data: string[][] = readAll(FILE_DIR + FILE_NAME).map((input) =>
  input.split("")
);

let occupied = 0;
let auxMap: string[][] = [[]];
while (JSON.stringify(auxMap) !== JSON.stringify(data)) {
  occupied = 0;
  auxMap = data;
  data = data.map((row, i) =>
    row.map((state, j) => {
      let returnState = ".";
      let occupiedCount: number = countOccupied(data, i, j);
      switch (state) {
        case "#":
          if (occupiedCount >= 5) returnState = "L";
          else {
            returnState = state;
            occupied += 1;
          }
          break;
        case "L":
          if (occupiedCount === 0) {
            returnState = "#";
            occupied += 1;
          } else returnState = state;
          break;
        default:
          break;
      }
      /* console.log(occupiedCount); */
      return returnState;
    })
  );
  /* console.log(`Iteration---`); */
  /* console.log(auxMap.map((row) => row.join("")).join("\n")); */
  /* console.log("--------------------------------"); */
  /* console.log(data.map((row) => row.join("")).join("\n")); */
  /* console.log("--------------------------------"); */
}
console.log(occupied);
