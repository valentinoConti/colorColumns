import { render, fireEvent, act, screen } from "@testing-library/react";
import { App } from "../src/App";

// game map ready to win on two movements
jest.mock("../src/utils", () => ({
  ...jest.requireActual("../src/utils"),
  getColourMap: jest.fn().mockImplementation(() => [
    ["purple", "purple", "purple", "purple", "purple"],
    ["blue", "blue", "blue", "blue", "blue"],
    ["yellow", "yellow", "yellow", "yellow", "yellow"],
    ["green", "green", "green", "green", "green"],
    ["white", "red", "red", "red", "red"],
    ["white", "white", "white", "white", "gray"],
    ["red", "white", "white", "white", "gray"],
  ]),
}));

window.localStorage.__proto__.getItem = jest.fn().mockImplementation((param) =>
  param === "color-columns-top-ten"
    ? JSON.stringify([
        { winnerName: "xXXDracoXxxX", time: 107, design: "crazy" },
        { winnerName: "valentinoConti", time: 122, design: "original" },
      ])
    : JSON.stringify({ map: "original", design: "original", autoClick: false })
);

it("should test winning the game", async () => {
  jest.useFakeTimers();

  render(<App />);
  fireEvent.click(screen.getByText("Play"));

  // We do the first movement. Win text should NOT be there yet.
  expect(screen.queryByTestId("tile-6-0").style.background).toBe("red");
  fireEvent.mouseDown(screen.queryByTestId("tile-6-0"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-5-0"));
  expect(screen.queryByTestId("tile-6-0").style.background).toBe("white");
  act(() => jest.runOnlyPendingTimers());
  expect(screen.queryByTestId("win-info").style.opacity).toBe("0");

  // We do next movement. Win text should be there.
  fireEvent.mouseDown(screen.queryByTestId("tile-5-0"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-4-0"));
  act(() => jest.runOnlyPendingTimers());
  expect(screen.queryByTestId("win-info").style.opacity).toBe("1");

  // Register winner
  fireEvent.change(screen.getByTestId("winner-name-input"), { target: { value: "VALENTINO CONTEX MASTER" } });
  expect(screen.queryByTestId("winner-name-input").value).toBe("VALENTINO CONTEX");
  fireEvent.click(screen.getByText("✅"));
  expect(screen.queryByText(/Thank you!/)).toBeTruthy();

  jest.useRealTimers();
});
