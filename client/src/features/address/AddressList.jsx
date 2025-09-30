// src/components/AddressList.js
import React from "react";

export default function AddressList({
  addresses = [],
  onEdit,
  onDelete,
  onSetDefault
}) {
  return (
    <div className="space-y-4">
      {addresses.length === 0 && (
        <p className="text-gray-500">No addresses added yet.</p>
      )}
      {addresses.map(addr => (
        <div
          key={addr._id}
          className="border p-4 rounded-md flex justify-between items-start"
        >
          <div>
            <p className="font-semibold">{addr.fullName}</p>
            <p>{addr.phoneNumber}</p>
            <p>
              {addr.streetAddress}, {addr.city}
              {addr.state ? `, ${addr.state}` : ""}, {addr.postalCode}, {addr.country}
            </p>
            {addr.isDefault && (
              <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                Default
              </span>
            )}
          </div>
          <div className="space-x-2 text-right">
            {!addr.isDefault && (
              <button
                onClick={() => onSetDefault(addr._id)}
                className="text-sm text-blue-600 hover:underline"
              >
                Set Default
              </button>
            )}
            <button
              onClick={() => onEdit(addr)}
              className="text-sm text-yellow-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(addr._id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
