import {
  login,
  login as loginAction,
  logout as logoutAction,
} from "../src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import authHeader from "./authHeader";
import header from "./authHeader";
import React from "react";

export function authService(): object {
  const dispatch = useDispatch();
  const router = useRouter();

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
        console.log(err);
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
    router.push("/");
    localStorage.removeItem("user");
    dispatch(logoutAction());
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
  const isServer = typeof window === "undefined";
  if (isServer) {
    return;
  }

  const user = useSelector((state) => state.auth.user);

  const [response, setResponse] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get(process.env.BACKEND_HOST + "/user/me")
      .then((res) => {
        if (res.status === 200 && res.data.status !== "Token is Expired") {
          dispatch(login(res.data.data));
          setResponse(true);
          return;
        }
        setResponse(false);
      })
      .catch((err) => {
        if (typeof window !== "undefined") {
          router.push("/");
        }
        setResponse(false);
      });
  }, []);

  return response;
}

export function useLogin() {
  const ISSERVER = typeof window === "undefined";
  if (ISSERVER) {
    return;
  }
  const router = useRouter();
  const dispatch = useDispatch();
  axios
    .get(process.env.BACKEND_HOST + "/user/me", {
      headers: header(),
    })
    // Render compoment when
    .then((res) => {
      if (res.status === 200 && res.data.status !== "Token is Expired") {
        dispatch(login(res.data.data));
        return true;
      }
      return false;
    })
    .catch((err) => {
      return false;
    });
}
