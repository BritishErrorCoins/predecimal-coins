import React, { useState, useEffect } from 'react';
import coinData from '../data/PreDecCoin-dataset.json';
import '../styles/theme.css';

const BrowseCoins = () => {
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [filters, setFilters] = useState({
    Monarch: '',
    Metal: '',
    Denomination: '',
    Type: ''
  });

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let result = coinData;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((coin) => coin[key] === value);
      }
    });

    setFilteredCoins(result);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const addToMyCollection = (coin) => {
    const stored = JSON.parse(localStorage.getItem('myCollection') || '[]');
    localStorage.setItem('myCollection', JSON.stringify([...stored, { ...coin, id: Date.now() }]));
    alert(`${coin.Denomination} added to My Collection.`);
  };

  const addToMyWantlist = (coin) => {
    const reason = prompt(
      'Add to Wantlist - choose reason:\n1. Missing from my collection\n2. Upgrade\n3. Desire duplicates\n4. Other'
    );
    if (!reason) return;
    const stored = JSON.parse(localStorage.getItem('myWantlist') || '[]');
    localStorage.setItem(
      'myWantlist',
      JSON.stringify([...stored, { ...coin, id: Date.now(), reason }])
    );
    alert(`${coin.Denomination} added to My Wantlist.`);
  };

  const uniqueValues = (field) =>
    [...new Set(coinData.map((coin) => coin[field]))].sort();

  return (
    <div className="page-container">
      <h1>Browse Catalog</h1>

      <div className="filters">
        {['Monarch', 'Metal', 'Type', 'Denomination'].map((field) => (
          <select key={field} onChange={(e) => handleFilterChange(field, e.target.value)}>
            <option value="">{field}</option>
            {uniqueValues(field).map((val) => (
              <option key={val}>{val}</option>
            ))}
          </select>
        ))}
        <button onClick={() => setFilters({ Monarch: '', Metal: '', Denomination: '', Type: '' })}>
          Clear Filters
        </button>
      </div>

      <table className="coin-table">
        <thead>
          <tr>
            <th>Denomination</th>
            <th>Monarch</th>
            <th>Metal</th>
            <th>Strike</th>
            <th>Variety</th>
            <th>Year</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin, index) => (
            <tr key={index}>
              <td>{coin.Denomination}</td>
              <td>{coin.Monarch}</td>
              <td>{coin.Metal}</td>
              <td>{coin.Strike}</td>
              <td>{coin.Variety}</td>
              <td>{coin.Year}</td>
              <td>
                <button onClick={() => addToMyCollection(coin)}>Add to My Collection</button>{' '}
                <button onClick={() => addToMyWantlist(coin)}>Add to My Wantlist</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrowseCoins;
