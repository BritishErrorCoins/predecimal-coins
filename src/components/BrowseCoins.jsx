// src/components/BrowseCoins.jsx

import React, { useState, useEffect } from 'react';
import coinData from '../data/PreDecCoin-dataset.json';
import '../styles/theme.css';

const BrowseCoins = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const [filters, setFilters] = useState({
    monarch: '',
    metal: '',
    denomination: '',
    type: ''
  });

  useEffect(() => {
    setData(coinData);
    setFiltered(coinData);
  }, []);

  useEffect(() => {
    let filteredData = [...data];
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filteredData = filteredData.filter((item) =>
          item[key]?.toLowerCase().includes(filters[key].toLowerCase())
        );
      }
    });
    setFiltered(filteredData);
  }, [filters, data]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[key]?.toString().toLowerCase() || '';
      const bVal = b[key]?.toString().toLowerCase() || '';
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setFiltered(sorted);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ monarch: '', metal: '', denomination: '', type: '' });
  };

  return (
    <div className="page">
      <h2>Browse Coins</h2>

      <div className="filters">
        <input
          name="monarch"
          placeholder="Filter by Monarch"
          value={filters.monarch}
          onChange={handleFilterChange}
        />
        <input
          name="metal"
          placeholder="Filter by Metal"
          value={filters.metal}
          onChange={handleFilterChange}
        />
        <input
          name="denomination"
          placeholder="Filter by Denomination"
          value={filters.denomination}
          onChange={handleFilterChange}
        />
        <input
          name="type"
          placeholder="Filter by Type"
          value={filters.type}
          onChange={handleFilterChange}
        />
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      <table className="coin-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('monarch')}>Monarch</th>
            <th onClick={() => handleSort('denomination')}>Denomination</th>
            <th onClick={() => handleSort('type')}>Type</th>
            <th onClick={() => handleSort('metal')}>Metal</th>
            <th onClick={() => handleSort('strike')}>Strike</th>
            <th onClick={() => handleSort('variety')}>Variety</th>
            <th onClick={() => handleSort('year')}>Year</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((coin, index) => (
            <tr key={index}>
              <td>{coin.monarch}</td>
              <td>{coin.denomination}</td>
              <td>{coin.type}</td>
              <td>{coin.metal}</td>
              <td>{coin.strike}</td>
              <td>{coin.variety}</td>
              <td>{coin.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrowseCoins;
