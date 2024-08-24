import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ city, setCity, search }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search(e);
    }
  };

  return (
    <div className="SearchBar">
        <input
            type="text"
            className="city-search"
            placeholder="enter city name"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
        />
        <div onClick={search}>
            <FaSearch />
        </div>
    </div>
  );
}

export default SearchBar;
