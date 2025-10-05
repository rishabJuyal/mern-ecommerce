import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCart,
  Heart,
  BarChart2,
  User,
} from "lucide-react";
import { FaFlagUsa } from "react-icons/fa";
import SearchBar from "../ecommerce/SearchComponent";
import { fetchCart } from "../../store/cartSlice";

const Navbar = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const  dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchCart());
  },[])

  const handleProtectedNavigate = (path) => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <header className="w-full font-sans">
      {/* Top Bar */}
      <div className="bg-yellow-400 px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-black">
          <span className="text-black">mart</span>
          <span className="text-white">fury</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow mx-8 max-w-3xl">
          <SearchBar />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-sm text-black">
          <div
            className="relative cursor-pointer"
            onClick={() => handleProtectedNavigate("/compare")}
          >
            <BarChart2 size={20} />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => handleProtectedNavigate("/wishlist")}
          >
            <Heart size={20} />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => handleProtectedNavigate("/cart")}
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {items.length}
            </span>
          </div>

          <div
            className="cursor-pointer flex items-center gap-1"
            onClick={() => handleProtectedNavigate("/profile")}
          >
            <User size={20} />
            <span className="text-sm font-medium">
              {accessToken ? "Profile" : "Login / Register"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-yellow-400 px-6 py-2 border-t border-yellow-300 flex justify-between text-sm">
        <div className="flex items-center gap-8 text-black">
          <button className="flex items-center gap-2 font-medium">
            ☰ Shop by Department
          </button>
          <nav className="flex gap-6">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/shop" className="hover:underline">
              Shop
            </Link>
            <Link to="/pages" className="hover:underline">
              Pages
            </Link>
            <Link to="/blogs" className="hover:underline">
              Blogs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-black">
          <Link to="/sell" className="hover:underline">
            Sell on Martfury
          </Link>
          <Link to="/track-order" className="hover:underline">
            Track your order
          </Link>
          <span>|</span>
          <span>USD</span>
          <span>|</span>
          <div className="flex items-center gap-1">
            <FaFlagUsa />
            <span>English ▾</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
