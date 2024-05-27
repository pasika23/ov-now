import React, { useState } from 'react';
import './Searchbar.css';
import SearchIcon from '@mui/icons-material/Search';

const Searchbar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        if (inputValue.trim()) {
            onSearch(inputValue);
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
                placeholder="Suchbegriff eingeben"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <SearchIcon className="search-icon" />
        </div>
    );
};

export default Searchbar;
