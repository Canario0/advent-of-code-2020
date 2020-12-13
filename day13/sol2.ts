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

function gcd(a: number, b: number): number {
  return a ? gcd(b % a, a) : b;
}

function chineseReminder(N: number, ni: number[], bi: number[]): number {
  console.log(N);
  console.log(ni);
  console.log(bi);
  let Ni = ni.map((value) => N / value);
  console.log(Ni);
  let xi = Ni.map((a, i) => {
    let m = ni[i];
    let m0 = m;
    let y = 0,
      x = 1;
    if (m == 1) return 0;
    while (a > 1) {
      let q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    if (x < 0) x += m0;
    return x;
  });
  console.log(xi);
  let products = xi.map((value, i) => {
    return bi[i] * Ni[i] * value;
  });
  console.log(products);
  return products.reduce((acc, x) => acc + x) % N;
}

interface BusInfo {
  num: number;
  position: number;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const input: string[] = readAll(FILE_DIR + FILE_NAME);
const EARLIEST_TIMESTAMP: number = Number(input[0]);
const BUSES_INFO: BusInfo[] = input[1]
  .split(",")
  .map((num, i) => {
    return { num: Number(num), position: i };
  })
  .filter((item) => !isNaN(item.num));
console.log(BUSES_INFO);
// Not working due to bug in this reduce
let N = BUSES_INFO.reduce((acc, busInfo) => acc * busInfo.num, 1);
let ni = BUSES_INFO.map((busInfo) => busInfo.num);
let bi = BUSES_INFO.map((busInfo) => {
  const diff = busInfo.num - busInfo.position;
  // Mandatory due to bug in js mod calculation
  if (diff >= 0) return diff % busInfo.num;
  return ((diff%busInfo.num)+busInfo.num)%busInfo.num;
});
console.log(chineseReminder(N, ni, bi));
