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
const input: string[] = readAll(FILE_DIR + FILE_NAME);
const foodList: string[] = [];
const foodListByAllergen = input.reduce((acc, line) => {
  const regex = /^((?:\w+\s?)+)\s\(contains\s((?:\w+(?:,\s)?)+)\)$/;
  const match = line.match(regex);
  const ingredients: string[] = match![1].split(" ");
  const allergens: string[] = match![2].split(", ");
  foodList.push(...ingredients);
  allergens.forEach((al) => {
    if (acc.has(al)) acc.get(al)!.push(ingredients);
    else acc.set(al, [ingredients]);
  });
  return acc;
}, new Map<string, string[][]>());

const mayHaveAllergensList: string[][] = [];
foodListByAllergen.forEach((value) => {
  mayHaveAllergensList.push(
    value.reduce((acc, ingredients) =>
      ingredients.filter((x) => acc.includes(x))
    )
  );
});
const mayHaveAllergensSet = new Set(mayHaveAllergensList.flat());
const mayNotHaveAllergensList = foodList.filter(
  (value) => !mayHaveAllergensSet.has(value)
);
console.log(mayNotHaveAllergensList.length);
