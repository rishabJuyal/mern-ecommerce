import React from "react";
import Button from "../ui/Button";
import { formatCurrency } from "../../utils/formatCurrency";

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between border-b py-3">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-gray-500">{formatCurrency(item.price)}</p>
        </div>
      </div>
      <Button variant="danger" onClick={() => onRemove(item.id)}>Remove</Button>
    </div>
  );
};

export default CartItem;
