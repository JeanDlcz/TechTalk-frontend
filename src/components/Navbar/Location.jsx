import { useLocation } from "react-router-dom";

export const useRouteVariables = () => {
  const location = useLocation();

  return {
    isLoginPage: location.pathname === "/login",
    isHomePage: location.pathname === "/",
    isSignupPage: location.pathname === "/signup",
    isFormPage: location.pathname === "/new",
    isAdminPage: location.pathname === "/admin",
    userListPage: location.pathname === "/users",
    isContactPage: location.pathname === "/contact",
    isSubscribePage: location.pathname === "/subscription",
    isDetailPage: location.pathname.startsWith("/post/"),
    hideHomeLink: location.pathname.startsWith("/posts/"),
    isEmailPage: location.pathname==="/email",
    isConfirmPage: location.pathname==="/confirm-unsubscribe",
    isForgotPage: location.pathname ==="/forgot-password",
    isResetPasswordPage: location.pathname.startsWith("/reset-password/"),
    isEditPostPage: location.pathname.startsWith("/edit/")

  };
};
