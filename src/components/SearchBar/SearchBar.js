import React, {useState} from 'react';
import './SearchBar.css';

function SearchBar({onSearch}) {
    const [term, setTerm] = useState('');

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    };

    const search = (event) => {
        event.preventDefault();
        onSearch(term);
    };

    return (
        <div className="search-bar">
            <form className="searchbar-form">
                <input type="text"
                    className="searchbar-input"
                    onChange={handleTermChange}
                />
                <button
                    type="submit"
                    className="searchbar-button"
                    onClick={search}
                >Search</button>
            </form>
        </div>
    )
};

export default SearchBar;