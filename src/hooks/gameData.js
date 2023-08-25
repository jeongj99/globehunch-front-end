import { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function useGameData(userID) {
  const [gameState, setGameState] = useState(null);

  const fetchGameData = async () => {
    try {
      const gameResult = await axios.post('api/games', {});
      setGameState(gameResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  //Create a function that increments through array of turn objects and sets state to new turn object each time answer button is clicked
  const nextTurn = async () => {
    if (gameState.turns[gameState.currentTurn - 1].answerPosition) {
      try {
        const result = await axios.put(`api/calculate/${gameState.turns[gameState.currentTurn - 1].id}`, {
          questionLat: gameState.turns[gameState.currentTurn - 1].latitude,
          questionLon: gameState.turns[gameState.currentTurn - 1].longitude,
          answerLat: gameState.turns[gameState.currentTurn - 1].answerPosition.lat,
          answerLon: gameState.turns[gameState.currentTurn - 1].answerPosition.lng
        });

        const updatedTurns = [...gameState.turns];
        updatedTurns[gameState.currentTurn - 1].distance = result.data.distanceKm;
        updatedTurns[gameState.currentTurn - 1].score = result.data.turnScore;
        setGameState(prev => ({ ...prev, turns: updatedTurns, popupMessageStatus: true }));

        setTimeout(() => {
          setGameState(prev => ({ ...prev, popupMessageStatus: false }));
        }, 4900);

        setTimeout(() => {
          if (gameState.currentTurn < 3) {
            const updatedTurn = gameState.currentTurn + 1;
            const cumulativeScore = gameState.totalScore + gameState.turns[gameState.currentTurn - 1].score;
            setGameState(prev => ({ ...prev, currentTurn: updatedTurn, totalScore: cumulativeScore }));
          } else {
            const cumulativeScore = gameState.totalScore + gameState.turns[gameState.currentTurn - 1].score;
            setGameState(prev => ({ ...prev, totalScore: cumulativeScore, finishedGame: true }));
          }
        }, 5000);

        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      setGameState(prev => ({ ...prev, errorMessageStatus: true }));

      setTimeout(() => {
        setGameState(prev => ({ ...prev, errorMessageStatus: false }));
      }, 2000);
    }
  };

  const playAgain = () => {
    fetchGameData();
  };

  return {
    gameState,
    setGameState,
    nextTurn,
    playAgain
  };
};