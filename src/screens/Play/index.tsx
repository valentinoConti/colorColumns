import { Fragment, useEffect, useState } from "react";
import "./Play.scss";

type Position = number[];
type Positions = Position[];
type Color = "red" | "green" | "blue" | "purple" | "yellow" | "white" | "gray";

interface IPlayProps {
  setScreen: (screen: string) => void;
}

export const Play = ({ setScreen }: IPlayProps) => {
  const [playMap, setPlayMap] = useState(colourMap());
  const [moving, setMoving] = useState<Position>();
  const [possibleMovements, setPossibleMovements] = useState<Positions>();

  const handleTileClick = (X: number, Y: number) => {
    // If pressed a bottom tile or a white tile, do nothing.
    if (Y + 1 === playMap[X].length || playMap[X][Y] === "white") return;

    // Check if it is the highest on its column, if its not, do nothing
    const higherTileIndex = playMap[X].findIndex((tile) => tile !== "white");
    if (higherTileIndex !== Y) return;

    // Register possible movements
    const movements: Positions = [];
    if (playMap[X + 1]?.[Y] === "white") {
      movements.push([X + 1, Y]);
    }
    if (playMap[X - 1]?.[Y] === "white") {
      movements.push([X - 1, Y]);
    }
    if (playMap[X][Y + 1] === "white") {
      movements.push([X, Y + 1]);
    }
    if (playMap[X][Y - 1] === "white") {
      movements.push([X, Y - 1]);
    }

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
  };

  return (
    <div id="playScreen">
      <h1>Color Columns</h1>
      <div id="game-map-container">
        {playMap.map((column, X) => (
          <div className="column" key={`column-${X}`}>
            {column.map((tile, Y) => {
              const isColouredTile = tile !== "white" && tile !== "gray";
              const isMovementPossible =
                possibleMovements && possibleMovements.some(([posX, posY]) => posX === X && posY === Y);

              const handleTile = () => !isMovementPossible && handleTileClick(X, Y);
              const handleTileOverlap = () => isMovementPossible && handleMove(X, Y);

              return (
                <div
                  key={`tile-${X}-${Y}`}
                  className="tile"
                  onMouseDown={handleTile}
                  style={{
                    backgroundColor: tile,
                    cursor: isColouredTile || isMovementPossible ? "pointer" : "default",
                  }}
                >
                  <div
                    className="tile-overlap"
                    onClick={handleTileOverlap}
                    onMouseUp={handleTileOverlap}
                    style={{
                      opacity: isMovementPossible ? 0.5 : 0,
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

const colourMap = (): Color[][] => [
  ["blue", "blue", "green", "red", "purple"],
  ["red", "purple", "yellow", "blue", "blue"],
  ["purple", "yellow", "purple", "purple", "yellow"],
  ["yellow", "green", "blue", "yellow", "green"],
  ["green", "red", "red", "green", "red"],
  ["white", "white", "white", "white", "gray"],
  ["white", "white", "white", "white", "gray"],
];
