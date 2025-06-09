// src/components/Header.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.gif';
import '../styles/theme.css';


const Header = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="app-logo" />
        <h1 className="app-title">Predecimal Coin Collector</h1>
      </div>
      <nav className="nav-bar">
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/collection">My Collection</NavLink>
        <NavLink to="/wantlist">My Wantlist</NavLink>
        <NavLink to="/sold">Sold</NavLink>
        <a
          href="https://ko-fi.com"
          className="kofi-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate
        </a>
      </nav>
    </header>
  );
};

export default Header;
// test
