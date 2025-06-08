import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MyWantlist from './components/MyWantlist';
import SoldCoins from './components/SoldCoins';
import BrowseCoins from './components/BrowseCoins';
import MyCollection from './components/MyCollection';

import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrowseCoins />} /> {/* Default page */}
        <Route path="/collection" element={<MyCollection />} />
        <Route path="/browse" element={<BrowseCoins />} />
        <Route path="/sold" element={<SoldCoins />} />
        <Route path="/wantlist" element={<MyWantlist />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
