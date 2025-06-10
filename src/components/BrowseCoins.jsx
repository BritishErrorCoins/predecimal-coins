import React, { useState, useEffect } from 'react';
import dataset from '../data/PreDecCoin-dataset.json';
import '../styles/theme.css';

const BrowseCoins = () => {
  const [coins, setCoins] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState({
    monarch: '',
    metal: '',
    denomination: '',
    type: '',
  });

  useEffect(() => {
    setCoins(dataset);
    setFiltered(dataset);
  }, []);

  useEffect(() => {
    let results = coins;

    // Apply filters
    if (filters.monarch) {
      results = results.filter(c => c.Monarch === filters.monarch);
    }
    if (filters.metal) {
      results = results.filter(c => c.Metal === filters.metal);
    }
    if (filters.denomination) {
      results = results.filter(c => c.Denomination === filters.denomination);
    }
    if (filters.type) {
      results = results.filter(c => c.Type === filters.type);
    }

    // Apply sorting
    if (sortField) {
      results = [...results].sort((a, b) => {
        const valA = a[sortField]?.toString().toLowerCase() || '';
        const valB = b[sortField]?.toString().toLowerCase() || '';
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      });
    }

    setFiltered(results);
  }, [coins, filters, sortField, sortAsc]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const uniqueValues = (key) => [...new Set(coins.map(c => c[key]).filter(Boolean))];

  return (
    <div className="page-container">
      <h2>Browse Catalog</h2>

      <div className="filters">
        <select value={filters.monarch} onChange={e => setFilters({ ...filters, monarch: e.target.value })}>
          <option value="">All Monarchs</option>
          {uniqueValues('Monarch').map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select value={filters.metal} onChange={e => setFilters({ ...filters, metal: e.target.value })}>
          <option value="">All Metals</option>
          {uniqueValues('Metal').map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select value={filters.denomination} onChange={e => setFilters({ ...filters, denomination: e.target.value })}>
          <option value="">All Denominations</option>
          {uniqueValues('Denomination').map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All Types</option>
          {uniqueValues('Type').map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <button onClick={() => setFilters({ monarch: '', metal: '', denomination: '', type: '' })}>
          Clear Filters
        </button>
      </div>

      <table className="coin-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('Monarch')}>Monarch</th>
            <th onClick={() => handleSort('Denomination')}>Denomination</th>
            <th onClick={() => handleSort('Year')}>Year</th>
            <th onClick={() => handleSort('Metal')}>Metal</th>
            <th onClick={() => handleSort('Type')}>Type</th>
            <th onClick={() => handleSort('Variety')}>Variety</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((coin, idx) => (
            <tr key={idx}>
              <td>{coin.Monarch}</td>
              <td>{coin.Denomination}</td>
              <td>{coin.Year}</td>
              <td>{coin.Metal}</td>
              <td>{coin.Type}</td>
              <td>{coin.Variety}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrowseCoins;
