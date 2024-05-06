import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { baseUrl } from "../Config";

export const Comment = ({ comment, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const handleDeleteComment = async () => {
    try {
      await axios.delete(`${baseUrl}/posts/${comment._id}/comments/`, {
        withCredentials: true,
      });

      onDelete(comment._id);

      toast.success("Comment successfully deleted.");
    } catch (error) {
      toast.error("Error deleting the comment", error);
    }
  };

  const handleEditComment = async () => {
    try {
      if (editedText.trim() === "") {
        toast.error("Comment text cannot be empty.");
        return;
      }

      const response = await axios.put(
        `${baseUrl}/posts/${comment._id}/comments/`,
        { text: editedText },
        {
          withCredentials: true,
        }
      );

      if (onEdit) {
        onEdit(response.data);
      }

      toast.success("Comment successfully edited.");
      setIsEditing(false);
    } catch (error) {
      toast.error("Error editing the comment", error);
    }
  };

  const canEditAndDelete =
    comment?.commentator?.trim() === Cookies.get("username")?.trim();

  return (
    <div className=" mflex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed my-2">
      <div className="comentario-info">
        <strong className="text-base font-semibold text-gray-900">
          {comment.commentator}
        </strong>
        <small className="text-sm font-normal text-gray-500 ml-1">
          -{moment(comment.createdAt).fromNow()}
          <span className="isolate inline-flex rounded-md shadow-sm">
            {canEditAndDelete && (
              <>
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="mx-1 flex items-center justify-center bg-green-500  rounded-sm hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white"
                      style={{ width: "20px", height: "20px" }}
                      onClick={handleEditComment}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center bg-red-500  rounded-sm hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white"
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => setIsEditing(false)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="mx-1 flex items-center justify-center bg-blue-500  rounded-sm  hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white "
                      style={{ width: "20px", height: "20px" }}
                      onClick={() => setIsEditing(true)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center bg-red-500  rounded-sm hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white"
                      style={{ width: "20px", height: "20px" }}
                      onClick={handleDeleteComment}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </>
                )}
              </>
            )}
          </span>
        </small>
      </div>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="px-3 py-2 border shadow-sm border-gray-300 rounded-md w-full block placeholder:text-gray-400 placeholder-gray-500
          focus:outline-none focus:ring-1 bg-gray-50 focus:ring-blue-600 focus:border-blue-600 text-sm"
          style={{ minHeight: "50px", maxHeight: "100px" }}
        />
      ) : (
        <div className="text-sm text-gray-600">{comment.text}</div>
      )}
    </div>
  );
};

export const Comments = ({ comments, onDeleteComment, onEditComment }) => (
  <div className="comentarios">
    {comments.map((comment) => (
      <Comment
        key={comment._id}
        comment={comment}
        onDelete={onDeleteComment}
        onEdit={onEditComment}
      />
    ))}
  </div>
);
