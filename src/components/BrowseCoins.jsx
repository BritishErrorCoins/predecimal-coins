// src/components/BrowseCoins.jsx

import React, { useEffect, useState } from 'react';
import dataset from '../data/PreDecCoin-dataset.json';
import '../styles/theme.css';

const BrowseCoins = () => {
  const [coins, setCoins] = useState([]);
  const [filters, setFilters] = useState({
    Monarch: '',
    Denomination: '',
    Metal: '',
    Type: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const validCoins = dataset.filter(coin => coin.ID && coin.Denomination && coin.Monarch);
    setCoins(validCoins);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ Monarch: '', Denomination: '', Metal: '', Type: '' });
  };

  const filteredCoins = coins.filter((coin) => {
    return (
      (!filters.Monarch || coin.Monarch === filters.Monarch) &&
      (!filters.Denomination || coin.Denomination === filters.Denomination) &&
      (!filters.Metal || coin.Metal === filters.Metal) &&
      (!filters.Type || coin.Type === filters.Type)
    );
  });

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key] || '';
    const bVal = b[sortConfig.key] || '';
    const compare = aVal.toString().localeCompare(bVal.toString(), undefined, { numeric: true });
    return sortConfig.direction === 'asc' ? compare : -compare;
  });

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const uniqueValues = (key) => [...new Set(coins.map(c => c[key]).filter(Boolean))];

  const handleAddToCollection = (coin) => {
    console.log('Add to Collection:', coin);
    // Your collection logic here
  };

  const handleAddToWantlist = (coin) => {
    console.log('Add to Wantlist:', coin);
    // Your wantlist logic here
  };

  return (
    <div className="page-container">
      <h2>Browse Coins</h2>

      <div className="filters">
        <select name="Monarch" value={filters.Monarch} onChange={handleFilterChange}>
          <option value="">All Monarchs</option>
          {uniqueValues('Monarch').map((val) => <option key={val}>{val}</option>)}
        </select>
        <select name="Denomination" value={filters.Denomination} onChange={handleFilterChange}>
          <option value="">All Denominations</option>
          {uniqueValues('Denomination').map((val) => <option key={val}>{val}</option>)}
        </select>
        <select name="Metal" value={filters.Metal} onChange={handleFilterChange}>
          <option value="">All Metals</option>
          {uniqueValues('Metal').map((val) => <option key={val}>{val}</option>)}
        </select>
        <select name="Type" value={filters.Type} onChange={handleFilterChange}>
          <option value="">All Types</option>
          {uniqueValues('Type').map((val) => <option key={val}>{val}</option>)}
        </select>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <div className="table-wrapper">
        <table className="coin-table">
          <thead>
            <tr>
              {['ID', 'Denomination', 'Monarch', 'Metal', 'Type', 'Strike Type', 'Variety', 'Year'].map((col) => (
                <th key={col} onClick={() => handleSort(col)} style={{ cursor: 'pointer' }}>
                  {col}{sortConfig.key === col ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCoins.map((coin) => (
              <tr key={coin.ID}>
                <td>{coin.ID}</td>
                <td>{coin.Denomination}</td>
                <td>{coin.Monarch}</td>
                <td>{coin.Metal}</td>
                <td>{coin.Type}</td>
                <td>{coin['Strike Type']}</td>
                <td>{coin.Variety}</td>
                <td>{coin.Year}</td>
                <td>
                  <button onClick={() => handleAddToCollection(coin)}>Add to My Collection</button>
                  <button onClick={() => handleAddToWantlist(coin)}>Add to My Wantlist</button>
                </td>
              </tr>
            ))}
            {sortedCoins.length === 0 && (
              <tr>
                <td colSpan="9" className="no-results">No matching coins.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseCoins;
