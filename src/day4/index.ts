import path from "path";
import fs from "fs";

const listPath = path.join(__dirname, "./data/input");
const input: string[] = fs.readFileSync(listPath, "utf-8").split("\n");

const checkMAS = (x: number, y: number): boolean => {
  const match1 = input[x + 1][y + 1] === "M" && input[x - 1][y - 1] === "S";
  const match2 = input[x + 1][y + 1] === "S" && input[x - 1][y - 1] === "M";
  const match3 = input[x - 1][y + 1] === "M" && input[x + 1][y - 1] === "S";
  const match4 = input[x - 1][y + 1] === "S" && input[x + 1][y - 1] === "M";

  return (match1 || match2) && (match3 || match4);
};

let sum = 0;
for (let x = 0; x < input.length; x++) {
  for (let y = 0; y < input[x].length; y++) {
    if (
      input[x][y] === "A" &&
      x > 0 &&
      y > 0 &&
      x < input.length - 1 &&
      y < input[x].length - 1 &&
      checkMAS(x, y)
    ) {
      sum++;
    }
  }
}

console.log(sum);
