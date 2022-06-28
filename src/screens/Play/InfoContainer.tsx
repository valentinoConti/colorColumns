import { useEffect, useState } from "react";
import { ILeaderBoard } from "../../utils";

interface IInfoContainerProps {
  win: boolean;
  lose: boolean;
  time: number;
  design: "crazy" | "original";
}

export const InfoContainer = ({ win, lose, time, design }: IInfoContainerProps) => {
  const [shouldShowContainer, setShouldShowContainer] = useState(false);
  const [shouldShowInformation, setShouldShowInformation] = useState(false);

  const [scoreSent, setScoreSent] = useState(false);
  const [winnerName, setWinnerName] = useState("");

  const handleSubmitWinner = () => {
    const item = { winnerName, time, design };
    const currentTopTen = localStorage.getItem("color-columns-top-ten");

    if (currentTopTen) {
      const topTen: ILeaderBoard[] = JSON.parse(currentTopTen);
      const index = topTen.findIndex((record) => record.time > time);

      if (index < 0) {
        // worst score. if there are already 10 elements it doesnt go to leaderboard, else it does.
        topTen.length !== 10 && topTen.push(item);
      } else {
        topTen.splice(index, 0, item);
        topTen.length > 10 && topTen.pop();
      }

      localStorage.setItem("color-columns-top-ten", JSON.stringify(topTen));
    } else {
      localStorage.setItem("color-columns-top-ten", JSON.stringify([item]));
    }

    setScoreSent(true);
  };

  useEffect(() => {
    if (win || lose) {
      setShouldShowContainer(true);
      setTimeout(() => setShouldShowInformation(true), 350);
    }
  }, [win, lose]);

  return (
    <div
      id="info-container"
      style={{
        background: design === "original" ? "white" : "linear-gradient(135deg, black, blue, purple, red, gold, green)",
        left: shouldShowContainer ? 100 : 390,
        right: shouldShowContainer ? 100 : 390,
        visibility: shouldShowContainer ? "visible" : "hidden",
      }}
    >
      <div id="info" data-testid="win-info" style={{ opacity: shouldShowInformation ? 1 : 0 }}>
        {lose ? (
          <>
            <span>💀 YOU LOSE 💀</span>
            <span>Nice try!</span>
          </>
        ) : (
          <>
            <span>YOU WIN!</span>
            {scoreSent ? (
              <div>
                <span>Thank you! 😉✅</span>
              </div>
            ) : (
              <div>
                <span>Put your name:</span>
                <input
                  type="text"
                  data-testid="winner-name-input"
                  id="name"
                  value={winnerName}
                  onChange={(ev) => setWinnerName(ev.target.value.substring(0, 16))}
                  onKeyDown={(ev) => ev.key === "Enter" && handleSubmitWinner()}
                />
                <button onClick={handleSubmitWinner}>✅</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
