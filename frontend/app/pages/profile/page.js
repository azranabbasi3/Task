"use client";
import { notify } from "@/app/utils/Notify";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", name: "" });

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token) {
      router.push("/pages/auth/login");
      return;
    }

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/getProfile/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.data)
      setUser({
        name: data.data.name || "",
        email: data.data.email || "",
      });
    } catch (err) {
      notify("error", "Failed to fetch profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    router.push("/pages/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-lg text-gray-900">{user.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-lg text-gray-900">{user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
