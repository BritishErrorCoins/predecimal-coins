// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1>Predecimal Coins</h1>
      <nav>
        <Link to="/">Browse</Link>
        <Link to="/collection">My Collection</Link>
        <Link to="/wantlist">Wantlist</Link>
        <Link to="/sold">Sold</Link>
      </nav>
    </header>
  );
}

export default Header;
