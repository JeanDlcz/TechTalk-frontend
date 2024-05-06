import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";
import {  toast } from "react-hot-toast";
import { baseUrl } from "../Config";
const useSignupLogic = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error] = useState("");

  const { setAuth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const SignupUrl = `${baseUrl}/auth/signup`;
  const from = location.state?.from?.pathname || "/login";

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      if (data.password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        return; 
      }

      const url = SignupUrl;
      const { data: res } = await axios.post(url, data);
      const roles = res?.roles;
      const token = res?.token;
      setAuth({ roles, token });
      navigate(from, { replace: true });
      toast('Account creation successful, now log in!', {
        icon: '👏',
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        const errorMessage = error.response.data.message;
        toast.error(`Error: ${errorMessage}`, {
          icon: '❌',
        });
      } else {
        toast.error('An error occurred. Please try again later.', {
          icon: '❌',
        });
      }
    }
  };
  

  return {
    data,
    error,
    handleChange,
    handleSubmit,
  };
};

export default useSignupLogic;
