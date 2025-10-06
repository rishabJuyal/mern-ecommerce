// components/CategoriesSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CategoriesSidebar = ({ title = "CATEGORIES", categories = [] }) => {
  return (
    <div className="bg-[var(--color-bg-light)] w-64 p-6 mb-6">
      <h2 className="text-xl text-gray-900 mb-6">{title}</h2>
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              to={category.path}
              className="text-sm text-gray-800 hover:text-blue-500 transition duration-200 ease-in-out"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Optional: Add prop types for clarity
CategoriesSidebar.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  )
};

export default CategoriesSidebar;
