// src/pages/AddressPage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentUser,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../store/userSlice";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";

export default function AddressPage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [editingAddress, setEditingAddress] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch user profile with addresses on mount or if profile is null
  useEffect(() => {
    if (!profile) {
      dispatch(fetchCurrentUser());
    }
  }, [profile, dispatch]);

  // Show form to add new address
  const handleAddClick = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  // Show form to edit existing address
  const handleEdit = (addr) => {
    setEditingAddress(addr);
    setShowForm(true);
  };

  // Delete address confirmation and dispatch
  const handleDelete = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddress(addressId));
    }
  };

  // Set an address as default
  const handleSetDefault = (addressId) => {
    dispatch(setDefaultAddress(addressId));
  };

  // On form submission: add or update address then hide form
  const handleFormSubmit = (formData) => {
    if (editingAddress) {
      dispatch(updateAddress({ addressId: editingAddress._id, ...formData }));
    } else {
      dispatch(addAddress(formData));
    }
    setShowForm(false);
  };

  // Cancel the form without saving
  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Addresses</h2>
  
      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
  
      {profile && (
        <>
          {/* Hide AddressList if the form is showing */}
          {!showForm && (
            <AddressList
              addresses={profile.address || []}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          )}
  
          {!showForm && (
            <div className="mt-6">
              <button
                onClick={handleAddClick}
                className="px-5 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                + Add New Address
              </button>
            </div>
          )}
  
          {/* Show form only if showForm is true */}
          {showForm && (
            <div className="mt-8 border border-gray-300 rounded p-6 bg-gray-50">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                {editingAddress ? "Edit Address" : "Add Address"}
              </h3>
  
              <AddressForm
                initialData={editingAddress}
                onSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            </div>
          )}
        </>
      )}
    </div>
  );

}
