import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRouteVariables } from "./Location";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUserTie,
  faBell,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const Dropdown = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {
    isHomePage,
    isAdminPage,
    hideHomeLink,
    isFormPage,
    userListPage,
    isSubscribePage,
    isDetailPage,
    isLoginPage,
  } = useRouteVariables();
  const { setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({ roles: null, token: null });
    window.location = "/login";
    Cookies.remove("token");
    Cookies.remove("roles");
    Cookies.remove("username");
    Cookies.remove("email");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeMenu();
    }
  };

  const handleMenuItemClick = () => {
    closeMenu();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        className="flex items-center p-2 text-sm text-gray-600 bg-white border border-transparent rounded-md  focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white dark:bg-gray-800 focus:outline-none"
        onClick={toggleMenu}
      >
        <span className="mx-1 text-sm font-semibold ">
          <FontAwesomeIcon icon={faUserTie} /> {Cookies.get("username")}
        </span>
        <svg
          className="w-5 h-5 mx-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>

      <div
        className={`absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-800${
          isMenuOpen ? " visible opacity-100" : " invisible opacity-0"
        }`}
      >
        <Link
          to="#"
          onClick={handleMenuItemClick}
          className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <div className="mx-1">
            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              <FontAwesomeIcon icon={faUserTie} /> {Cookies.get("username")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {Cookies.get("email")}
            </p>
          </div>
        </Link>

        <hr className="border-gray-200 dark:border-gray-700" />

        {!hideHomeLink &&
          !isAdminPage &&
          !isFormPage &&
          !userListPage &&
          !isSubscribePage &&
          !isDetailPage && (
            <Link
              to="/subscription"
              onClick={handleMenuItemClick}
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Subscribe <FontAwesomeIcon icon={faBell} />
            </Link>
          )}

        {isHomePage && (
          <Link
            to="/contact"
            onClick={handleMenuItemClick}
            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Support <FontAwesomeIcon icon={faHeadset} />
          </Link>
        )}

        <hr className="border-gray-200 dark:border-gray-700" />
        {!isLoginPage && (
          <div className="relative" onClick={() => setIsMenuOpen(false)}>
            <Link
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={handleLogout}
            >
              {Cookies.get("token") ? "Logout" : "Login"}{" "}
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
