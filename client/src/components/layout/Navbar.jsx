import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login") return;

    dispatch(fetchCart());
  }, []);

  const handleProtectedNavigate = (path) => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[var(--color-primary)] px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold pr-8 text-black whitespace-nowrap">
          <span className="text-black">J</span>
          <span className="text-white">shop</span>
        </Link>

        {/* Search Bar for Desktop */}
        <div className="flex-grow max-w-3xl hidden md:block">
          <SearchBar />
        </div>

        {/* Icons for Desktop */}
        <div className="flex items-center lg:gap-7 gap-4 pl-4 text-sm text-black">
          <div
            className="relative cursor-pointer"
            onClick={() => handleProtectedNavigate("/compare")}
          >
            <BarChart2 size={20} />
            <span className="absolute -top-2 -right-2 bg-black text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => handleProtectedNavigate("/wishlist")}
          >
            <Heart size={20} />
            <span className="absolute -top-2 -right-2 bg-black text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => handleProtectedNavigate("/cart")}
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-black text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
              {items.length}
            </span>
          </div>

          <div
            className="cursor-pointer flex items-center gap-1"
            onClick={() => handleProtectedNavigate("/profile")}
          >
            <User size={20} />
            <span className="text-sm font-medium whitespace-nowrap">
              {accessToken ? "Profile" : "Login / Register"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[var(--color-primary)] px-6 py-3 border-t border-yellow-500 flex justify-between items-center text-sm">
        <div className="flex items-center gap-8 text-black">
          <button className="relative flex items-center gap-2 pr-8 font-medium group">
            ☰
            <span className="font-bold whitespace-nowrap">Shop by Department</span>
            <span
              className="absolute left-0 -top-3 w-0 h-[1px] bg-black transition-all duration-500 group-hover:w-full group-hover:left-0"
            ></span>
          </button>

          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:underline whitespace-nowrap">
              Home
            </Link>
            <Link to="/shop" className="hover:underline whitespace-nowrap">
              Shop
            </Link>
            <Link to="/pages" className="hover:underline whitespace-nowrap">
              Pages
            </Link>
            <Link to="/blogs" className="hover:underline whitespace-nowrap">
              Blogs
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-black">
          <Link
            to="/sell"
            className="relative inline-block text-black group whitespace-nowrap"
          >
            Sell on Jshop
            <span
              className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full group-hover:left-0"
            ></span>
          </Link>
          <span className="bg-black w-[2px] h-3 rounded"></span>
          <Link to="/orders" className="relative inline-block text-black group whitespace-nowrap">
            Track your order
            <span
              className="absolute left-1/2 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full group-hover:left-0"
            ></span>
          </Link>
          <span className="bg-black w-[2px] h-3 rounded"></span>

          {/* Currency Dropdown */}
          <div className="relative group">
            <span>INR</span>
            <span className="bg-black w-[2px] h-3 rounded"></span>
            <div className="absolute hidden group-hover:block bg-white text-black border border-gray-300 rounded-md w-24 top-6 left-0 shadow-md">
              <div className="cursor-pointer px-3 py-2 hover:bg-gray-100">USD</div>
              <div className="cursor-pointer px-3 py-2 hover:bg-gray-100">INR</div>
            </div>
          </div>

          <span className="bg-black w-[2px] h-3 rounded"></span>

          {/* Language Selector */}
          <div className="relative flex items-center gap-1">
            <FaFlagUsa />
            <span>English ▾</span>
            <div className="absolute hidden bg-white text-black border border-gray-300 rounded-md w-32 top-6 left-0 shadow-md group-hover:block">
              {/* Dropdown with other languages */}
              <div className="cursor-pointer px-3 py-2 hover:bg-gray-100">Hindi</div>
              <div className="cursor-pointer px-3 py-2 hover:bg-gray-100">Spanish</div>
              <div className="cursor-pointer px-3 py-2 hover:bg-gray-100">French</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navbar - Toggle for Search and Menu */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[var(--color-primary)] text-white">
        <SearchBar />
      </div>
    </header>

  );
};

export default Navbar;
