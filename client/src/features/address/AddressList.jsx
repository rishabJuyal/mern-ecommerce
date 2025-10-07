import React from "react";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";

export default function AddressList({
  addresses = [],
  onEdit,
  onDelete,
  onSetDefault,
}) {
  return (
    <div className="space-y-6">
      {addresses.length === 0 && (
        <p className="text-gray-500 text-center">No addresses added yet.</p>
      )}
      {addresses.map((addr) => (
        <div
          key={addr._id}
          className="relative bg-white border border-gray-200 shadow-md rounded-lg p-6 transition hover:shadow-lg"
        >
          {/* Top Right Default Badge */}
          {addr.isDefault && (
            <div className="absolute top-2 right-2 flex items-center text-yellow-600 text-xs font-semibold">
              <FaStar className="mr-1 text-yellow-500" />
              Default
            </div>
          )}

          {/* Address Content */}
          <div className="text-gray-800 space-y-2">
            <div className="text-lg font-semibold">{addr.fullName}</div>
            <div className="text-sm">{addr.phoneNumber}</div>
            <div className="text-sm leading-snug">
              {addr.streetAddress}, {addr.city}
              {addr.state ? `, ${addr.state}` : ""}, {addr.postalCode},{" "}
              {addr.country}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-4">
            {!addr.isDefault && (
              <button
                onClick={() => onSetDefault(addr._id)}
                className="text-blue-600 hover:text-blue-800 transition"
                title="Set as Default"
              >
                <FaStar size={16} />
              </button>
            )}
            <button
              onClick={() => onEdit(addr)}
              className="text-yellow-600 hover:text-yellow-700 transition"
              title="Edit"
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={() => onDelete(addr._id)}
              className="text-red-600 hover:text-red-700 transition"
              title="Delete"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
