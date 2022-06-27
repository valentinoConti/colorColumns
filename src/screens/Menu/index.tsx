import "./Menu.scss";

interface IMenuProps {
  setScreen: (screen: string) => void;
}

export const Menu = ({ setScreen }: IMenuProps) => {
  const playPressed = () => setScreen("play");
  const instructionsPressed = () => setScreen("instructions");
  const settingsPressed = () => setScreen("settings");

  return (
    <div id="menuScreen">
      <h1>Color Columns</h1>

      <button className="menuButton" onClick={playPressed}>
        Play
      </button>

      <button className="menuButton" onClick={settingsPressed}>
        Settings
      </button>

      <button className="menuButton" onClick={instructionsPressed}>
        How to play
      </button>

      <footer>Valentino Conti</footer>
    </div>
  );
};
