// src/components/Header.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HeaderFooter.css'; // optional shared styling

function Header() {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="header-left">
        <img src="/assets/logo.gif" alt="Logo" className="app-logo" />
        <h1 className="app-title">Predecimal Coins</h1>
      </div>
      <nav className="nav-bar">
        <Link to="/browse" className={location.pathname === '/browse' ? 'active' : ''}>Browse</Link>
        <Link to="/collection" className={location.pathname === '/collection' ? 'active' : ''}>My Collection</Link>
        <Link to="/wantlist" className={location.pathname === '/wantlist' ? 'active' : ''}>My Wantlist</Link>
        <Link to="/sold" className={location.pathname === '/sold' ? 'active' : ''}>Sold</Link>
      </nav>
      <div className="header-right">
        <a href="https://ko-fi.com/yourprofile" target="_blank" rel="noopener noreferrer" className="kofi-button">
          Support
        </a>
      </div>
    </header>
  );
}

export default Header;
