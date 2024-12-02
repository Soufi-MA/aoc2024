import path from "path";
import fs from "fs";

const listPath = path.join(__dirname, "./data/input");
const listData = fs.readFileSync(listPath, "utf-8");
const reports = listData.split("\n");

const isValidReport = (levels: number[]) => {
  return !levels.slice(0).some((level, i) => {
    const diff = Math.abs(level - levels[i - 1]);
    const direction = levels[i - 1] < level;
    return (
      diff > 3 ||
      diff < 1 ||
      (i > 1 && direction !== levels[i - 2] < levels[i - 1])
    );
  });
};

const retryWithDamp = (levels: number[]) => {
  return levels.some((_, j) => {
    const filteredLevels = levels.slice(0, j).concat(levels.slice(j + 1));
    return isValidReport(filteredLevels);
  });
};

const answer = reports.reduce((total, report) => {
  const levels = report.split(" ").map(Number);
  if (isValidReport(levels) || retryWithDamp(levels)) return ++total;
  return total;
}, 0);

console.log({ answer });
