import { render, fireEvent, act, screen } from "@testing-library/react";
import { LeaderBoard } from "../src/screens/LeaderBoard";

window.localStorage.__proto__.getItem = jest.fn().mockReturnValue(
  JSON.stringify([
    { winnerName: "xXXDracoXxxX", time: 107, design: "crazy" },
    { winnerName: "valentinoConti", time: 122, design: "original" },
  ])
);

it("should test the leaderboard displaying its high scores out of localStorage", async () => {
  render(<LeaderBoard setScreen={jest.fn()} key="test" />);

  expect(screen.queryByText('valentinoConti')).toBeTruthy();
  expect(screen.queryByText('crazy')).toBeTruthy();
  expect(screen.queryByText('2:02')).toBeTruthy();
  expect(screen.queryByText('xXXDracoXxxX')).toBeTruthy();
  expect(screen.queryByText('original')).toBeTruthy();
  expect(screen.queryByText('1:47')).toBeTruthy();
});
