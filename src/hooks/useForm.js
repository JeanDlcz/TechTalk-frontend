import { useState } from "react";

const useForm = (initialState) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const resetForm = () => {
    setData(initialState);
    setError("");
  };

  return {
    data,
    error,
    handleChange,
    setError,
    resetForm,
  };
};

export default useForm;