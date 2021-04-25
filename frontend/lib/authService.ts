import {
  login as loginAction,
  logout as logoutAction,
} from "../src/actions/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import authHeader from "./authHeader";

export function authService(): object {
  const dispatch = useDispatch();

  const login = ({ email, password }) => {
    return axios
      .post(process.env.BACKEND_HOST + "/auth/login", {
        email,
        password,
      })
      .then((res) => {
        const data = res.data.data;
        dispatch(loginAction(data));
        localStorage.setItem("user", JSON.stringify(data));
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  const register = ({ email, password, first_name, last_name, phone }) => {
    return axios
      .post(process.env.BACKEND_HOST + "/auth/register", {
        email,
        password,
        first_name,
        last_name,
        phone,
      })
      .then((res) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  const logout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("user");
  };
  const checkPassword = (password) => {
    return axios.post(
      process.env.BACKEND_HOST + "/user/check-password",
      { password },
      { headers: authHeader() }
    );
  };
  return {
    login,
    register,
    logout,
    checkPassword,
  };
}

export function useAuth() {
  const router = useRouter();
  axios
    .post(process.env.BACKEND_HOST + "/me")
    // Render compoment when
    .then((res) => {
      if (res.status === 200) {
        return false;
      }
      return true;
    })
    .catch((err) => {
      if (typeof window !== "undefined") {
        router.push("/");
      }
    });
}
