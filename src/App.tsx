import { useState } from "react";
import { Menu } from "./screens/Menu";
import { Instructions } from "./screens/Instructions";
import { Play } from "./screens/Play";
import "./App.scss";

export const App = () => {
  const [screen, setScreen] = useState("menu");

  return (
    <div id="app-container">
      {screen === "menu" && <Menu setScreen={setScreen} />}
      {screen === "instructions" && <Instructions setScreen={setScreen} />}
      {screen === "play" && <Play setScreen={setScreen} />}
    </div>
  );
};
