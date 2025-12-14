export const ROWS = 6;
export const COLS = 7

export type Player = 'red' | 'yellow' | null;

export type CellValue = Player;

export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: CellValue[][];
  currentPlayer: Player;
  status: GameStatus;
  winner: Player;
}