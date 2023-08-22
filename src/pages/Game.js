import AnswerMap from '../components/AnswerMap';
import QuestionMap from '../components/QuestionMap';
import GameStatus from '../components/GameStatus';
import Button from '../components/Button';
import Popup from '../components/Popup';
import NullPositionError from '../components/NullPositionError';
import GameSummary from '../components/GameSummary';
import useGameData from '../hooks/gameData';

export default function Game(props) {
  const {
    gameState,
    setGameState,
    nextTurn
  } = useGameData(props.userID);

  return (
    <main>
      {gameState && (
        <>
          <GameStatus turnNumber={gameState.currentTurn} turnScore={gameState.totalScore} />
          <QuestionMap gameState={gameState} />
          <AnswerMap gameState={gameState} setGameState={setGameState} />
          <Button onClick={nextTurn} className="button-game-answer" />
          <Popup gameState={gameState} />
          {/* {errorState && (<NullPositionError />)} */}

          {/* {summary && (<GameSummary game={game} playAgain={playAgain} />)} */}
        </>
      )}
    </main>
  );
};