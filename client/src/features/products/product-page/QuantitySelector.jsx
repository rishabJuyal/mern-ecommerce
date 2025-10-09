import React from "react";

const QuantitySelector = ({ quantity, setQuantity, max }) => {
  const handleChange = (val) => {
    if (val < 1) val = 1;
    if (val > max) val = max;
    setQuantity(val);
  };

  return (
    <div className="flex items-center border px-2 py-1">
      <button className="px-2" onClick={() => handleChange(quantity - 1)} disabled={quantity <= 1}>-</button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-12 text-center border-x"
      />
      <button className="px-2" onClick={() => handleChange(quantity + 1)} disabled={quantity >= max}>+</button>
    </div>
  );
};

export default QuantitySelector;
