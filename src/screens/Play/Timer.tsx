import { useEffect, useRef, useState } from "react";

interface ITimerProps {
  setLose: (bool: boolean) => void;
  win: boolean;
}

export const Timer = ({ setLose, win }: ITimerProps) => {
  const [time, setTime] = useState(0);
  const [color, setColor] = useState("lime");

  const timeInterval = useRef<number>();

  const processTime = (totalSeconds: number) => {
    const minutes = Math.trunc(totalSeconds / 60);
    const seconds = totalSeconds - minutes * 60;

    return minutes < 10 ? `${minutes}:${seconds > 9 ? seconds : "0" + seconds}` : "💀💀";
  };

  useEffect(() => {
    if (time === 241) setColor("yellow");
    if (time === 361) setColor("orange");
    if (time === 481) setColor("red");
    if (time === 600) setLose(true);
  }, [time]);

  useEffect(() => {
    if (win) {
      clearInterval(timeInterval.current);
    }
  }, [win]);

  useEffect(() => {
    timeInterval.current = setInterval(() => setTime((time) => time + 1), 1000);
    return () => clearInterval(timeInterval.current);
  }, []);

  return (
    <div id="timer">
      <span style={{ color: color }}>{processTime(time)}</span>
    </div>
  );
};
