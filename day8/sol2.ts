import * as fs from "fs";
import { exit } from "process";
// Functions
function fileRead(fileRoute: string): string {
  return fs.readFileSync(fileRoute, "utf8");
}

function readAll(fileRoute: string): string[] {
  const data: string[] = fileRead(fileRoute)
    .split("\n")
    .map((a) => a.replace("\r", ""));
  data.pop();
  return data;
}

function lastIndexOfNopJump(instructions: Instruction[], start:number): number {
  for (let i = start - 1; i >= 0; i--) {
    if (instructions[i].action === "nop" || instructions[i].action === "jmp")
      return i;
  }
  return -1;
}

function emulate(instructions: Instruction[]): number {
  let acc: number = 0;
  let called: boolean[] = [];
  let pointer: number = 0;
  let instruction: Instruction;
  while (pointer < instructions.length) {
    instruction = instructions[pointer];
    if (called[pointer] === true) {
      return -1;  
    }
    called[pointer] = true;
    switch (instruction.action) {
      case "acc":
        acc += instruction.modifier;
        pointer += 1;
        break;
      case "jmp":
        pointer += instruction.modifier;
        break;
      case "nop":
        pointer += 1;
        break;
      default:
        console.log("Error en la entrada");
        exit();
    }
  }
  return acc;
}

interface Instruction {
  action: string;
  modifier: number;
}

const FILE_DIR: string = "./";
const FILE_NAME: string = "in";
let data: string[] = readAll(FILE_DIR + FILE_NAME);
let instructions: Instruction[];
instructions = data.map((line) => {
  let instructionReg: RegExp = /^(\w{3}) ([+-]\d+)$/;
  let [action, modifier] = line.match(instructionReg).slice(1);
  return { action: action, modifier: parseInt(modifier) };
});

/* console.log(instructions); */
let index = lastIndexOfNopJump(instructions, instructions.length);
let prevInstructon: Instruction;
while (index !== -1){
  prevInstructon = instructions[index];
  instructions[index] = Object.assign({}, prevInstructon);
  instructions[index].action = prevInstructon.action === 'nop'? 'jmp':'nop';
  let res = emulate(instructions);
  if (res !== -1){
    console.log(res);
    break;
  }
  /* console.log(index); */
  instructions[index] = prevInstructon;
  index = lastIndexOfNopJump(instructions, index);
}
