import { Marker, useMapEvents } from 'react-leaflet';

//This component will set a marker on the map wherever the user clicks
export default function LocationMarker({ gameState, setGameState }) {

  const map = useMapEvents({
    //Once user click event happens, set position to the lat and long of where they clicked on map
    click(event) {
      const updatedTurns = [...gameState.turns];
      updatedTurns[gameState.currentTurn - 1].answerPosition = event.latlng;
      setGameState(prev => ({ ...prev, turns: updatedTurns }));
      map.flyTo(event.latlng);
    }
  });
  //If position has been set by user, return marker component which will mark the map
  return gameState.turns[gameState.currentTurn - 1].answerPosition === null ? null : (
    <Marker position={gameState.turns[gameState.currentTurn - 1].answerPosition}>
    </Marker>
  );
}
