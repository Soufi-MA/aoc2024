import path from "path";
import fs from "fs";

const listPath = path.join(__dirname, "./data/input");
const input = fs.readFileSync(listPath, "utf-8");

const parseNumber = (str: string, startIdx: number, maxDigits = 3) => {
  let numStr = "";
  let i = startIdx;
  while (maxDigits > 0 && i < str.length && !isNaN(Number(str[i]))) {
    numStr += str[i];
    i++;
    maxDigits--;
  }
  return { num: Number(numStr), nextIdx: i };
};

let answer = 0;
let doMul = true;
for (let i = 0; i < input.length; i++) {
  if (input[i] === "d" && input[i + 1] === "o") {
    if (
      input[i + 2] === "n" &&
      input[i + 3] === "'" &&
      input[i + 4] === "t" &&
      input[i + 5] === "(" &&
      input[i + 6] === ")"
    ) {
      doMul = false;
      i += 6;
      continue;
    }
    if (input[i + 2] === "(" && input[i + 3] === ")") {
      doMul = true;
      i += 3;
      continue;
    }
    i += 2;
    continue;
  }

  if (
    input[i] === "m" &&
    input[i + 1] === "u" &&
    input[i + 2] === "l" &&
    input[i + 3] === "(" &&
    !isNaN(Number(input[i + 4]))
  ) {
    let { num: num1, nextIdx } = parseNumber(input, i + 4);
    if (input[nextIdx] !== ",") {
      i = nextIdx;
      continue;
    }
    let { num: num2, nextIdx: endIdx } = parseNumber(input, nextIdx + 1);
    if (input[endIdx] !== ")") {
      i = nextIdx;
      continue;
    }
    if (doMul) answer += num1 * num2;
    i = endIdx;
  }
}

console.log({ answer });
