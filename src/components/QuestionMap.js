import { useState } from "react";
import BingMapsReact from "bingmaps-react";

import "./QuestionMap.css";

//This component houses the Bing Map, which show the player a random place on earth in which they will have to guess where they are.
export default function QuestionMap({ gameState }) {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapReady = () => {
    setTimeout(() => {
      setMapLoaded(true);
    }, 400);
  };

  return (
    <div className={`map-container ${mapLoaded ? "visible" : ""}`}>
      <BingMapsReact
        onMapReady={handleMapReady}
        bingMapsKey={process.env.REACT_APP_API_KEY}
        height="100vh"
        mapOptions={{
          navigationBarMode: "square",
        }}
        width="100vh"
        key={`${gameState.turns[gameState.currentTurn - 1].latitude}-${gameState.turns[gameState.currentTurn - 1].longitude}`}
        viewOptions={{
          center: {
            latitude: gameState.turns[gameState.currentTurn - 1].latitude,
            longitude: gameState.turns[gameState.currentTurn - 1].longitude,
          },
          mapTypeId: "streetside",
          streetsideOptions: {
            showExitButton: false,
            showCurrentAddress: false,
            overviewMapMode: 2,
          },
        }}
      />
    </div>
  );
}