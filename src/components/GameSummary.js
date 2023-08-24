import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

import "./GameSummary.css";

export default function GameSummary({ gameState, playAgain }) {

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const turnElements = gameState.turns.map((turn) => {
    return (
      <li>
        <div>Round {turn.turnNumber}</div>
        <div><span className="shine">{turn.score} </span>&nbsp; points</div>
        <div><span className="shine">{turn.distance}</span>&nbsp; km</div>
      </li>
    );
  });

  return (
    <>
      <div className="summary-container">
        <div className="title"> Game Summary</div>
        <div className="summary-results">
          <span className="subtitle">Your score is:&nbsp;<span className="shine">{gameState.totalScore}</span></span>
          <ul>
            {turnElements}
          </ul>
        </div>
        <div className="summary-button-container">
          <Button className="button-summary" title={"Play Again"} onClick={playAgain} />
          <Button className="button-summary" title={"Main Menu"} onClick={navigateToHome} />
        </div>
      </div>
    </>
  );
}