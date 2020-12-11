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
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j + 1],
    [i + 1, j + 1],
    [i + 1, j],
    [i + 1, j - 1],
    [i, j - 1],
  ];
  return mask
    .map((position) => {
      let [x, y] = position;
      if (x < 0 || x >= sitMap.length) return ".";
      if (y < 0 || y >= sitMap[x].length) return ".";
      return sitMap[x][y];
    })
    .filter((state) => state === "#").length;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
let data: string[][] = readAll(FILE_DIR + FILE_NAME).map((input) =>
  input.split("")
);

let occupied = 0;
let auxMap: string [][] = [[]];
while(JSON.stringify(auxMap)!== JSON.stringify(data)){
  occupied = 0;
  auxMap = data;
  data = data.map((row, i) =>
    row.map((state, j) => {
      let returnState = ".";
      let occupiedCount: number = countOccupied(data, i, j);
      switch (state) {
        case "#":
          if (occupiedCount >= 4) returnState = "L";
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
  /* console.log(data.map((row) => row.join("")).join("\n")); */
  /* console.log(auxMap.map((row) => row.join("")).join("\n")); */
  /* console.log("--------------------------------"); */
}
console.log(occupied);
