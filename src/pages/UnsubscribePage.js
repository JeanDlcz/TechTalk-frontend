import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../Config";

const UnsubscribeSuccessPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    
    axios
      .post(`${baseUrl}/users/unsubscribe`, { email })

      .then((response) => {})
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black dark:bg-gray-900">
      <div className="w-full md:max-w-[510px] mx-auto px-4">
        <div className="text-white text-center mt-4">
          <div className="font-semibold text-2xl pb-4">
            Unsubscribe Successful
          </div>
          
          <p className="text-sm md:text-base">
            You have been unsubscribed successfully.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribeSuccessPage;
