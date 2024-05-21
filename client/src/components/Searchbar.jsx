import React, { useState } from 'react';
import './Searchbar.css'
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Passa il termine di ricerca al genitore tramite la funzione onSearch
    onSearch(searchTerm);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Bahnhof"
        style={{ height: '28px', width: '30vw' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default Searchbar;