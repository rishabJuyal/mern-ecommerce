import React from "react";

const AddressCard = ({ address, onChangeClick, isSelected, showRadio }) => {
  if (!address) {
    return (
      <div className="bg-gray-50 p-4 rounded border text-sm text-gray-500">
        No address available. Please add one in your profile.
        {onChangeClick && (
          <button
            onClick={onChangeClick}
            className="text-blue-600 underline text-sm mt-2"
          >
            Add Address
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`bg-white p-4 rounded border mb-2 ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
      } transition-all duration-200`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <p className="font-semibold">{address.fullName || address.name || "Recipient"}</p>
          <p>{address.street || address.streetAddress}</p>
          <p>{address.city}, {address.postalCode || address.pincode}</p>
          <p>{address.state}, {address.country}</p>
          <p>Phone: {address.phoneNumber}</p>
        </div>

        {showRadio && (
          <input
            type="radio"
            name="selectedAddress"
            checked={isSelected}
            readOnly
            className="ml-4 mt-1 h-5 w-5 text-blue-600"
          />
        )}
      </div>

      {onChangeClick && (
        <button
          onClick={onChangeClick}
          className="text-blue-600 underline text-sm mt-2"
        >
          Change Address
        </button>
      )}
    </div>
  );
};

export default AddressCard;
