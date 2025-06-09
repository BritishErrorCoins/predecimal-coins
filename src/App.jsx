import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BrowseCoins from './components/BrowseCoins';
import MyCollection from './components/MyCollection';
import MyWantlist from './components/MyWantlist';
import SoldCoins from './components/SoldCoins';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<BrowseCoins />} />
          <Route path="/collection" element={<MyCollection />} />
          <Route path="/wantlist" element={<MyWantlist />} />
          <Route path="/sold" element={<SoldCoins />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
