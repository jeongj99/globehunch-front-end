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
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={auth ? <Navigate to="/" /> : <Register />} />
          <Route path="/leaderboard" element={auth ? <Leaderboard /> : <Navigate to="/login" />} />
          <Route path="/game" element={auth ? <Game /> : <Navigate to="/login" />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;