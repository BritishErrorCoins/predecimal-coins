// src/components/BrowseCoins.jsx

import React, { useState, useEffect } from 'react';
import dataset from '../data/PreDecCoin-dataset.json';
import { exportToCSV } from '../utils/exportUtils';
import '../styles/theme.css';

const BrowseCoins = () => {
  const [coins, setCoins] = useState([]);
  const [filters, setFilters] = useState({
    denomination: '',
    monarch: '',
    metal: '',
    type: '',
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCoins(dataset);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      denomination: '',
      monarch: '',
      metal: '',
      type: '',
    });
  };

  const filteredCoins = coins.filter((coin) => {
    return (
      (!filters.denomination || coin.denomination === filters.denomination) &&
      (!filters.monarch || coin.monarch === filters.monarch) &&
      (!filters.metal || coin.metal === filters.metal) &&
      (!filters.type || coin.type === filters.type) &&
      Object.values(coin).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  const addToCollection = (coin) => {
    // Add logic for adding to My Collection
    alert(`Added to My Collection: ${coin.denomination} ${coin.year}`);
  };

  const addToWantlist = (coin) => {
    const reason = prompt(
      `Why do you want this coin?\n1. Missing from my collection\n2. Upgrade\n3. Desire duplicates\n4. Other`
    );
    if (reason) {
      alert(`Added to Wantlist with reason: ${reason}`);
      // Add logic to persist this
    }
  };

  const uniqueOptions = (field) => {
    return [...new Set(coins.map((coin) => coin[field]))].sort();
  };

  return (
    <div className="page-container">
      <h1>Browse Catalog</h1>

      <div className="filters sticky-header">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filters.denomination}
          onChange={(e) => handleFilterChange('denomination', e.target.value)}
        >
          <option value="">All Denominations</option>
          {uniqueOptions('denomination').map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>

        <select
          value={filters.monarch}
          onChange={(e) => handleFilterChange('monarch', e.target.value)}
        >
          <option value="">All Monarchs</option>
          {uniqueOptions('monarch').map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>

        <select
          value={filters.metal}
          onChange={(e) => handleFilterChange('metal', e.target.value)}
        >
          <option value="">All Metals</option>
          {uniqueOptions('metal').map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>

        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          {uniqueOptions('type').map((val) => (
            <option key={val}>{val}</option>
          ))}
        </select>

        <button onClick={clearFilters}>Clear Filters</button>
        <button onClick={() => exportToCSV(filteredCoins, 'BrowseCoins')}>Export CSV</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Denomination</th>
            <th>Monarch</th>
            <th>Metal</th>
            <th>Type</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.denomination}</td>
              <td>{coin.monarch}</td>
              <td>{coin.metal}</td>
              <td>{coin.type}</td>
              <td>{coin.year}</td>
              <td>
                <button onClick={() => addToCollection(coin)}>Add to My Collection</button>
                <button onClick={() => addToWantlist(coin)}>Add to Wantlist</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrowseCoins;
