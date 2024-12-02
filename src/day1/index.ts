import path from "path";
import fs from "fs";

const listPath = path.join(__dirname, "./data/input");
const listData = fs.readFileSync(listPath, "utf-8");
const left: number[] = [];
const right: number[] = [];
listData
  .trim()
  .split("\n")
  .forEach((line) => {
    const [leftValue, rightValue] = line.trim().split(/\s+/).map(Number);
    left.push(leftValue);
    right.push(rightValue);
  });

const rightCounts = right.reduce<Record<number, number>>((counts, value) => {
  counts[value] = (counts[value] || 0) + 1;
  return counts;
}, {});

const answer = left.reduce((total, item) => {
  const multiplier = rightCounts[item] || 0;
  return total + item * multiplier;
}, 0);

console.log({ answer });
