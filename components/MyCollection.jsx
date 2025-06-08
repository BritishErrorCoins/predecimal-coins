// src/components/MyCollection.jsx

import React, { useState } from "react";
import { exportToCSV } from "../utils/exportUtils";
import sampleData from "../data/sampleCollection.json"; // You can replace this with your dataset

function MyCollection() {
  const [coins, setCoins] = useState(sampleData);
  const [search, setSearch] = useState("");

  const handleSell = (id) => {
    const updated = coins.filter((coin) => coin.id !== id);
    setCoins(updated);
    // You can push this coin to your Sold page via context or backend logic
  };

  const handleChange = (id, field, value) => {
    const updated = coins.map((coin) =>
      coin.id === id ? { ...coin, [field]: value } : coin
    );
    setCoins(updated);
  };

  const filteredCoins = coins.filter((coin) =>
    Object.values(coin).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <h1>My Collection</h1>
      <input
        type="text"
        placeholder="Search collection..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <button onClick={() => exportToCSV(filteredCoins, "MyCollection")}>
        Export CSV
      </button>
      <table>
        <thead>
          <tr>
            <th>Denomination</th>
            <th>Monarch</th>
            <th>Metal</th>
            <th>Year</th>
            <th>Purchase Price</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td>{coin.denomination}</td>
              <td>{coin.monarch}</td>
              <td>{coin.metal}</td>
              <td>{coin.year}</td>
              <td>
                <input
                  type="text"
                  value={coin.purchasePrice}
                  onChange={(e) =>
                    handleChange(coin.id, "purchasePrice", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={coin.notes}
                  onChange={(e) =>
                    handleChange(coin.id, "notes", e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => handleSell(coin.id)}>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyCollection;
