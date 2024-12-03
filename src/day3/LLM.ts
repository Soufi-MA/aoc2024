import path from "path";
import fs from "fs";

const listPath = path.join(__dirname, "./data/input");
const input = fs.readFileSync(listPath, "utf-8");

let answer = 0;
let doMul = true;
const regex = /do(?:n't)?\(\)|mul\((\d+),(\d+)\)/g;
let match;
while ((match = regex.exec(input)) !== null) {
  if (match[0].startsWith("do")) {
    if (match[0] === "don't()") {
      doMul = false;
    } else if (match[0] === "do()") {
      doMul = true;
    }
  } else if (match[0].startsWith("mul")) {
    if (doMul) {
      const num1 = Number(match[1]);
      const num2 = Number(match[2]);
      answer += num1 * num2;
    }
  }
}

console.log({ answer });
