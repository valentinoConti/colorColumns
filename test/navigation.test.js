import { render, fireEvent, act, screen } from "@testing-library/react";
import { App } from "../src/App";

jest.spyOn(window.localStorage.__proto__, "setItem");
it("should test the app navigation", async () => {
  render(<App />);

  // Instructions, 3 pages forward
  expect(screen.queryByText(/Objetive/)).toBeFalsy();
  fireEvent.click(screen.getByText("How to play"));
  expect(screen.queryByText(/Objetive/)).toBeTruthy();

  expect(screen.queryByText(/Game rules/)).toBeFalsy();
  fireEvent.click(screen.getByText("Next"));
  expect(screen.queryByText(/Game rules/)).toBeTruthy();

  expect(screen.queryByText(/GOOD LUCK/)).toBeFalsy();
  fireEvent.click(screen.getByText("Next"));
  expect(screen.queryByText(/GOOD LUCK/)).toBeTruthy();
  expect(screen.queryByText("Next")).toBeFalsy();

  // 3 pages backward to go to the menu
  fireEvent.click(screen.getByText("Go back"));
  fireEvent.click(screen.getByText("Go back"));
  expect(screen.queryByText("How to play")).toBeFalsy();
  fireEvent.click(screen.getByText("Go back"));
  expect(screen.queryByText("How to play")).toBeTruthy();

  // Leaderboard, check empty text
  expect(screen.queryByText(/There are no records of somebody winning/)).toBeFalsy();
  fireEvent.click(screen.getByText("Leaderboard"));
  expect(screen.queryByText(/There are no records of somebody winning/)).toBeTruthy();
  fireEvent.click(screen.getByText("Go back"));

  // Settings, check page
  expect(screen.queryByText(/Auto click/)).toBeFalsy();
  fireEvent.click(screen.getByText("Settings"));
  expect(screen.queryByText(/Auto click/)).toBeTruthy();

  // Check pressing the different checkboxes to verify their call to localStorage
  fireEvent.click(screen.getByTestId("autoclick-on"));
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "color-columns-config",
    JSON.stringify({ map: "original", design: "original", autoClick: true })
  );

  fireEvent.click(screen.getByTestId("autoclick-off"));
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "color-columns-config",
    JSON.stringify({ map: "original", design: "original", autoClick: false })
  );

  fireEvent.click(screen.getByTestId("design-crazy"));
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "color-columns-config",
    JSON.stringify({ map: "original", design: "crazy", autoClick: false })
  );

  fireEvent.click(screen.getByTestId("design-original"));
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "color-columns-config",
    JSON.stringify({ map: "original", design: "original", autoClick: false })
  );

  fireEvent.click(screen.getByTestId("map-random"));
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "color-columns-config",
    JSON.stringify({ map: "random", design: "original", autoClick: false })
  );

  fireEvent.click(screen.getByTestId("map-original"));
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "color-columns-config",
    JSON.stringify({ map: "original", design: "original", autoClick: false })
  );
  fireEvent.click(screen.getByText("Go back"));
  expect(screen.queryByText("How to play")).toBeTruthy();
});
