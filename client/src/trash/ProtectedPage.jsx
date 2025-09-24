import React, { useEffect, useState } from "react";
import api from "../services/api";

const ProtectedPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await api.get("/users");
        setData(res.data);
      } catch (err) {
        console.error("Protected request failed", err);
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <h2>Protected Page</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProtectedPage;
