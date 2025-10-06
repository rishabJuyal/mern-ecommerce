import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const wrapperRef = useRef(null); // 🔸 To detect clicks outside

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
    setSuggestions([]); // Hide dropdown after search
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 🔸 Hide suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-3xl">
      <div className="flex bg-white overflow-hidden">
        <select className="bg-transparent text-sm px-3 py-2 border-r border-gray-400 outline-none">
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="I'm shopping for..."
          className="flex-grow px-4 py-2 outline-none text-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-6 font-semibold text-sm hover:bg-gray-800"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-300 rounded shadow-lg mt-1">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => {
                setQuery(s);
                setSuggestions([]);
                navigate(`/search?query=${encodeURIComponent(s)}`);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
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
