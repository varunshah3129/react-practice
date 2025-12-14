import type { CellValue } from "../types/game";
import { Cell } from "./Cell";
import './Board.css';

interface BoardProps {
  board: CellValue[][];
  onCellClick: (row: number, col: number) => void;

}

export const Board = ({ board, onCellClick }: BoardProps) => {

  return(
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell 
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              col={colIndex}
              row={rowIndex}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}