import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "../Config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/auth/forgot-password`,
        {
          email,
        }
      );

      if (response.status === 200) {
        navigate("/email");
      } else if (response.status === 204) {
        toast.error("Your email is not registered with us");
      } else {
        toast.error(
          response.data.message ||
            "Error sending reset email."
        );
      }
    } catch (error) {
      toast.error("Error sending reset email.");
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1624969862644-791f3dc98927?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          ></div>

          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="px-8 mb-4 text-center">
              <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              <p className="mb-4 text-sm text-gray-700">
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
            </div>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Email Address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-950 rounded-full hover:bg-blue-800 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleForgotPassword}
                >
                  Reset Password
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <Link
                  to="/signup"
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Create an Account!
                </Link>
              </div>
              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Already have an account? Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
