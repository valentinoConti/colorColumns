import { useEffect, useRef, useState } from "react";
import { playerHappy, playerMidHappy, playerWorried, playerSad, playerDead } from "../../../assets";
interface ITimerProps {
  setLose: (bool: boolean) => void;
  win: boolean;
  lose: boolean;
}

export const Timer = ({ setLose, win, lose }: ITimerProps) => {
  const [time, setTime] = useState(0);
  const [color, setColor] = useState("lime");
  const [faceSrc, setFaceSrc] = useState(playerHappy);

  const timeInterval = useRef<number>();

  const processTime = (totalSeconds: number) => {
    const minutes = Math.trunc(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;

    return minutes < 8 ? `${minutes}:${seconds > 9 ? seconds : "0" + seconds}` : "💀💀";
  };

  useEffect(() => {
    if (time === 211) {
      setFaceSrc(playerMidHappy);
      setColor("yellow");
    }
    if (time === 331) {
      setFaceSrc(playerWorried);
      setColor("orange");
    }
    if (time === 391) {
      setFaceSrc(playerSad);
      setColor("red");
    }
    if (time === 480) {
      setFaceSrc(playerDead);
      setLose(true);
    }
  }, [time]);

  useEffect(() => {
    if (win || lose) clearInterval(timeInterval.current);
  }, [win, lose]);

  useEffect(() => {
    timeInterval.current = setInterval(() => setTime((time) => time + 1), 1000);
    return () => clearInterval(timeInterval.current);
  }, []);

  return (
    <div id="timer" style={{ transform: `scale(${win || lose ? 1.4 : 1})` }}>
      <img src={faceSrc} id="player-face" />
      <span style={{ color: color }}>{processTime(time)}</span>
    </div>
  );
};
