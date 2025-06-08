import React, { useEffect, useState } from 'react';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

const SoldCoins = () => {
  const [sold, setSold] = useState([]);
  const [filters, setFilters] = useState({
    monarch: '',
    denomination: '',
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    const data = localStorage.getItem('soldCoins');
    setSold(data ? JSON.parse(data) : []);
  }, []);

  const filtered = sold.filter(c => {
    const matchesMonarch = !filters.monarch || c.monarch === filters.monarch;
    const matchesDenom = !filters.denomination || c.denomination === filters.denomination;
    const matchesFrom = !filters.fromDate || new Date(c.dateSold) >= new Date(filters.fromDate);
    const matchesTo = !filters.toDate || new Date(c.dateSold) <= new Date(filters.toDate);
    return matchesMonarch && matchesDenom && matchesFrom && matchesTo;
  });

  const exportCSV = () => {
    const sheet = utils.json_to_sheet(filtered);
    const book = utils.book_new();
    utils.book_append_sheet(book, sheet, 'SoldCoins');
    const blob = new Blob([write(book, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(blob, 'SoldCoins.xlsx');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Sold Coins</h2>

      <div className="filters">
        <label>
          Monarch:
          <input
            value={filters.monarch}
            onChange={e => setFilters({ ...filters, monarch: e.target.value })}
            placeholder="Monarch"
          />
        </label>
        <label>
          Denomination:
          <input
            value={filters.denomination}
            onChange={e => setFilters({ ...filters, denomination: e.target.value })}
            placeholder="Denomination"
          />
        </label>
        <label>
          From:
          <input
            type="date"
            value={filters.fromDate}
            onChange={e => setFilters({ ...filters, fromDate: e.target.value })}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={filters.toDate}
            onChange={e => setFilters({ ...filters, toDate: e.target.value })}
          />
        </label>
        <button onClick={() => setFilters({ monarch: '', denomination: '', fromDate: '', toDate: '' })}>Clear</button>
        <button onClick={exportCSV}>Export</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Monarch</th>
            <th>Denomination</th>
            <th>Year</th>
            <th>Purchase (£)</th>
            <th>Sell (£)</th>
            <th>Date Sold</th>
            <th>Profit</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((coin, index) => {
            const profit = (parseFloat(coin.sellPrice) || 0) - (parseFloat(coin.purchasePrice) || 0);
            return (
              <tr key={index}>
                <td>{coin.monarch}</td>
                <td>{coin.denomination}</td>
                <td>{coin.year}</td>
                <td>£{parseFloat(coin.purchasePrice || 0).toFixed(2)}</td>
                <td>£{parseFloat(coin.sellPrice || 0).toFixed(2)}</td>
                <td>{coin.dateSold}</td>
                <td style={{ color: profit >= 0 ? 'green' : 'red' }}>
                  £{profit.toFixed(2)}
                </td>
                <td>{coin.notes || ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SoldCoins;
