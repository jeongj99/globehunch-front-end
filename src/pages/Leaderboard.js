import { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import "./Leaderboard.css";

import AuthContext from "../context/AuthProvider";

import Leaderboard_Video_Pexels from "./leaderboard.mp4";

export default function Leaderboard(props) {
  const [leaderboardState, setLeaderboardState] = useState([]);
  const { loggedInUser } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const leaderboardResult = await axios.get("api/users/scores");
      setLeaderboardState(leaderboardResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //this function returns object of each element of state array as a line of html 
  const scoreElements = leaderboardState.map((user, index) => {
    return (
      <li className="leader" key={index}>
        <div>{index + 1}</div>
        <div>
          {(user.user_id === loggedInUser.id && (<span className="flag">🏁&nbsp;</span>))}
          {user.user_name}
          {(user.user_id === loggedInUser.id && (<span className="flag">🏁&nbsp;</span>))}
        </div>
        <div>{user.highest_game_score}</div>
      </li>);
  });

  return (
    <div>
      <ul className="leaderList">
        <li className="leader header" >
          <div>Rank</div>
          <div>User</div>
          <div>Best Score</div>
        </li>
        {scoreElements}
      </ul>
      <video className="leaderboardBackground" src={Leaderboard_Video_Pexels} autoPlay loop muted />
    </div>
  );
}