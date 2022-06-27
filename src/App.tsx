import { useEffect, useRef, useState } from "react";
import { Menu } from "./screens/Menu";
import { Instructions } from "./screens/Instructions";
import { Settings } from "./screens/Settings";
import { Play } from "./screens/Play";
import { LeaderBoard } from "./screens/LeaderBoard";
import { IConfig } from "./utils";
import "./App.scss";

const initialConfig: IConfig = {
  map: "original",
  design: "original",
  autoClick: false,
};

export const App = () => {
  const [screen, setScreen] = useState("menu");
  const [gameId, setGameId] = useState(1);
  const [config, setConfig] = useState<IConfig>();

  const appRef = useRef<HTMLDivElement>(null);
  const scaleGame = () => {
    if (appRef.current) {
      const appSize = appRef.current.clientWidth;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const hDiff = windowWidth / appSize;
      const vDiff = windowHeight / appSize;

      appRef.current.style.transform = `scale(${hDiff < vDiff ? hDiff : vDiff})`;
    }
  };

  useEffect(() => {
    const currentStorageConfig = localStorage.getItem("color-columns-config");
    if (currentStorageConfig) {
      setConfig(JSON.parse(currentStorageConfig));
    } else {
      setConfig(initialConfig);
    }

    scaleGame();
    window.addEventListener("resize", scaleGame);
    return () => window.removeEventListener("resize", scaleGame);
  }, []);

  useEffect(() => {
    config && localStorage.setItem("color-columns-config", JSON.stringify(config));
  }, [config]);

  return (
    <div id="app-container" ref={appRef}>
      {screen === "menu" && <Menu setScreen={setScreen} />}
      {screen === "instructions" && <Instructions setScreen={setScreen} />}
      {screen === "settings" && config && <Settings config={config} setConfig={setConfig} setScreen={setScreen} />}
      {screen === "leaderboard" && config && <LeaderBoard setScreen={setScreen} />}
      {screen === "play" && config && (
        <Play key={`game-${gameId}`} setGameId={setGameId} config={config} setScreen={setScreen} />
      )}
    </div>
  );
};
