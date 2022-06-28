import { render, fireEvent, screen } from "@testing-library/react";
import { App } from "../src/App";

it("Should start a game and verify its rules working correct", async () => {
  render(<App />);

  // Press the play button, game map shouldn't be there before and should be there after
  expect(screen.queryByTestId("game-map")).toBeFalsy();
  fireEvent.click(screen.getByText("Play"));
  expect(screen.queryByTestId("game-map")).toBeTruthy();

  // Tile shouldn't be moved if its not the top on its column
  expect(screen.queryByTestId("tile-4-1").style.background).toBe("red");
  fireEvent.mouseDown(screen.queryByTestId("tile-4-1"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-5-1"));
  expect(screen.queryByTestId("tile-4-1").style.background).toBe("red");

  // But it should be moved if it's the one on the top!
  expect(screen.queryByTestId("tile-4-0").style.background).toBe("green");
  fireEvent.mouseDown(screen.queryByTestId("tile-4-0"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-5-0"));
  expect(screen.queryByTestId("tile-4-0").style.background).toBe("white");

  // Now, the now-at-the-top tile still shouldn't be able to move, because there is a red on the 6th column.
  expect(screen.queryByTestId("tile-4-1").style.background).toBe("red");
  fireEvent.mouseDown(screen.queryByTestId("tile-4-1"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-5-1"));
  expect(screen.queryByTestId("tile-4-1").style.background).toBe("red");

  // If we move the green tile from 6th column to 7th column, and then try it again, it should work.
  fireEvent.mouseDown(screen.queryByTestId("tile-5-0"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-6-0"));
  fireEvent.mouseDown(screen.queryByTestId("tile-4-1"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-5-1"));
  expect(screen.queryByTestId("tile-4-1").style.background).toBe("white");

  // Other reds should be able to join the 6th column now
  expect(screen.queryByTestId("tile-4-2").style.background).toBe("red");
  fireEvent.mouseDown(screen.queryByTestId("tile-4-2"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-5-2"));
  expect(screen.queryByTestId("tile-4-2").style.background).toBe("white");

  // And the green from 7th column cannot go to the left because there are red tiles on 6th column.
  expect(screen.queryByTestId("tile-6-0").style.background).toBe("green");
  fireEvent.mouseDown(screen.queryByTestId("tile-6-0"));
  fireEvent.mouseUp(screen.queryByTestId("tile-overlap-5-0"));
  expect(screen.queryByTestId("tile-5-0").style.background).toBe("white");
});
