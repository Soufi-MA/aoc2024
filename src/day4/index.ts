import path from "path";
import fs from "fs";

const listPath = path.join(__dirname, "./data/input");
const input: string[] = fs.readFileSync(listPath, "utf-8").split("\n");

const checkMAS = (x: number, y: number) => {
  if (
    (input[x + 1][y + 1] === "M" && input[x - 1][y - 1] === "S") ||
    (input[x - 1][y - 1] === "M" && input[x + 1][y + 1] === "S")
  ) {
    if (
      (input[x - 1][y + 1] === "M" && input[x + 1][y - 1] === "S") ||
      (input[x + 1][y - 1] === "M" && input[x - 1][y + 1] === "S")
    ) {
      return true;
    }
  }
  return false;
};

let sum = 0;
for (let x = 0; x < input.length; x++) {
  for (let y = 0; y < input[x].length; y++) {
    if (
      input[x][y] === "A" &&
      input.length - x > 1 &&
      input[x].length - y > 1 &&
      x !== 0 &&
      y !== 0
    ) {
      const match = checkMAS(x, y);
      if (match) {
        sum++;
      }
    }
  }
}

console.log(sum);
