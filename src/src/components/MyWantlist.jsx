import React, { useEffect, useState } from 'react';
import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';

const MyWantlist = () => {
  const [wantlist, setWantlist] = useState([]);
  const [filters, setFilters] = useState({ monarch: '', denomination: '', metal: '', type: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('myWantlist') || '[]');
    setWantlist(stored);
  }, []);

  const updateLocalStorage = (updated) => {
    setWantlist(updated);
    localStorage.setItem('myWantlist', JSON.stringify(updated));
  };

  const updateField = (index, field, value) => {
    const updated = [...wantlist];
    updated[index][field] = value;
    updateLocalStorage(updated);
  };

  const exportCSV = () => {
    const sheet = utils.json_to_sheet(wantlist);
    const book = utils.book_new();
    utils.book_append_sheet(book, sheet, 'MyWantlist');
    const blob = new Blob([write(book, { bookType: 'xlsx', type: 'array' })], {
      type: 'application/octet-stream',
    });
    saveAs(blob, 'MyWantlist.xlsx');
  };

  const filtered = wantlist.filter((coin) =>
    (!filters.monarch || coin.monarch === filters.monarch) &&
    (!filters.denomination || coin.denomination === filters.denomination) &&
    (!filters.metal || coin.metal === filters.metal) &&
    (!filters.type || coin.type === filters.type)
  );

  return (
    <div style={{ padding: '1rem' }}>
      <h2>My Wantlist</h2>

      <div className="filters">
        {['monarch', 'denomination', 'type', 'metal'].map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            <input
              value={filters[field]}
              onChange={(e) => setFilters({ ...filters, [field]: e.target.value })}
              placeholder={field}
            />
          </label>
        ))}
        <button onClick={() => setFilters({ monarch: '', denomination: '', metal: '', type: '' })}>Clear</button>
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
            <th>Reason</th>
            <th>Notes</th>
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
              <td>
                <input
                  value={coin.reason || ''}
                  onChange={(e) => updateField(idx, 'reason', e.target.value)}
                />
              </td>
              <td>
                <input
                  value={coin.notes || ''}
                  onChange={(e) => updateField(idx, 'notes', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyWantlist;
