import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Heart, User } from "lucide-react";

const Navbar = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Access Token:", accessToken); // Log accessToken on route change
  }, [location.pathname, accessToken]); // Run when route or accessToken changes

  const handleProtectedNavigate = (path) => {
    if (!accessToken) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Unprotected links */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          E-Shop
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/shop" className="hover:text-blue-600">Shop</Link>

          {/* Protected routes replaced with buttons */}
          <button
            onClick={() => handleProtectedNavigate('/wishlist')}
            className="flex items-center gap-1 hover:text-blue-600 bg-transparent border-0 cursor-pointer"
          >
            <Heart size={18} /> Wishlist
          </button>

          <button
            onClick={() => handleProtectedNavigate('/cart')}
            className="flex items-center gap-1 hover:text-blue-600 bg-transparent border-0 cursor-pointer"
          >
            <ShoppingCart size={18} /> Cart
          </button>

          <button
            onClick={() => handleProtectedNavigate('/add-product')}
            className="flex items-center gap-1 hover:text-blue-600 bg-transparent border-0 cursor-pointer"
          >
            <User size={18} /> Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
