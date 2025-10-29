import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user)
    return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-lg text-center w-96">
        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-1">Email: {user.email}</p>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>
    </div>
  );
}
