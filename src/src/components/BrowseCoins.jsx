import React, { useState, useEffect } from 'react';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

const Catalog = () => {
  const [coins, setCoins] = useState([]);
  const [filters, setFilters] = useState({ monarch: '', denomination: '', type: '', metal: '' });

  useEffect(() => {
    const stored = localStorage.getItem('coinDataset');
    if (stored) setCoins(JSON.parse(stored));
  }, []);

  const filtered = coins.filter(c =>
    (!filters.monarch || c.monarch === filters.monarch) &&
    (!filters.denomination || c.denomination === filters.denomination) &&
    (!filters.type || c.type === filters.type) &&
    (!filters.metal || c.metal === filters.metal)
  );

  const addToCollection = (coin) => {
    const price = prompt('Enter purchase price (e.g. 12.50):');
    const notes = prompt('Enter notes (optional):') || '';
    if (price !== null) {
      const collection = JSON.parse(localStorage.getItem('myCollection') || '[]');
      collection.push({ ...coin, purchasePrice: price, notes });
      localStorage.setItem('myCollection', JSON.stringify(collection));
      alert('Added to My Collection.');
    }
  };

  const addToWantlist = (coin) => {
    const reason = prompt(`Reason for adding to wantlist:\n- Missing from my collection\n- Upgrade\n- Desire duplicates\n- Other`);
    if (!reason) return;
    const wantlist = JSON.parse(localStorage.getItem('myWantlist') || '[]');
    wantlist.push({ ...coin, reason });
    localStorage.setItem('myWantlist', JSON.stringify(wantlist));
    alert('Added to My Wantlist.');
  };

  const exportCSV = () => {
    const sheet = utils.json_to_sheet(filtered);
    const book = utils.book_new();
    utils.book_append_sheet(book, sheet, 'Catalog');
    const blob = new Blob([write(book, { bookType: 'xlsx', type: 'array' })], { type: 'application/octet-stream' });
    saveAs(blob, 'Catalog.xlsx');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Catalog</h2>

      <div className="filters">
        {['monarch', 'denomination', 'type', 'metal'].map(field => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              value={filters[field]}
              onChange={e => setFilters({ ...filters, [field]: e.target.value })}
              placeholder={field}
            />
          </label>
        ))}
        <button onClick={() => setFilters({ monarch: '', denomination: '', type: '', metal: '' })}>Clear</button>
        <button onClick={exportCSV}>Export</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Monarch</th>
            <th>Denomination</th>
            <th>Year</th>
            <th>Type</th>
            <th>Metal</th>
            <th>Variety</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((coin, idx) => (
            <tr key={idx}>
              <td>{coin.monarch}</td>
              <td>{coin.denomination}</td>
              <td>{coin.year}</td>
              <td>{coin.type}</td>
              <td>{coin.metal}</td>
              <td>{coin.variety || ''}</td>
              <td>
                <button onClick={() => addToCollection(coin)}>Add to Collection</button>
                <button onClick={() => addToWantlist(coin)}>Add to Wantlist</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Catalog;
