
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import moment from "moment";
import logoImg from "../Images/postimg.jpg";
import { ModeratorDropdown } from "./ModeratorDropdown";
import { useState } from "react";

export function insertMedia(filePath) {
  var extension = filePath.split(".").pop().toLowerCase();

  if (
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "gif"
  ) {
    return <img src={filePath} alt="Imagen" className="w-full" />;
  } else if (
    extension === "mp4" ||
    extension === "webm" ||
    extension === "ogv"
  ) {
    return (
      <video
        src={filePath}
        alt="Video"
        controls
        autoPlay
        muted
        loop
        className="w-full"
      ></video>
    );
  } else {
    return <p>Unsupported file type</p>;
  }
}

export function PostCard({ post }) {

  const relativeDate = moment(post.createdAt).fromNow();
  const [showFullDescription, setShowFullDescription] = useState(false);


  return (
    <article className="container mx-auto max-w-sm bg-white rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transform transition-all duration-500 m-10  animate-fade-down animate-once animate-duration-[500ms] animate-ease-out">
      <header className="flex items-center justify-between px-4">
        <div className="flex justify-between items-center py-4">
          <img className="w-12 rounded-full" src={logoImg} alt="img Logo" />
          <div className="ml-3">
            <h1 className="text-xl font-bold text-gray-800 cursor-pointer">
              {post.author}
            </h1>

            <p className="text-sm text-gray-800 ">{relativeDate}</p>
            <p className="text-blue-400 capitalize "> {post.categories}</p>
          </div>
        </div>
        <ModeratorDropdown postId={post._id} />
      </header>

      <Link to={`/post/${post._id}`} state={{ post }}>
        {post.image && insertMedia(post.image.url)}
        <div className="p-6">
          <h2 className="text-xl text-gray-800 font-semibold">{post.title}</h2>


          <ReactMarkdown className="text-lg font font-thin text-black text-justify">
            {showFullDescription
              ? post.description
              : post.description
              ? `${post.description.substr(0, 330)}...`
              : "No description"}
          </ReactMarkdown>

          {post.description && (
            <button
              className="text-blue-500 cursor-pointer"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          )}

          <h4 className="text-gray-400 capitalize my-2">
            {" "}
            Source: {post.source}
          </h4>
        </div>
      </Link>
    </article>
  );
}
