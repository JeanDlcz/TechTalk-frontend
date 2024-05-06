import { useState } from "react";

const useLoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  return { data, error, handleChange, setError };
};

export default useLoginForm;
