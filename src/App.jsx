import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyCollection from './components/MyCollection';
import BrowseCoins from './components/BrowseCoins';
import Catalog from './components/Catalog';
import SoldCoins from './components/SoldCoins';
import MyWantlist from './components/MyWantlist';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/theme.css';

function Home() {
  return (
    <div className="page-container">
      <h1>✅ Welcome to the Predecimal Coins App</h1>
      <p>Use the navigation above to get started.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<MyCollection />} />
        <Route path="/browse" element={<BrowseCoins />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/sold" element={<SoldCoins />} />
        <Route path="/wantlist" element={<MyWantlist />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
