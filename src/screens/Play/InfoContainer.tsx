import { useEffect, useState } from "react";

interface IInfoContainerProps {
  win: boolean;
  lose: boolean;
  design: "crazy" | "original";
}

export const InfoContainer = ({ win, lose, design }: IInfoContainerProps) => {
  const [shouldShowContainer, setShouldShowContainer] = useState(false);
  const [shouldShowInformation, setShouldShowInformation] = useState(false);

  useEffect(() => {
    if (win || lose) {
      setShouldShowContainer(true);
      setTimeout(() => setShouldShowInformation(true), 350);
    }
  }, [win, lose]);

  return (
    <div
      id="info-container"
      style={{
        background: design === "original" ? "white" : "linear-gradient(135deg, black, blue, purple, red, gold, green)",
        left: shouldShowContainer ? 100 : 390,
        right: shouldShowContainer ? 100 : 390,
        visibility: shouldShowContainer ? "visible" : "hidden",
      }}
    >
      <div id="info" style={{ opacity: shouldShowInformation ? 1 : 0 }}>
        {lose ? (
          <>
            <span>💀 YOU LOSE 💀</span>
            <span>Nice try!</span>
          </>
        ) : (
          <>
            <span>YOU WIN</span>
          </>
        )}
      </div>
    </div>
  );
};
