import React, { useState } from 'react';
import './Searchbar.css';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = ({ searchLine }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        if (inputValue.trim()) {
            searchLine('line_name', inputValue);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="searchbar-container">
            <input
                type="text"
                id="search-input"
                placeholder="Ricerca di indirizzi, parcelle o mappe"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <SearchIcon className="search-icon" />
        </div>
    );
};

export default Searchbar;
