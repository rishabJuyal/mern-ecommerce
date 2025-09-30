// src/components/AddressForm.js
import React, { useState, useEffect } from "react";

export default function AddressForm({
  initialData = null,
  onSubmit,
  onCancel
}) {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        fullName: initialData.fullName || "",
        phoneNumber: initialData.phoneNumber || "",
        streetAddress: initialData.streetAddress || "",
        city: initialData.city || "",
        state: initialData.state || "",
        postalCode: initialData.postalCode || "",
        country: initialData.country || "",
        isDefault: initialData.isDefault || false
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Street Address</label>
        <input
          name="streetAddress"
          value={form.streetAddress}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isDefault"
          checked={form.isDefault}
          onChange={handleChange}
        />
        <label className="text-sm">Set as default</label>
      </div>
      <div className="space-x-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
