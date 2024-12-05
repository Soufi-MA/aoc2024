import path from "path";
import fs from "fs";

const listPath = path.join(__dirname, "./data/input.txt");
const input: string[] = fs.readFileSync(listPath, "utf-8").split("\n\n");
const rules = input[0].split("\n");
const updates = input[1].split("\n");

const ruleSet = new Set(
  rules.map((rule) => {
    const [a, b] = rule.split("|");
    return `${b},${a}`;
  })
);

let incorrectUpdates = updates.filter((update) => {
  const items = update.split(",");
  return items.some(
    (item, index) =>
      index < items.length - 1 && ruleSet.has(`${item},${items[index + 1]}`)
  );
});

let violationsExist = true;
while (violationsExist) {
  violationsExist = false;
  for (let i = 0; i < incorrectUpdates.length; i++) {
    const update = incorrectUpdates[i].split(",");
    for (let j = 0; j < update.length; j++) {
      if (ruleSet.has(`${update[j]},${update[j + 1]}`)) {
        [update[j], update[j + 1]] = [update[j + 1], update[j]];
        violationsExist = true;
      }
    }
    incorrectUpdates[i] = update.toString();
  }
}

const sum = incorrectUpdates.reduce((sum, update) => {
  const nums = update.split(",").map(Number);
  return sum + nums[Math.floor(nums.length / 2)];
}, 0);

console.log({ sum });
