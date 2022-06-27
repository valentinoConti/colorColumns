type Color = "red" | "green" | "blue" | "purple" | "yellow" | "white" | "gray";

export const getColourMap = (): Color[][] => [
  ["blue", "blue", "green", "red", "purple"],
  ["red", "purple", "yellow", "blue", "blue"],
  ["purple", "yellow", "purple", "purple", "yellow"],
  ["yellow", "green", "blue", "yellow", "green"],
  ["green", "red", "red", "green", "red"],
  ["white", "white", "white", "white", "gray"],
  ["white", "white", "white", "white", "gray"],
];

const colorTable = ["red", "green", "blue", "purple", "yellow"];
export const getRandomMap = (): Color[][] => {
  let movableReds = 4;
  let movableGreens = 4;
  let movableBlues = 4;
  let movablePurples = 4;
  let movableYellows = 4;
  let fixedRed = true;
  let fixedGreen = true;
  let fixedBlue = true;
  let fixedPurple = true;
  let fixedYellow = true;
  const randomMap: Color[][] = [];

  // Generate a random column 5 times to create a random game map
  for (let i = 0; i < 5; i++) {
    const appendToMap: Color[] = [];
    
    // First four items on columns can repeat colours.
    let idx = 0;
    while (idx < 4) {
      const color = colorTable[Math.trunc(Math.random() * 4.99)];
      switch (color) {
        case "red":
          if (movableReds > 0) {
            movableReds--;
            appendToMap.push("red");
            idx++;
          }
          break;
        case "green":
          if (movableGreens > 0) {
            movableGreens--;
            appendToMap.push("green");
            idx++;
          }
          break;
        case "blue":
          if (movableBlues > 0) {
            movableBlues--;
            appendToMap.push("blue");
            idx++;
          }
          break;
        case "purple":
          if (movablePurples > 0) {
            movablePurples--;
            appendToMap.push("purple");
            idx++;
          }
          break;
        case "yellow":
          if (movableYellows > 0) {
            movableYellows--;
            appendToMap.push("yellow");
            idx++;
          }
          break;
        default:
          break;
      }
    }

    // Last item of each columns should be a different colour. make sure that happen.
    let condition = true;
    while (condition) {
      const color = colorTable[Math.trunc(Math.random() * 4.99)];
      switch (color) {
        case "red":
          if (fixedRed) {
            fixedRed = false;
            appendToMap.push('red');
            condition = false;
          }
          break;
        case "green":
          if (fixedGreen) {
            fixedGreen = false;
            appendToMap.push('green');
            condition = false;
          }
          break;
        case "blue":
          if (fixedBlue) {
            fixedBlue = false;
            appendToMap.push('blue');
            condition = false;
          }
          break;
        case "purple":
          if (fixedPurple) {
            fixedPurple = false;
            appendToMap.push('purple');
            condition = false;
          }
          break;
        case "yellow":
          if (fixedYellow) {
            fixedYellow = false;
            appendToMap.push('yellow');
            condition = false;
          }
          break;
        default:
          break;
      }
    }

    randomMap.push(appendToMap);
  }

  randomMap.push(["white", "white", "white", "white", "gray"]);
  randomMap.push(["white", "white", "white", "white", "gray"]);
  return randomMap;
};

export const getWinningMap = (playMap: Color[][]) => {
  const winMap = JSON.parse(JSON.stringify(playMap));
  for (let i = 0; i < 5; i++) {
    for (let idx = 0; idx < 4; idx++) {
      winMap[i][idx] = winMap[i][4];
    }
  }
  for (let i = 5; i <= 6; i++) {
    for (let idx = 0; idx < 4; idx++) {
      winMap[i][idx] = idx === 4 ? 'gray' : 'white'
    }
  }
  return JSON.stringify(winMap);
};

export const processTime = (totalSeconds: number) => {
  const minutes = Math.trunc(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;

  return minutes < 8 ? `${minutes}:${seconds > 9 ? seconds : "0" + seconds}` : "💀💀";
};

export interface IConfig {
  map: "original" | "random";
  design: "original" | "crazy";
  autoClick: boolean;
}

export interface ILeaderBoard {
  winnerName: string;
  time: number;
  design: "crazy" | "original";
}