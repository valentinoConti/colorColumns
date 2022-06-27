import { IConfig } from "../../utils";
import { CheckBox } from "./CheckBox";
import { autoClickOff, autoClickOn } from "../../../assets";
import "./Settings.scss";

interface ISettingsProps {
  setScreen: (screen: string) => void;
  config: IConfig;
  setConfig: React.Dispatch<React.SetStateAction<IConfig | undefined>>;
}

export const Settings = ({ setScreen, config, setConfig }: ISettingsProps) => {
  const goBack = () => setScreen("menu");

  return (
    <div id="settingsScreen">
      <h1>⚙️ Settings ⚙️</h1>

      <div className="setting-item">
        <span className="setting-item-title">Game map</span>

        <div className="setting-item-options">
          <div className="option">
            <span>Original</span>
            <CheckBox on={config.map === "original"} onClick={() => setConfig({ ...config, map: "original" })} />
          </div>
          <div className="option">
            <span>Random</span>
            <CheckBox on={config.map === "random"} onClick={() => setConfig({ ...config, map: "random" })} />
          </div>
        </div>

        <span className="setting-item-details">
          You can choose to play with the original game map or get a different random map generated on every game
        </span>
      </div>

      <div className="setting-item">
        <span className="setting-item-title">Game design</span>

        <div className="setting-item-options">
          <div className="option">
            <span>Original</span>
            <CheckBox on={config.design === "original"} onClick={() => setConfig({ ...config, design: "original" })} />
          </div>
          <div className="option">
            <span>Crazy</span>
            <CheckBox on={config.design === "crazy"} onClick={() => setConfig({ ...config, design: "crazy" })} />
          </div>
        </div>

        <span className="setting-item-details">
          Two different designs for the game. The crazy one can be more confusing 🤪
        </span>
      </div>

      <div className="setting-item">
        <span className="setting-item-title">Auto click</span>

        <div className="setting-item-options">
          <div className="option">
            <span>OFF</span>
            <CheckBox on={!config.autoClick} onClick={() => setConfig({ ...config, autoClick: false })} />
          </div>
          <div className="option">
            <span>ON</span>
            <CheckBox on={config.autoClick} onClick={() => setConfig({ ...config, autoClick: true })} />
          </div>
        </div>

        <div className="setting-item-details">
          <span id="tip">Square gets selected again after being moved</span>
          <img src={autoClickOff} className="gif" />
          <img src={autoClickOn} className="gif" />
        </div>
      </div>

      <button id="back-button" onClick={goBack}>
        Go back
      </button>
    </div>
  );
};
