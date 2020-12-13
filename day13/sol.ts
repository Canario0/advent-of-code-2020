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

interface BusInfo {
  num: number;
  departingTime: number;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
const input: string[] = readAll(FILE_DIR + FILE_NAME);
const EARLIEST_TIMESTAMP: number = Number(input[0]);
const BUSES_INFO: BusInfo[] = input[1]
  .replace(/,x/g, "")
  .split(",")
  .map((num) => {
    return { num: Number(num), departingTime: 0 };
  });

let response: BusInfo = {num : 0, departingTime : -1};
/* console.log(EARLIEST_TIMESTAMP); */
for (let busInfo of BUSES_INFO) {
  const nTimes = Math.round(EARLIEST_TIMESTAMP / busInfo.num);
  /* console.log(nTimes); */
  busInfo.departingTime = nTimes * busInfo.num;
  if (busInfo.departingTime < EARLIEST_TIMESTAMP)
    busInfo.departingTime += busInfo.num;
    if (response.departingTime > busInfo.departingTime || response.departingTime === -1) response = busInfo;
  /* console.log(busInfo); */
}
/* console.log(response); */
console.log((response.departingTime - EARLIEST_TIMESTAMP) * response.num);
