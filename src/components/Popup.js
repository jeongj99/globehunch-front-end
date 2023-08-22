import "./Popup.css";

import Background_Video_Pexels from './fireworks.mp4';

export default function Popup({ gameState }) {

  return (
    gameState.popupMessageStatus && (
      <div className={`popupContainer ${gameState.popupMessageStatus ? "visible" : ""}`}>
        <span className="visibleMessage">{`You are ${gameState.turns[gameState.currentTurn - 1].distance}km away.\n Your score is ${gameState.turns[gameState.currentTurn - 1].score}.`}</span>
        <video className="popupBackground" src={Background_Video_Pexels} autoPlay loop muted />
      </div>
    )
  );
}


