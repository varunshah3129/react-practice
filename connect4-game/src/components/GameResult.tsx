import type { GameStatus, Player } from '../types/game';
import './GameStatus.css';

interface GameStatusProps {
  currentPlayer: Player;
  status: GameStatus;
  winner: Player;
}

export const GameResult = ({ currentPlayer, status, winner }: GameStatusProps) => {
  
const getStatesMessage = () => {
  if (status === 'won' && winner) {
    return `Player ${winner === 'red' ? 'Red' : 'Yellow'} Wins!`
  }
  if (status === 'draw') return 'Its a Draw !';

  return `Current Player: ${currentPlayer === 'red' ? 'Red' : 'Yellow'}`;

}

  return (
    <div className="game-status">
      <h2 className={`status-message ${status === 'won' ? 'winner' : ''}`}>
        {getStatesMessage()}
      </h2>
    </div>
  );
};

