import React from "react";

const Input = ({ label, type = "text", className, ...props }) => {
  return (
    <div className="w-full mb-3">
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
      <input
        type={type}
        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
