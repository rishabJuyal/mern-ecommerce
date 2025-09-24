import React from "react";

const Profile = () => {
  const user = { name: "John Doe", email: "john@example.com" };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h2 className="text-3xl font-semibold mb-6">My Profile</h2>

      <div className="border rounded-lg p-6 shadow space-y-4">
        <div>
          <p className="font-medium">Name:</p>
          <p>{user.name}</p>
        </div>
        <div>
          <p className="font-medium">Email:</p>
          <p>{user.email}</p>
        </div>
        <button className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
