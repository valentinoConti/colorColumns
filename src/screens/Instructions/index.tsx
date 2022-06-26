import "./Instructions.scss";

interface IInstructionProps {
  setScreen: (screen: string) => void;
}

export const Instructions = ({ setScreen }: IInstructionProps) => {
  const goBack = () => setScreen("menu");

  return (
    <div id="instructionsScreen">
      <h1>📖 Game rules 📖</h1>
      <div id="rules">
        <span>➡️ You can move one square at a time</span>
        <span>➡️ You can only move an square if it is at the top of its column</span>
        <span>➡️ Squares can be moved to empty cells (white ones)</span>
        <span>➡️ Last two columns are free to help you with the movements</span>
        <span>
          ➡️ Last two columns can hold squares of any color but once you add a square of a given color to any of those
          two columns, all other squares in that column must be the same color
        </span>
        <span>
          ➡️ Squares at the bottom row are fixed (you can't move them) and indicate the target color for each column
        </span>
        <span>
          ➡️ Gray squares are fixed and mean nothing, they are there just to limit the free cells that you have
          available
        </span>
      </div>

      <h1>GOOD LUCK! 😋</h1>

      <button id="back-button" onClick={goBack}>
        Go back
      </button>
    </div>
  );
};
