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

function findInvalid(data: number[], preambleLength: number): number {
  for (let index = preambleLength; index < data.length; index++) {
    const preambles = new Set(data.slice(index - preambleLength, index));
    let found = index;
    for (let num of preambles) {
      if (preambles.has(data[index] - num)) found = -1;
    }
    if (found != -1) return data[found];
  }
  return -1;
}
const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const data: number[] = readAll(FILE_DIR + FILE_NAME).map((input) =>
  Number(input)
);

console.log(findInvalid(data, 25));
