import "./Instructions.scss";

interface IInstructionProps {
  setScreen: (screen: string) => void;
}

export const Instructions = ({ setScreen }: IInstructionProps) => {
  const goBack = () => setScreen("menu");

  return (
    <div id="instructionsScreen">
      <button id="back-button" onClick={goBack}>
        Go back
      </button>
    </div>
  );
};
