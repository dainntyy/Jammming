import React from 'react';
import './SearchBar.css';

function SearchBar() {
    return (
        <div className="search-bar">
            <form className="searchbar-form">
                <input type="text" className="searchbar-input"></input>
                <button type="submit" className="searchbar-button">Search</button>
            </form>
        </div>
    )
};

export default SearchBar;