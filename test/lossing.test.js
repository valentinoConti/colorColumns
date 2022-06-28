import { render, fireEvent, act, screen } from "@testing-library/react";
import { App } from "../src/App";

it("should test the timer and the game finishing after 8 minutes", async () => {
  jest.useFakeTimers();
  render(<App />);
  fireEvent.click(screen.getByText("Play"));

  // Timer starts at 0:00, after 240 seconds, it should show 4:00 minutes.
  expect(screen.getByTestId("time").innerHTML).toBe("0:00");
  for (let i = 0; i < 240; i++) {
    act(() => jest.runOnlyPendingTimers());
  }
  expect(screen.getByTestId("time").innerHTML).toBe("4:00");

  // at that point, we should be able to move squares:
  expect(screen.queryByTestId("tile-4-0").style.background).toBe("green");
  fireEvent.mouseDown(screen.queryByTestId("tile-4-0"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-5-0"));
  expect(screen.queryByTestId("tile-4-0").style.background).toBe("white");

  // But after another 4 minutes, at minute 8, we should see a death emoji and not able to keep playing
  for (let i = 0; i < 240; i++) {
    act(() => jest.runOnlyPendingTimers());
  }
  expect(screen.getByTestId("time").innerHTML).toBe("💀💀");
  expect(screen.queryByTestId("tile-5-0").style.background).toBe("green");
  fireEvent.mouseDown(screen.queryByTestId("tile-5-0"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-4-0"));
  expect(screen.queryByTestId("tile-5-0").style.background).toBe("green");

  jest.useRealTimers();
});
