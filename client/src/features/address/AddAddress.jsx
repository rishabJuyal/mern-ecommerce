import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { refreshToken } from "../store/authSlice"; // to get updated user
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
    pincode: "",
    country: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.patch("/user/address", form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Update user data in Redux after address is saved
      await dispatch(refreshToken());

      alert("Address added successfully.");
      navigate("/checkout"); // Or wherever you want to go next
    } catch (err) {
      console.error("Error saving address:", err);
      alert("Failed to add address.");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add New Address</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={form.street}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode / ZIP"
          value={form.pincode}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
