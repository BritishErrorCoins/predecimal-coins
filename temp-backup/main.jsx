import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MyWantlist from './components/MyWantlist';
import Catalog from './components/Catalog';
import SoldCoins from './components/SoldCoins';
import BrowseCoins from './components/BrowseCoins';
import MyCollection from './components/MyCollection';
import './styles/theme.css';

function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>✅ Predecimal Coins App</h1>
      <p>Select a page:</p>
      <ul>
        <li><Link to="/collection">My Collection</Link></li>
        <li><Link to="/browse">Browse Coins</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/wantlist">My Wantlist</Link></li>
        <li><Link to="/sold">Sold Coins</Link></li>
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<MyCollection />} />
        <Route path="/browse" element={<BrowseCoins />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/wantlist" element={<MyWantlist />} />
        <Route path="/sold" element={<SoldCoins />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
