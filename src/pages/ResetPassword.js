import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../Config";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const resetTokenFromUrl = location.pathname.split("/").pop();
    setToken(resetTokenFromUrl);
  }, [location.pathname]);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );

      if (response.status === 200) {
        navigate("/login");
        toast.success("Password Reset successful");
      } else {
        if (response.status === 204 && response.data.notFound) {
          toast.error(
            response.data.message || "Your email is not registered with us."
          );
        } else {
          toast.error(response.data.message || "Error resetting the password.");
        }
      }
    } catch (error) {
      toast.error("Error resetting the password.");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          ></div>

          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="px-8 mb-4 text-center">
              <h3 className="pt-4 mb-2 text-2xl">Reset Your Password</h3>
              <p className="mb-4 text-sm text-gray-700">
                Enter your new password below to reset your password!
              </p>
            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <input type="hidden" id="token" value={token} />
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="newPassword"
                  type="password"
                  placeholder="Enter New Password..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-950 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
