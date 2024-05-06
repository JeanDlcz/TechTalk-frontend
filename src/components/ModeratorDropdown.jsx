import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";

export const ModeratorDropdown = ({ postId }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = () => {
    closeMenu();
  };

  const handleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            <b> Do you want to Delete?</b>
          </p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={() => {
                deletePost(id);
                toast.dismiss(t.id);
                toast.success("Post Deleted Successfully");
              }}
            >
              Delete
            </button>

            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => {
                toast.dismiss(t.id);
                toast(
                  "Notification: Post deletion cancelled. Your post has been preserved and will not be deleted. Thank you for your understanding and collaboration! ",
                  {
                    duration: 6000,
                    style: {
                      borderRadius: "10px",
                      background: "#333",
                      color: "#fff",
                    },
                  }
                );
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        className="flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
        onClick={toggleMenu}
      >
        <span className="mx-1 text-sm font-semibold "></span>
        <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
      </button>

      <div
        className={`absolute right-0 z-20 w-[100px] py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800${
          isMenuOpen ? " visible opacity-100" : " invisible opacity-0"
        }`}
      >
        <Link
          onClick={handleMenuItemClick}
          className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300  dark:hover:bg-gray-700 dark:hover:text-white"
        ></Link>
        <button
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300  dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => navigate(`/edit/${postId}`)}
        >
          Edit <FontAwesomeIcon icon={faPenToSquare} />
        </button>

        <button
          className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300  dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => handleDelete(postId)}
        >
          Delete <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};
