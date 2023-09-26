import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="searchBox">
      <div className="searchbar-container">
        <input className="search-bar" placeholder="Search..." />
        <FaSearch className="search-icon" />
      </div>
    </div>
  );
}

export default SearchBar;
