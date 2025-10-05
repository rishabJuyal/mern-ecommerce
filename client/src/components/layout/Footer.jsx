// components/Footer.jsx
import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] text-gray-800 pt-12 pb-8 border-t">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-1">Call us 24/7</p>
          <p className="text-2xl text-yellow-500 font-extrabold mb-2 tracking-wide">
            1234 567 890
          </p>
          <p className="text-sm mb-1">502 New Design Str, Dehradun, Uttarakhand</p>
          <p className="text-sm text-blue-600 hover:underline cursor-pointer">
            Jshop.vercel.app
          </p>

          <div className="flex items-center space-x-4 mt-5 text-lg text-gray-500">
            <FaFacebookF className="hover:text-blue-600 transition duration-200 cursor-pointer" />
            <FaTwitter className="hover:text-sky-400 transition duration-200 cursor-pointer" />
            <FaGooglePlusG className="hover:text-red-500 transition duration-200 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 transition duration-200 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {['Policy', 'Terms & Conditions', 'Shipping', 'Return', 'FAQs'].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-blue-600 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {['About Us', 'Affiliate', 'Career', 'Contact'].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-blue-600 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Business */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Business</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {['Our Press', 'Checkout', 'My Account', 'Shop'].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-blue-600 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t mt-12 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} JShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
