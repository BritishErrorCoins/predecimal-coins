import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>✅ Predecimal Coins App</h1>
      <p>This is a fresh working base. Routing is ready.</p>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>
    </div>
  );
}
