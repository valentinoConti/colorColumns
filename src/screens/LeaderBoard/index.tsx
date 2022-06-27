import { useState } from "react";
import { ILeaderBoard, processTime } from "../../utils";
import "./LeaderBoard.scss";

interface ILeaderBoardProps {
  setScreen: (screen: string) => void;
}

export const LeaderBoard = ({ setScreen }: ILeaderBoardProps) => {
  const goBack = () => setScreen("menu");
  const [scores] = useState(localStorage.getItem("color-columns-top-ten"));
  const scoresArray: ILeaderBoard[] = scores ? JSON.parse(scores) : [];

  return (
    <div id="leaderboardScreen">
      <h1>🏆 Leaderboard 🏆</h1>

      <table id="leaderboard">
        <tbody>
          <tr>
            <th>Top</th>
            <th>Name</th>
            <th>Mode</th>
            <th>Time</th>
          </tr>
          {scoresArray.map((score, idx) => (
            <tr key={`score-top-${idx}`}>
              <td>
                {idx === 0 && "🥇 "}
                {idx === 1 && "🥈 "}
                {idx === 2 && "🥉 "}
                {idx + 1}
                {idx === 0 && " 🥇"}
                {idx === 1 && " 🥈"}
                {idx === 2 && " 🥉"}
              </td>
              <td>{score.winnerName}</td>
              <td className={score.design}>{score.design}</td>
              <td>{processTime(score.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!scoresArray.length && (
        <>
          <span className="no-scores">There are no records of somebody winning the game yet!</span>
          <span className="no-scores">What are you waiting for?</span>
          <span className="no-scores">Go play!</span>
        </>
      )}

      <button id="back-button" onClick={goBack}>
        Go back
      </button>
    </div>
  );
};
