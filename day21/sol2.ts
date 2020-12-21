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

function solve(
  allergens: Ingredient[],
  used: Set<string>,
  size: number
): boolean {
  if (allergens.length === 0 && used.size === size) {
    console.log([...used].join(","));
    return true;
  }
  if(allergens.length === 0) return false;
  const currentIngredient = allergens.shift();
  const filteredIngredients = currentIngredient!.posibleIngredients.filter(x => !used.has(x));
  for (let ingredient of filteredIngredients) {
    used.add(ingredient);
    if (solve(allergens, used, size)) return true;
    used.delete(ingredient);
  }
  allergens.unshift(currentIngredient!);
  return false;
}

interface Ingredient {
  allergen: string;
  posibleIngredients: string[];
  ingredient?: string;
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
const mayHaveAllergensMap: Map<string, string[]> = new Map();
foodListByAllergen.forEach((value, key) => {
  mayHaveAllergensMap.set(
    key,
    value
      .reduce((acc, ingredients) => ingredients.filter((x) => acc.includes(x)))
      .sort((a, b) => b.localeCompare(a))
  );
});
const mayHaveAllergesEntries: Ingredient[] = [];
mayHaveAllergensMap.forEach((value, key) =>
  mayHaveAllergesEntries.push({ allergen: key, posibleIngredients: value })
);
mayHaveAllergesEntries.sort((a, b) => a.allergen.localeCompare(b.allergen));
solve(
  mayHaveAllergesEntries,
  new Set<string>(),
  mayHaveAllergesEntries.length
);
