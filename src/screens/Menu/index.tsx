import "./Menu.scss";

interface IMenuProps {
  setScreen: (screen: string) => void;
}

export const Menu = ({ setScreen }: IMenuProps) => {
  const playPressed = () => setScreen("play");
  const instructionsPressed = () => setScreen("instructions");

  return (
    <div id="menuScreen">
      <h1>Color Columns</h1>

      <button id="playButton" className="menuButton" onClick={playPressed}>
        Play
      </button>

      <button id="instructionsButton" className="menuButton" onClick={instructionsPressed}>
        Instructions
      </button>

      <footer>Valentino Conti</footer>
    </div>
  );
};
