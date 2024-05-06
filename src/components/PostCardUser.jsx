import moment from "moment";
import React, { useEffect} from "react";
import ReactMarkdown from "react-markdown";
import { insertMedia } from "./PostCard";
import logoImg from "../Images/postimg.jpg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function PostCardUser({ post }) {
  const relativeDate = moment(post.createdAt).fromNow();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <Link to={`/post/${post._id}`} state={{ post }}>
      <article className="container mx-auto max-w-2xl bg-white rounded shadow-lg hover:scale-105 hover:shadow-2xl transform transition-all duration-500 m-10">
        <header className="flex items-center justify-between px-4">
          <div className="flex justify-between items-center py-4">
            <img className="w-12 rounded-full" src={logoImg} alt="logo" />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800 cursor-pointer">
                {post.author}
              </h1>
              <p className="text-sm text-gray-800 hover:underline cursor-pointer">
                {relativeDate}
              </p>
              <p className="text-blue-400 capitalize ">{post.categories}</p>
            </div>
          </div>
        </header>

        {post.image && insertMedia(post.image.url)}

        <div className="p-6">
          <h2 className="text-xl text-gray-800 font-semibold">{post.title}</h2>
          <ReactMarkdown className="text-lg font font-thin text-black text-justify">
            {post.description
              ? `${post.description.substr(0, 330)}...Read More`
              : "not description"}
          </ReactMarkdown>

          <h4 className="text-gray-400 capitalize my-2">
            {" "}
            Source: {post.source}
          </h4>

          <div className="text-base font-bold text-gray-700 mt-3 my-2">
          {post.comments.length} Comment(s) <FontAwesomeIcon icon={faComment} />
        </div>
        </div>
      </article>
    </Link>
  );
}
