import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AuthContext from "./context/AuthProvider";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./pages/Leaderboard";
import Game from './pages/Game';
import React from 'react';
import Tutorial from "./pages/Tutorial";

import './App.css';

function App() {
  const { auth, loggedInUser } = useContext(AuthContext);
  // const [user, setUser] = useState(localStorage.getItem('user'));
  // const [userID, setUserID] = useState(localStorage.getItem('userID'));

  // axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios.post("/api/authenticate", {}).then(response => {
  //     if (!response.data.error) {
  //       localStorage.setItem('user', response.data.user.user_name);
  //       localStorage.setItem('userID', response.data.user.id);
  //       setUser(response.data.user.user_name);
  //       setUserID(response.data.user.id);
  //     } else {
  //       localStorage.removeItem('user');
  //       localStorage.removeItem('userID');
  //     }
  //   });
  // });

  return (
    <>
      <Navbar loggedInUser={user} setUser={setUser} setUserID={setUserID} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={auth ? <Navigate to="/" /> : <Login setUser={setUser} setUserID={setUserID} />} />
          <Route path="/register" element={auth ? <Navigate to="/" /> : <Register setUser={setUser} setUserID={setUserID} />} />
          <Route path="/leaderboard" element={auth ? <Leaderboard userID={userID} /> : <Navigate to="/login" />} />
          <Route path="/game" element={auth ? <Game userID={userID} /> : <Navigate to="/login" />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;