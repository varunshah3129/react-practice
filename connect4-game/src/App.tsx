import { useState } from 'react';
import type { GameState, Player } from './types/game';
import { ROWS, COLS } from './types/game';
import { Board } from './components/Board';
import { ResetButton } from './components/ResetButton';
import './App.css';
import { GameResult } from './components/GameResult';

// Initialize empty board
const createEmptyBoard = (): Player[][] => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
};

// Initialize game state
const initialGameState: GameState = {
  board: createEmptyBoard(),
  currentPlayer: 'red', // Red starts first
  status: 'playing',
  winner: null,
};

const isBoardFull = (board: Player[][]): boolean => {
  return board[0].every(cell => cell !== null);
}

const checkWinner = (board: Player[][], row: number, col: number): Player => {
  const player = board[row][col];
  if (!player) return null;

  const directions = [
    [[0, 1], [0, -1]],   // Horizontal: right [0,1] and left [0,-1]
    [[1, 0], [-1, 0]],   // Vertical: down [1,0] and up [-1,0]
    [[1, 1], [-1, -1]],  // Diagonal \: down-right [1,1] and up-left [-1,-1]
    [[1, -1], [-1, 1]],  // Diagonal /: down-left [1,-1] and up-right [-1,1]
  ];

  for (const [forward, backward] of directions) {
    let count = 1;  // Start with 1 (the current disc that was just placed)

    // Count discs in forward direction
    let r = row + forward[0];  // Start from next cell in forward direction
    let c = col + forward[1];
    // Keep checking while we're within bounds and cell matches current player
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;                    // Found matching disc, increment count
      r += forward[0];            // Move to next cell in forward direction
      c += forward[1];
    }

    // Count discs in backward direction
    r = row + backward[0];       // Start from next cell in backward direction
    c = col + backward[1];
    // Keep checking while we're within bounds and cell matches current player
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;                    // Found matching disc, increment count
      r += backward[0];           // Move to next cell in backward direction
      c += backward[1];
    }

    // If we found 4 or more in a row, this player wins
    if (count >= 4) {
      return player;  // Return the winning player
    }
  }
  return null; 
}

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Handle cell click - TODO: Implement drop logic
  const handleCellClick = (row: number, col: number) => {
    
    if (gameState.status !== 'playing') {
      return;
    }
    const newBoard = gameState.board.map(row => [...row]);

    let targetRow = -1;

    for(let r = ROWS - 1; r >= 0; r--) {
      if(newBoard[r][col] === null) {
        targetRow = r;
        break;
      }
    }

    if (targetRow === -1) return;

    newBoard[targetRow][col] = gameState.currentPlayer;

    const winner = checkWinner(newBoard, targetRow, col);

    const isDraw = !winner && isBoardFull(newBoard);

    setGameState({
      board: newBoard,
      currentPlayer: winner ? gameState.currentPlayer : (gameState.currentPlayer === 'red' ? 'yellow' : 'red'),
      status: winner ? 'won' : (isDraw ? 'draw' : 'playing'),            // Update status based on game state
      winner: winner,  
    })
    

  };
  // Reset game to initial state
  const handleReset = () => {
    setGameState(initialGameState);
  };

  return (
    <div className="app">
      <h1>Connect 4</h1>
      <GameResult 
        currentPlayer={gameState.currentPlayer}
        status={gameState.status}
        winner={gameState.winner}
      />
      <Board 
        board={gameState.board}
        onCellClick={handleCellClick}
      />
      <ResetButton onReset={handleReset} />
    </div>
  );
}

export default App;
