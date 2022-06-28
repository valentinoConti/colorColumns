interface ICheckBoxProps {
  on: boolean;
  onClick: () => void;
  testId: string;
}

export const CheckBox = ({ on, onClick, testId }: ICheckBoxProps) => (
  <div onClick={onClick} className="checkbox" data-testid={testId}>
    {on && <div className="check">✓</div>}
  </div>
);
