import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <p className="text-gray-600 text-center">User not logged in.</p>
      </div>
    );
  }

  const defaultAddress = user.address?.find((addr) => addr.isDefault);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 border-b pb-2">
        My Profile
      </h2>

      {/* Profile Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10 border border-gray-200">
        <h3 className="text-xl font-semibold text-yellow-500 mb-4">
          Account Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <p className="font-semibold">Name</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p className="font-semibold">Username</p>
            <p>{user.username}</p>
          </div>
          <div>
            <p className="font-semibold">Email</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="font-semibold">Role</p>
            <p className="capitalize">{user.role}</p>
          </div>
        </div>

        <button className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
          Edit Profile
        </button>
      </div>

      {/* Default Address */}
      {defaultAddress && (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-yellow-500 mb-4">
            Default Address
          </h3>

          <div className="text-sm text-gray-700 leading-relaxed space-y-1">
            <p>{defaultAddress.fullName}</p>
            <p>{defaultAddress.streetAddress}</p>
            <p>
              {defaultAddress.city}, {defaultAddress.state} -{" "}
              {defaultAddress.postalCode}
            </p>
            <p>{defaultAddress.country}</p>
            <p>Phone: {defaultAddress.phoneNumber}</p>
          </div>

          <button
            onClick={() => navigate("/change-address")}
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Edit Address
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
