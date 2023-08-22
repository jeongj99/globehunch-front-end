import { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function useGameData(userID) {
  const [gameState, setGameState] = useState(null);
  // const [popupMessage, setPopupMessage] = useState(null);
  // const [popupMessageClass, setPopupMessageClass] = useState(null);
  // const [position, setPosition] = useState(null); //Lifted position state into game component so that it can be passed to answer map, as well as answer button to prevent answer button switching turn if no position set.
  // const [errorState, setErrorState] = useState(null); //Error state to handle conditional rendering of error message if user did not select location (position null)
  // const [summary, setSummary] = useState(null);
  // const [score, setScore] = useState(0); //Score state which will be dynamically adjusted per turn and shown in game status component
  // const [gameNumber, setGameNumber] = useState(1);

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
          const updatedTurn = gameState.currentTurn + 1;
          const cumulativeScore = gameState.totalScore + gameState.turns[gameState.currentTurn - 1].score;
          setGameState(prev => ({ ...prev, currentTurn: updatedTurn, totalScore: cumulativeScore }));
        }, 5000);

        console.log(result);
      } catch (error) {
      }

      //         .then(response => {
      //         showResult(`You are ${response.data.distanceKm}km away.`, `You are ${response.data.distanceKm}km away.\n Your score is ${response.data.turnScore}.`);

      //         //remember turn result in the state to use in the gameSummary
      //         turn.score = response.data.score;
      //         turn.distanceKm = response.data.distanceKm;


      //         if (turn === game.turns[0]) {
      //           setTurn(game.turns[1]);
      //           calculateScore();

      //         }
      //         if (turn === game.turns[1]) {
      //           setTurn(game.turns[2]);
      //           calculateScore();

      //         } if (turn === game.turns[2]) {
      //           calculateScore();
      //         }
      //       });
    }
  };

  // // used by  summary to reset all states to initial values.
  // function playAgain() {
  //   setGame(null);
  //   setTurn(null);
  //   setPopupMessage(null);
  //   setPopupMessageClass(null);
  //   setPosition(null);
  //   setErrorState(null);
  //   setSummary(null);
  //   setScore(0);
  //   setGameNumber(gameNumber + 1);
  // }

  // // showing congrats popup with score
  // function showResult(messageKm, messageKmScore) {
  //   setPopupMessageClass("hiddenMessage"); // adding class attribute to make message invisible while on the screen 
  //   setPopupMessage(messageKm);
  //   setTimeout(() => {
  //     setPopupMessageClass("visibleMessage"); // adding class attribute to make it visible 
  //     setPopupMessage(messageKm);
  //   }, 1200);

  //   setTimeout(() => {
  //     setPopupMessage(messageKmScore);
  //   }, 3000);

  //   setTimeout(() => {
  //     setPopupMessage(null);
  //     // check the last round to show the gameSummary component
  //     if (turn === game.turns[2]) {
  //       setSummary(game);
  //     }

  //   }, 5000); // remove popup from the screen
  // }

  // function showError() {
  //   setErrorState("Error");
  //   setTimeout(() => {
  //     setErrorState(null);
  //   }, 3100);
  // }

  // //Function to allow for score to accumulate by making score state equal to previous score plus current score
  // function calculateScore() {
  //   setTimeout(() => {
  //     setScore(score + turn.score);
  //   }, 5000); //Calculate cumulative score after 5 seconds (length of time it takes for pop up to disappear)
  // }

  return {
    gameState,
    setGameState,
    nextTurn
    // game,
    // turn,
    // popupMessage,
    // popupMessageClass,
    // position, setPosition,
    // errorState,
    // summary,
    // score,
    // playAgain,
    // nextTurn
  };
};
