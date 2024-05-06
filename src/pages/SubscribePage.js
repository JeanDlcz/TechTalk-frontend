import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Config";

export const SubscriptionPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = Cookies.get("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/users/activate-subscription`,
        {
          email: email,
        }
      );

      if (response.status === 200) {
        toast.success("Subscription successful!");
      } else if (response.status === 202) {
        toast("I know you are excited but you are already subscribed!", {
          icon: "😃",
        });
      } else {
        toast.error("Failed to subscribe");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Email not registered with us.");
      } else {
        toast.error("An error occurred:", error);
      }
    }
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/users/email-unsubscribe`,
        {
          email: email,
        }
      );

      if (response.status === 200) {
        navigate("/email");
      } else if (response.status === 202) {
        toast("You are no longer subscribed, please stop trying.", {
          icon: "🤷‍♂️",
        });
      } else {
        toast.error("Failed to unsubscribe");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Email not registered with us.");
      } else {
        toast.error("An error occurred:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black dark:bg-gray-900">
      <div className="w-full md:max-w-[510px] mx-auto px-4">
        <div className="flex justify-end">
          <Link to="/">
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/ios/50/ffffff/delete-sign--v1.png"
              alt="delete-sign--v1"
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="text-white text-center mt-4">
          <div className="font-semibold text-2xl pb-4">
            Do you want to receive notifications when there is a new post?
          </div>
          <p className="text-sm md:text-base">
            If you subscribe and then want to unsubscribe you have to verify
            your email (you can only subscribe your email in session)
          </p>
        </div>
        <div className="flex flex-col mt-8">
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={true}
            className="bg-transparent border-2 rounded-full py-4 px-6 text-[16px] leading-[22.4px] font-light placeholder:text-white text-white"
            placeholder="E-mail Address"
          />
          <div className="flex flex-col mt-4 md:mt-6 md:flex-row md:space-x-4">
            <button
              onClick={handleUnsubscribe}
              className="flex-1 h-auto rounded-full bg-slate-400 text-black py-3 px-6 hover:bg-red-500"
            >
              <span className="text-teal-900 font-semibold">Unsubscribe</span>
            </button>
            <button
              type="submit"
              onClick={handleSubscribe}
              className="flex-1 h-auto rounded-full bg-white text-black py-3 px-6 mt-4 md:mt-0 hover:bg-green-400"
            >
              <span className="text-teal-900 font-semibold">Subscribe</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
