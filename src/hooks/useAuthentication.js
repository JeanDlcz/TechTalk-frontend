import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { baseUrl } from "../Config";
const useAuthentication = () => {
  const navigate = useNavigate();
  const LoginUrl = `${baseUrl}/auth/signin`;


  const authenticate = async (data) => {
    try {
      const url = LoginUrl;
      const { data: res } = await axios.post(url, data);
      const roles = res?.roles;
      const token = res?.token;

      if (!roles || !token) {
        throw new Error("No roles or token received in response.");
      }

      
      Cookies.set("token", token, { secure: true, httpOnly: true, sameSite: "strict" });

      if (roles.some((role) => role.name === "moderator")) {
        navigate("/admin");
      } else if (roles.some((role) => role.name === "admin")){
        navigate("/users");
      }else{
        navigate("/")
      }
      toast("successful login, have fun!", {
        icon: "👏",
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("invalid credential");
        } else if (error.response.status === 500) {
          toast.error("internal server error");
        } else if (error.response.status === 400) {
          toast.error("user not found");
        }
      }
    }
  };

  return { authenticate };
};

export default useAuthentication;
