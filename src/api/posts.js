import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../Config";

export const getTokenFromCookie = () => {
  return Cookies.get("token");
};

export const getPostsRequest = async () =>
  await axios.get(`${baseUrl}/posts`, {});

export const createPostRequest = async (post) => {
  const form = new FormData();

  for (let key in post) {
    form.append(key, post[key]);
  }

  return await axios.post(`${baseUrl}/posts`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getTokenFromCookie()}`,
    },
  });
};

export const deletePostRequest = async (id) =>
  await axios.delete(`${baseUrl}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${getTokenFromCookie()}`,
    },
  });

export const getPostRequest = async (id) =>
  await axios.get(`${baseUrl}/posts/` + id);

  export const updatePostRequest = async (id, formData) => {
    try {
      const token = getTokenFromCookie();
      const response = await axios.put(`${baseUrl}/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
