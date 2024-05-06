import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import Cookies from "js-cookie";

const RequiresAuth = ({ allowedRoles }) => {
  const location = useLocation();

  const userRoles = Cookies.get("roles");

  const isAuthorized =
    userRoles &&
    allowedRoles.some((allowedRole) => userRoles.includes(allowedRole));

  return isAuthorized ? (

    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequiresAuth;
