import { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

import AuthContext from '../context/AuthProvider';

import './Navbar.css';
import { BsFillPinMapFill } from 'react-icons/bs';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

export default function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(prev => !prev);

  const closeMobileMenu = () => setClick(false);

  const { auth, setAuth, loggedInUser, setLoggedInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post('/api/logout', {});
      setAuth(response.data.auth);
      setLoggedInUser(null);
      closeMobileMenu();
      navigate('/');
    } catch ({ response }) {
      console.log(response.data.error);
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <BsFillPinMapFill className='navbar-icon' />
              GlobeHunch
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'} >
              <li className='nav-item'>
                <NavLink to='/' className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')} onClick={closeMobileMenu}>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/game' className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')} onClick={closeMobileMenu}>
                  Play
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/leaderboard' className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')} onClick={closeMobileMenu}>
                  Leaderboard
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/tutorial' className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')} onClick={closeMobileMenu}>
                  Tutorial
                </NavLink>
              </li>
              {!auth && (
                <li className='nav-item'>
                  <NavLink to='/register' className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')} onClick={closeMobileMenu}>
                    Register
                  </NavLink>
                </li>
              )}
              {!auth && (
                <li className='nav-item'>
                  <NavLink to='/login' className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')} onClick={closeMobileMenu}>
                    Log In
                  </NavLink>
                </li>
              )}
              {auth && (
                <li className='nav-item'>
                  <NavLink to='/login' className={({ isActive }) => 'nav-links' + (isActive ? ' activated' : '')} onClick={closeMobileMenu}>
                    Signed in as {loggedInUser.username}
                  </NavLink>
                </li>
              )}
              {auth && (
                <li className='nav-item'>
                  <div className='nav-links logout' onClick={logout}>
                    Log Out
                  </div>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
};