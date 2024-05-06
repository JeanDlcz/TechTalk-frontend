import { useState, createContext, useContext } from "react";
import {
  getPostsRequest,
  createPostRequest,
  deletePostRequest,
  getPostRequest,
  updatePostRequest,
} from "../api/posts";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";

export const postContext = createContext();

export const usePosts = () => {
  const context = useContext(postContext);
  return context;
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { auth } = useAuth();

  const getAllPost = async () => {
    try {
      const res = await getPostsRequest();
      setPosts(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const createPost = async (post) => {
    try {
      const res = await createPostRequest(post, auth.token);
      setPosts([...posts, res.data]);
    } catch (error) {}
  };

  const deletePost = async (id) => {
    await deletePostRequest(id, auth.token);
    setPosts(posts.filter((post) => post._id !== id));
    getAllPost();
  };

  const getPost = async (id) => {
    try {
      const res = await getPostRequest(id);
      return res.data;
    } catch (error) {}
  };

  const updatePost = async (id, post) => {
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("description", post.description);
      formData.append("categories", post.categories);
      formData.append("source", post.source);
      formData.append("author", post.author);
      formData.append("image", post.image);

      const res = await updatePostRequest(id, formData, auth.token);
      setPosts(posts.map((post) => (post.id === id ? res.data : post)));

      getAllPost();
    } catch (error) {
      toast.error("Error updating post.");
    }
  };

  return (
    <postContext.Provider
      value={{
        posts,
        getAllPost,
        createPost,
        deletePost,
        getPost,
        updatePost,
      }}
    >
      {children}
    </postContext.Provider>
  );
};
