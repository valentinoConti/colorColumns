import { useState } from "react";
import { sortedImg, unsortedImg } from "../../../assets";
import "./Instructions.scss";

const title = {
  1: "🎯 Objetive 🎯",
  2: "📖 Game rules 📖",
  3: "📖 Game 📖",
};

const subtitle = {
  1: "",
  2: "At first it can be hard, but you get used to it fast!",
  3: "GOOD LUCK! 😋",
};

const getContent = {
  1: () => (
    <>
      <span>
        The goal of the game is to sort the squares by color in columns, each column must only have squares of the same
        color to win!
      </span>
      <span id="center">Like this:</span>
      <div id="images-container">
        <img src={unsortedImg} />
        <img src={sortedImg} className="sorted" />
      </div>
    </>
  ),
  2: () => (
    <>
      <span>➡️ You can move one square at a time</span>
      <span>➡️ You can only move an square if it is at the top of its column</span>
      <span>➡️ Squares can be moved to empty cells (white ones)</span>
      <span>➡️ Last two columns are free to help you with the movements</span>
      <span>
        ➡️ Last two columns can hold squares of any color but once you add a square of a given color to any of those two
        columns, all other squares in that column must be the same color
      </span>
      <span>
        ➡️ Squares at the bottom row are fixed (you can't move them) and indicate the target color for each column
      </span>
      <span>
        ➡️ Gray squares are fixed and mean nothing, they are there just to limit the free cells that you have available
      </span>
    </>
  ),
  3: () => (
    <>
      <span>
        ➡️ You play only with the mouse pressing the square you want to move and then the position you want it to go
      </span>
      <span>➡️ When selecting a square you will see a highlight of possible places for that square to go</span>
      <span>➡️ Dont forget to setup your preferences on the settings menu</span>
      <span>➡️ You have 8 minutes to finish the game, if not, you lose 💀</span>
    </>
  ),
};

interface IInstructionsProps {
  setScreen: (screen: string) => void;
}

export const Instructions = ({ setScreen }: IInstructionsProps) => {
  const [page, setPage] = useState(1);

  const goNext = () => setPage(page + 1);
  const goBack = () => (page === 1 ? setScreen("menu") : setPage(page - 1));

  return (
    <div id="instructionsScreen">
      <h1>{title[page]}</h1>
      <div id="box">{getContent[page]()}</div>

      <h1>{subtitle[page]}</h1>

      {page < 3 && (
        <button id="next-button" onClick={goNext}>
          Next
        </button>
      )}

      <button id="back-button" onClick={goBack}>
        Go back
      </button>
    </div>
  );
};
