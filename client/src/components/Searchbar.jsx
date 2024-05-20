import React, { useState } from 'react';
import './Searchbar.css'

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Passa il termine di ricerca al genitore tramite la funzione onSearch
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Bahnhof"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Cerca</button>
    </div>
  );
};

export default Searchbar;