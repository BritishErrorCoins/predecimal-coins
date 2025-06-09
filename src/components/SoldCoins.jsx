import React, { useState } from 'react';
import { exportToCSV } from '../utils/exportUtils';
import '../styles/theme.css';

const initialSoldCoins = [
  {
    id: 1,
    denomination: 'Penny',
    monarch: 'Victoria',
    year: 1874,
    purchasePrice: 2.5,
    sellPrice: 6.0,
    dateSold: '2024-04-15',
    notes: 'Very fine condition',
  },
  {
    id: 2,
    denomination: 'Halfpenny',
    monarch: 'George V',
    year: 1912,
    purchasePrice: 1.0,
    sellPrice: 0.8,
    dateSold: '2024-06-01',
    notes: 'Slight wear',
  },
];

function SoldCoins() {
  const [soldCoins, setSoldCoins] = useState(initialSoldCoins);
  const [search, setSearch] = useState('');
  const [monarchFilter, setMonarchFilter] = useState('');
  const [denominationFilter, setDenominationFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleChange = (id, field, value) => {
    const updated = soldCoins.map((coin) =>
      coin.id === id ? { ...coin, [field]: value } : coin
    );
    setSoldCoins(updated);
  };

  const filtered = soldCoins.filter((coin) => {
    const matchesSearch = Object.values(coin).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    );
    const matchesMonarch = monarchFilter ? coin.monarch === monarchFilter : true;
    const matchesDenomination = denominationFilter
      ? coin.denomination === denominationFilter
      : true;
    const matchesDate =
      (!startDate || coin.dateSold >= startDate) &&
      (!endDate || coin.dateSold <= endDate);
    return matchesSearch && matchesMonarch && matchesDenomination && matchesDate;
  });

  const totalProfit = filtered.reduce(
    (acc, coin) => acc + (coin.sellPrice - coin.purchasePrice),
    0
  );

  return (
    <div className="page-container">
      <h1>Sold Coins</h1>

      <div className="filter-row">
        <input
          type="text"
          placeholder="Search sold coins..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={monarchFilter} onChange={(e) => setMonarchFilter(e.target.value)}>
          <option value="">All Monarchs</option>
          <option value="Victoria">Victoria</option>
          <option value="George V">George V</option>
          {/* Add more as needed */}
        </select>
        <select
          value={denominationFilter}
          onChange={(e) => setDenominationFilter(e.target.value)}
        >
          <option value="">All Denominations</option>
          <option value="Penny">Penny</option>
          <option value="Halfpenny">Halfpenny</option>
          {/* Add more as needed */}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <button onClick={() => exportToCSV(filtered, 'SoldCoins')}>Export CSV</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Denomination</th>
            <th>Monarch</th>
            <th>Year</th>
            <th>Purchase (£)</th>
            <th>Sell (£)</th>
            <th>Profit (£)</th>
            <th>Date Sold</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((coin) => {
            const profit = coin.sellPrice - coin.purchasePrice;
            return (
              <tr key={coin.id}>
                <td>{coin.denomination}</td>
                <td>{coin.monarch}</td>
                <td>{coin.year}</td>
                <td>
                  <input
                    type="number"
                    value={coin.purchasePrice}
                    onChange={(e) =>
                      handleChange(coin.id, 'purchasePrice', parseFloat(e.target.value))
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={coin.sellPrice}
                    onChange={(e) =>
                      handleChange(coin.id, 'sellPrice', parseFloat(e.target.value))
                    }
                  />
                </td>
                <td style={{ color: profit >= 0 ? 'green' : 'red' }}>
                  £{profit.toFixed(2)}
                </td>
                <td>
                  <input
                    type="date"
                    value={coin.dateSold}
                    onChange={(e) =>
                      handleChange(coin.id, 'dateSold', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={coin.notes}
                    onChange={(e) => handleChange(coin.id, 'notes', e.target.value)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
        Total Profit:{" "}
        <span style={{ color: totalProfit >= 0 ? 'green' : 'red' }}>
          £{totalProfit.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default SoldCoins;
