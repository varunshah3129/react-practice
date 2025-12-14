import './ResetButton.css';

interface ResetButtonProps {
  onReset: () => void;
}

export const ResetButton = ({ onReset }: ResetButtonProps) => {
  return (
    <button className="reset-button" onClick={onReset}>
      Reset game
    </button>
  );
};

