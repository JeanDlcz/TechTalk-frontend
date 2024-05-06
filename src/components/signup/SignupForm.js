import React from "react";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'
import { baseUrl } from "../../Config";

const SignupForm = ({ onSuccess }) => {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const { data, error, handleChange, setError, resetForm } = useForm(initialState);
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/auth/signup`;
      const { data: res } = await axios.post(url, data);
      const roles = res?.roles;
      const token = res?.token;
      setAuth({ roles, token });
      Cookies.set("token", token, { secure: true, sameSite: "strict" });
      resetForm();
      onSuccess();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        toast.error("This didn't work.")
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username" className="mb-1 text-xs tracking-wide text-gray-600">
        UserName:
      </label>
      <div className="relative mb-5">
        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
          <i className="fas fa-user text-blue-500"></i>
        </div>
        <input
          id="username"
          type="text"
          name="username"
          className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder="Enter your Username"
          onChange={handleChange}
          value={data.username}
          required
        />
      </div>
      
      <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">
        E-Mail Address:
      </label>
      <div className="relative mb-5">
        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
          <i className="fas fa-at text-blue-500"></i>
        </div>
        <input
          id="email"
          type="email"
          name="email"
          className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder="Enter your email"
          onChange={handleChange}
          value={data.email}
          required
        />
      </div>
      
      <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
        Password:
      </label>
      <div className="relative mb-6">
        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
          <span>
            <i className="fas fa-lock text-blue-500"></i>
          </span>
        </div>
        <input
          id="password"
          type="password"
          name="password"
          className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
          placeholder="Enter your password"
          onChange={handleChange}
          value={data.password}
          required
        />
      </div>

      <div className="flex w-full">
        <span> {error} </span>
        <button
          type="submit"
          className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
        >
          <span className="mr-2 uppercase">Sign Up</span>
          <span>
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
