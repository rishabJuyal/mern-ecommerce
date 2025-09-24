import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        <div className="flex gap-4 text-gray-600 text-sm">
          <a href="/terms" className="hover:text-blue-600">Terms</a>
          <a href="/privacy" className="hover:text-blue-600">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
