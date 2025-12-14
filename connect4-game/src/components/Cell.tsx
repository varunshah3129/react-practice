import type { CellValue } from "../types/game";
import './Cell.css';

interface CellProps {
  value: CellValue;
  row: number;
  col: number;
  onClick: () => void;
}

 export const Cell = ({ value, row, col, onClick }: CellProps) => {

  return (
    <div className={`cell ${value ? `cell-${value}` : ''}`} onClick={onClick}>
      {value && <div className={`disc disc-${value}`}></div>}
    </div>
  )

 }