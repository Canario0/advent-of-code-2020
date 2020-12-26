// Functions
function fileRead(fileRoute: string): string {
  return Deno.readTextFileSync(fileRoute);
}

function readAll(fileRoute: string): string[] {
  const data: string[] = fileRead(fileRoute)
    .slice(0, -1)
    .split("\n\n")
    .map((a) => a.replace("\r", ""));
  return data;
}

function rotateTile(tile: string[][]): string[] {
  const sides = [];
  let value = tile[0].join("");
  sides.push(value);
  sides.push(value.split("").reverse().join(""));
  value = tile[tile.length - 1].join("");
  sides.push(value);
  sides.push(value.split("").reverse().join(""));
  let firstCol = "";
  let lastCol = "";
  for (let i = 0; i < tile.length; i++) {
    firstCol += tile[i][0];
    lastCol += tile[i][tile.length - 1];
  }
  sides.push(firstCol);
  sides.push(firstCol.split("").reverse().join(""));
  sides.push(lastCol);
  sides.push(lastCol.split("").reverse().join(""));
  return sides;
}
interface Tile {
  id: number;
  content: string[][];
  neighbors: number;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const input: string[] = readAll(FILE_DIR + FILE_NAME);
const squreSize = Math.floor(Math.sqrt(input.length));
const tiles: Tile[] = [];
const tilesPosition: Map<number, number> = new Map();
const matchesPerTile: Set<number>[] = [];
const sidesMatches: Map<string, number[]> = new Map();
const square: number[][] = [];
for (let i = 0; i < squreSize; i++) {
  square[i] = [];
  for (let j = 0; j < squreSize; j++) square[i][j] = 0;
}
input.forEach((input) => {
  const [tileTitle, ...tile] = input.split("\n");
  const tileId = Number(tileTitle.split(" ")[1].slice(0, -1));
  const tileContent = tile.map((row) => row.split(""));
  tiles.push({ id: tileId, content: tileContent, neighbors: 0 });
  tilesPosition.set(tileId, tiles.length - 1);
  const sides = rotateTile(tileContent);
  sides.forEach((side) => {
    if (sidesMatches.has(side)) sidesMatches.get(side)?.push(tileId);
    else sidesMatches.set(side, [tileId]);
  });
});

sidesMatches.forEach((matches) => {
  matches.forEach((tileId) => {
    if (matchesPerTile[tilesPosition.get(tileId)!] == null)
      matchesPerTile[tilesPosition.get(tileId)!] = new Set();
    matches
      .filter((id) => id !== tileId)
      .forEach((value) => matchesPerTile[tilesPosition.get(tileId)!].add(value));
  });
});
let result = 1;
tilesPosition.forEach((position, tileId) => {
  if (matchesPerTile[position].size === 2) result = result * tileId;
});
console.log(result);
