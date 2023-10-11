import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");
  console.log(search);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    onSearch(searchTerm); // Notify the parent component about the search term
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      onSearch(search); // Notify the parent component about the search term
    }
  };
  return (
    <div className="searchBox">
      <div className="searchbar-container">
        <input
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
          className="search-bar"
          placeholder="Search..."
        />
        <FaSearch className="search-icon" onClick={handleSearchSubmit} />
      </div>
    </div>
  );
}

export default SearchBar;
