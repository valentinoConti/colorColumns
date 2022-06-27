import { useEffect, useState } from "react";
import { Menu } from "./screens/Menu";
import { Instructions } from "./screens/Instructions";
import { Settings } from "./screens/Settings";
import { Play } from "./screens/Play";
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

  useEffect(() => {
    const currentStorageConfig = localStorage.getItem("color-columns-config");
    if (currentStorageConfig) {
      setConfig(JSON.parse(currentStorageConfig));
    } else {
      setConfig(initialConfig);
    }
  }, []);

  useEffect(() => {
    config && localStorage.setItem("color-columns-config", JSON.stringify(config));
  }, [config]);

  return (
    <div id="app-container">
      {screen === "menu" && <Menu setScreen={setScreen} />}
      {screen === "instructions" && <Instructions setScreen={setScreen} />}
      {screen === "settings" && config && <Settings config={config} setConfig={setConfig} setScreen={setScreen} />}
      {screen === "play" && config && (
        <Play key={`game-${gameId}`} setGameId={setGameId} config={config} setScreen={setScreen} />
      )}
    </div>
  );
};
