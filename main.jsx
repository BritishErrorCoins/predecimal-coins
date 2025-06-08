import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyCollection from './components/MyCollection';
import MyWantlist from './components/MyWantlist';
import SoldCoins from './components/SoldCoins';
import BrowseCoins from './components/BrowseCoins';
import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrowseCoins />} />
        <Route path="/collection" element={<MyCollection />} />
        <Route path="/wantlist" element={<MyWantlist />} />
        <Route path="/sold" element={<SoldCoins />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
