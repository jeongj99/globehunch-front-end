import "./NullPositionError.css";

export default function NullPositionError({ gameState }) {

  return (
    gameState.errorMessageStatus && (
      <div className={`null-position-popup-container ${gameState.errorMessageStatus ? "visible" : ""}`}>
        <h2 className="null-position-popup-title">Warning ⚠️</h2>
        <span className="null-position-popup-description">Please select a location on the right side map, then click answer.</span>
      </div>
    )
  );
}