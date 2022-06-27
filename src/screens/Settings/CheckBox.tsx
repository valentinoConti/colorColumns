interface ICheckBoxProps {
  on: boolean;
  onClick: () => void;
}

export const CheckBox = ({ on, onClick }: ICheckBoxProps) => {
  return (
    <div onClick={onClick} className="checkbox">
      {on && <div className="check">✓</div>}
    </div>
  );
};
