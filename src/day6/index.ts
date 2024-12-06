import path from "path";
import fs from "fs";

const listPath = path.join(__dirname, "./data/test");
let input: string[] = fs.readFileSync(listPath, "utf-8").split("\n");
let inputCopy: string[] = fs.readFileSync(listPath, "utf-8").split("\n");

const directionMap = {
  "^": {
    x: -1,
    y: 0,
  },
  ">": {
    x: 0,
    y: 1,
  },
  v: {
    x: 1,
    y: 0,
  },
  "<": {
    x: 0,
    y: -1,
  },
};

function checkIsLoop(i: number, j: number, caret: "^" | "<" | ">" | "v") {
  inputCopy[i] = replaceAtIndex(inputCopy[i], j, ".");
  let inBound = true;
  let caretX = i;
  let caretY = j;
  let check = "#";

  const path = new Set<string>();
  const posDir = new Set<string>();

  while (inBound) {
    if (
      (check === "." || check === "X") &&
      (caret === "^" || caret === ">" || caret === "v" || caret === "<")
    ) {
      if (posDir.has(`${caretX},${caretY},${caret}`)) {
        return true;
      }
      path.add(`${caretX},${caretY}`);
      posDir.add(`${caretX},${caretY},${caret}`);

      check =
        inputCopy[caretX + directionMap[caret].x][
          caretY + directionMap[caret].y
        ];

      inputCopy[caretX + directionMap[caret].x] = replaceAtIndex(
        inputCopy[caretX + directionMap[caret].x],
        caretY + directionMap[caret].y,
        caret
      );
      inputCopy[caretX + directionMap[caret].x] = replaceAtIndex(
        inputCopy[caretX + directionMap[caret].x],
        caretY + directionMap[caret].y,
        "X"
      );

      caretX = caretX + directionMap[caret].x;
      caretY = caretY + directionMap[caret].y;
      if (!inputCopy[caretX + directionMap[caret].x]) {
        inBound = false;
        break;
      }
      check =
        inputCopy[caretX + directionMap[caret].x][
          caretY + directionMap[caret].y
        ];
    } else if (check === "#") {
      switch (caret) {
        case "^":
          //   console.log("go right");
          caret = ">";
          break;
        case ">":
          //   console.log("go down");

          caret = "v";
          break;
        case "v":
          //   console.log("go left");

          caret = "<";
          break;
        case "<":
          //   console.log("go up");
          caret = "^";
          break;
        default:
          caret = "^";
      }
      check = ".";
    } else {
      inBound = false;
    }
  }
  return false;
}

function replaceAtIndex(str: string, index: number, replacement: string) {
  if (index < 0 || index >= str.length) {
    throw new Error("Index out of bounds");
  }
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
}

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    let caret = input[i][j];
    if (
      caret === "^" ||
      caret === ">" ||
      caret === "<" ||
      (caret === "v" && directionMap[caret])
    ) {
      input[i] = replaceAtIndex(input[i], j, ".");
      let inBound = true;
      let caretX = i;
      let caretY = j;
      let check =
        input[caretX + directionMap[caret].x][caretY + directionMap[caret].y];

      while (inBound) {
        if (
          (check === "." || check === "X") &&
          (caret === "^" || caret === ">" || caret === "v" || caret === "<")
        ) {
          const isLoop = checkIsLoop(
            caretX + directionMap[caret].x,
            caretX + directionMap[caret].x,
            caret
          );
          console.log({ isLoop });

          check =
            input[caretX + directionMap[caret].x][
              caretX + directionMap[caret].x
            ];

          input[caretX + directionMap[caret].x] = replaceAtIndex(
            input[caretX + directionMap[caret].x],
            caretY + directionMap[caret].y,
            caret
          );
          input[caretX + directionMap[caret].x] = replaceAtIndex(
            input[caretX + directionMap[caret].x],
            caretY + directionMap[caret].y,
            "X"
          );

          caretX = caretX + directionMap[caret].x;
          caretY = caretY + directionMap[caret].y;
          if (!input[caretX + directionMap[caret].x]) {
            inBound = false;
            break;
          }
          check =
            input[caretX + directionMap[caret].x][
              caretY + directionMap[caret].y
            ];
        } else if (check === "#") {
          switch (caret) {
            case "^":
              //   console.log("go right");
              caret = ">";
              break;
            case ">":
              //   console.log("go down");

              caret = "v";
              break;
            case "v":
              //   console.log("go left");

              caret = "<";
              break;
            case "<":
              //   console.log("go up");
              caret = "^";
              break;
            default:
              caret = "^";
          }
          check = ".";
        } else {
          inBound = false;
        }
      }
    }
  }
}
let count = 0;
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === "X") {
      count++;
    }
  }
}
console.log({ count });
