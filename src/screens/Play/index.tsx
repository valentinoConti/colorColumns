import { useState } from "react";
import { InfoContainer } from "./InfoContainer";
import { Timer } from "./Timer";
import { getColourMap, getRandomMap, IConfig, getWinningMap } from "../../utils";
import "./Play.scss";

type Position = number[];
type Positions = Position[];
const playableColors = ["red", "green", "blue", "yellow", "purple"];

interface IPlayProps {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  setGameId: React.Dispatch<React.SetStateAction<number>>;
  config: IConfig;
}

export const Play = ({ setScreen, setGameId, config }: IPlayProps) => {
  const [playMap, setPlayMap] = useState(config.map === "original" ? getColourMap() : getRandomMap());
  const [winningMap] = useState(getWinningMap(playMap));
  const [moving, setMoving] = useState<Position>();
  const [possibleMovements, setPossibleMovements] = useState<Positions>();
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  const checkWin = (stringMap) => stringMap === winningMap && setWin(true);

  const handleTileClick = (X: number, Y: number) => {
    // If pressed a bottom tile or a white tile, do nothing.
    if (Y + 1 === playMap[X].length || playMap[X][Y] === "white") return;

    // Check if it is the highest on its column, if its not, do nothing
    const higherTileIndex = playMap[X].findIndex((tile) => tile !== "white");
    if (higherTileIndex !== Y) return;

    // Register possible movements
    const movements: Positions = [];
    // Can go right?
    if (playMap[X + 1]?.[Y] === "white") {
      if (X + 1 < 5) {
        movements.push([X + 1, Y]);
      } else {
        const allColorsButThis = playableColors.filter((color) => color !== playMap[X][Y]);
        if (!playMap[X + 1].some((color) => allColorsButThis.includes(color))) {
          movements.push([X + 1, Y]);
        }
      }
    }
    // Can go left?
    if (playMap[X - 1]?.[Y] === "white") {
      if (X - 1 < 5) {
        movements.push([X - 1, Y]);
      } else {
        const allColorsButThis = playableColors.filter((color) => color !== playMap[X][Y]);
        if (!playMap[X - 1].some((color) => allColorsButThis.includes(color))) {
          movements.push([X - 1, Y]);
        }
      }
    }
    // Can go down? and up?
    if (playMap[X][Y + 1] === "white") movements.push([X, Y + 1]);
    if (playMap[X][Y - 1] === "white") movements.push([X, Y - 1]);

    if (movements.length) {
      setMoving([X, Y]);
      setPossibleMovements(movements);
    }
  };

  const handleMove = (X: number, Y: number) => {
    const newPlayMap = playMap;

    newPlayMap[X][Y] = playMap[moving![0]][moving![1]];
    newPlayMap[moving![0]][moving![1]] = "white";

    setMoving(undefined);
    setPossibleMovements(undefined);
    setPlayMap(newPlayMap);
    checkWin(JSON.stringify(newPlayMap));
  };

  return (
    <div id="playScreen" className={`${config.design === "original" ? "" : "crazy"}`}>
      <h1>Color Columns</h1>
      <button className="action-button" onClick={() => setScreen("menu")}>
        Go back
      </button>
      <button className="action-button" onClick={() => setGameId((gameId) => gameId + 1)}>
        Restart
      </button>
      <Timer win={win} lose={lose} setLose={setLose} />
      <InfoContainer design={config.design} win={win} lose={lose} />

      <div id="game-map-container">
        {playMap.map((column, X) => (
          <div className="column" key={`column-${X}`}>
            {column.map((tile, Y) => {
              const isColouredTile = playableColors.includes(tile);
              const isMovementPossible =
                possibleMovements && possibleMovements.some(([posX, posY]) => posX === X && posY === Y);

              const handleTile = () => !(win || lose) && handleTileClick(X, Y);
              const handleTileOverlap = () => !(win || lose) && isMovementPossible && handleMove(X, Y);

              const overlapEvent: React.DOMAttributes<HTMLDivElement> = config.autoClick
                ? { onMouseDown: handleTileOverlap }
                : { onClick: handleTileOverlap };

              return (
                <div
                  key={`tile-${X}-${Y}`}
                  className="tile"
                  onMouseDown={handleTile}
                  style={{
                    cursor: isColouredTile || isMovementPossible ? "pointer" : "default",
                    background:
                      config.design === "original"
                        ? tile
                        : `radial-gradient(${tile}, ${tile === "white" ? "white" : "black"}, transparent)`,
                  }}
                >
                  <div
                    className="tile-overlap"
                    {...overlapEvent}
                    onMouseUp={handleTileOverlap}
                    style={{
                      opacity: isMovementPossible ? (config.design === "original" ? 0.3 : 0.5) : 0,
                      backgroundColor: moving && playMap[moving[0]][moving[1]],
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
