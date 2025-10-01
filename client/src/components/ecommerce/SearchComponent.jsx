import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false); // Track empty results

  // Function to handle search query input change
  const handleInputChange = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery) {
      try {
        // Fetch search suggestions (e.g., product names)
        const response = await api.get(`/products/suggestions?query=${searchQuery}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Function to handle search submission (enter key or button click)
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setNoResults(false); // Reset noResults flag on new search
    try {
      // Fetch products matching the search query
      const response = await api.get(`/products/search?query=${query}`);
      const result = response.data;
      setProducts(result);

      // If no products found, set the noResults state to true
      if (result.length === 0) {
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Handle Enter key press for search
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Search input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for products..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Suggestions list */}
        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-auto z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => setQuery(suggestion)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg focus:outline-none disabled:bg-gray-300"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {/* No results message */}
      {noResults && (
        <div className="mt-4 text-center text-red-500">
          <p>No products found matching your search criteria.</p>
        </div>
      )}

      {/* Product results */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-semibold text-blue-600">Price: ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
