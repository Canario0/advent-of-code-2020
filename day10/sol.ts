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
const data: number[] = readAll(FILE_DIR + FILE_NAME).map((input) =>
  Number(input)
);

console.log(data);
console.log(data.length);
let adapter = Math.max(...data) + 3;
data.push(adapter);
const result = data
  .sort((a, b) => a - b)
  .map((_, index, data) => {
    if (index === 0) return data[index];
    return data[index] - data[index - 1];
  });
const ones = result.filter((x) => x === 1).length;
const threes = result.filter((x) => x === 3).length;
console.log(result);
console.log(ones);
console.log(threes);
console.log(ones * threes);
