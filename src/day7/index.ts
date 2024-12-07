import path from "path";
import fs from "fs";

const listPath = path.join(__dirname, "./data/input");
const input = fs.readFileSync(listPath, "utf-8").trim().split("\n");

const start = performance.now();

const operations = ["*", "+", "||"];
let sum = 0;

function evaluateLeftToRight(
  equation: number[],
  operators: string[]
): number | null {
  let result = equation[0];

  for (let i = 0; i < operators.length; i++) {
    const nextNumber = equation[i + 1];
    switch (operators[i]) {
      case "+":
        result += nextNumber;
        break;
      case "*":
        result *= nextNumber;
        break;
      case "||":
        result = Number(result.toString() + nextNumber.toString());
        break;
      default:
        throw new Error(`Invalid operator: ${operators[i]}`);
    }
  }

  return result;
}

function generateCombinationMaps(maxLength: number): Map<number, string[][]> {
  const combinationsMap = new Map<number, string[][]>();

  for (let length = 1; length <= maxLength; length++) {
    const combinations: string[][] = [];
    const total = Math.pow(operations.length, length);

    for (let i = 0; i < total; i++) {
      const combination: string[] = [];
      let index = i;

      for (let j = 0; j < length; j++) {
        combination.push(operations[index % operations.length]);
        index = Math.floor(index / operations.length);
      }

      combinations.push(combination);
    }

    combinationsMap.set(length, combinations);
  }

  return combinationsMap;
}

const longestNumbers = Math.max(
  ...input.map((line) => line.split(":")[1].trim().split(" ").length)
);
const combinationsMap = generateCombinationMaps(longestNumbers - 1);

for (let i = 0; i < input.length; i++) {
  const [valueStr, numbersStr] = input[i].split(":");
  const targetValue = Number(valueStr.trim());
  const numbers = numbersStr.trim().split(" ").map(Number);

  const operatorCombinations = combinationsMap.get(numbers.length - 1);
  if (!operatorCombinations) throw new Error("Error parsing combinations");

  for (const operators of operatorCombinations) {
    if (evaluateLeftToRight(numbers, operators) === targetValue) {
      sum += targetValue;
      break;
    }
  }
}

const end = performance.now();

console.log({ sum });
console.log(`Execution Time: ${(end - start).toFixed()} ms`);

// Part 1: 932144119644

// Part 2: 661823605105500
