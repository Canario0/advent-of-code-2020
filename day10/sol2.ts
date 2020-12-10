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

function findBranches(index: number, data: number[]): number[] {
  const values: number[] = [];
  for (let i = index + 1; i <= index + 3; i++) {
    if (data[i] == null) continue;
    let aux = data[i] - data[index];
    if (aux === 1 || aux === 2 || aux === 3) {
      values.push(data[i]);
      /* result = true; */
    }
  }
  return values;
}

function len(
  value: number,
  map: Map<number, number[]>,
  cache: Map<number, number>
): number {
  const values = map.get(value);
  if (!values?.length) return 1;
  if (cache.has(value)) return cache.get(value) || NaN;
  const count = values.reduce((sum, x) => sum + len(x, map, cache), 0);
  cache.set(value, count);
  return count;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const data: number[] = readAll(FILE_DIR + FILE_NAME).map((input) =>
  Number(input)
);

let adapter = Math.max(...data) + 3;
data.push(adapter);
data.push(0);
const sortedData = data.sort((a, b) => a - b);
const map: Map<number, number[]> = new Map(
  sortedData.map((data, index, sortedData) => [
    data,
    findBranches(index, sortedData),
  ])
);
console.log(len(0, map, new Map<number, number>()));
