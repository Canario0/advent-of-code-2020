// Functions
function fileRead(fileRoute: string): string {
  return Deno.readTextFileSync(fileRoute);
}

function* memGame(numbers: number[]) {
  const mem = new Map<number, number | undefined>();
  for (let [i, num] of numbers.entries()) {
    yield num;
    if (numbers[i + 1] == null) {
      if (mem.has(num)) {
        const result = i - mem.get(num)!;
        numbers.push(result);
      } else numbers.push(0);
    }
    mem.set(num, i);
  }
  return "done";
}

function readAll(fileRoute: string): string[] {
  const data: string[] = fileRead(fileRoute)
    .split("\n")
    .map((a) => a.replace("\r", ""));
  data.pop();
  return data;
}

const numbers = [1, 0, 15, 2, 10, 13];
const generator = memGame(numbers);
for (let i = 0; i < 30000000 - 1; i++) generator.next();
console.log(generator.next());
