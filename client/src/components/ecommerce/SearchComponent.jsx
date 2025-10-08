import React, { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const handleInputChange = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery) {
      try {
        const response = await api.get(`/products/suggestions?query=${searchQuery}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-3xl mx-auto">
      {/* Search Box */}
      <div className="flex items-stretch bg-white rounded-r overflow-hidden shadow-xs">
        <select className="bg-gray-100 text-xs font-semibold px-3 pr-6 py-2 border-r border-gray-200 outline-none text-gray-700">
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
        </select>

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="I'm shopping for..."
          className="flex-grow px-4 py-2 outline-none text-xs text-gray-800"
        />

        <button
          onClick={handleSearch}
          className="bg-black text-white px-6 text-xs rounded-r font-medium hover:bg-gray-800 transition"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => {
                setQuery(s);
                setSuggestions([]);
                navigate(`/search?query=${encodeURIComponent(s)}`);
              }}
              className="px-4 py-2 text-xs cursor-pointer hover:bg-gray-100 text-gray-800"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
