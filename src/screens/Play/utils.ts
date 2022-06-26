export type Color = "red" | "green" | "blue" | "purple" | "yellow" | "white" | "gray";

export const getColourMap = (): Color[][] => [
  ["blue", "blue", "green", "red", "purple"],
  ["red", "purple", "yellow", "blue", "blue"],
  ["purple", "yellow", "purple", "purple", "yellow"],
  ["yellow", "green", "blue", "yellow", "green"],
  ["green", "red", "red", "green", "red"],
  ["white", "white", "white", "white", "gray"],
  ["white", "white", "white", "white", "gray"],
];

export const winningMap = JSON.stringify([
  ["purple", "purple", "purple", "purple", "purple"],
  ["blue", "blue", "blue", "blue", "blue"],
  ["yellow", "yellow", "yellow", "yellow", "yellow"],
  ["green", "green", "green", "green", "green"],
  ["red", "red", "red", "red", "red"],
  ["white", "white", "white", "white", "gray"],
  ["white", "white", "white", "white", "gray"],
]);