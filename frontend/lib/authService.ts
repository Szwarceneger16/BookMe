import {
  login,
  login as loginAction,
  logout as logoutAction,
} from "../src/actions/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import authHeader from "./authHeader";
import header from "./authHeader";

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
        console.log(err.response);
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

  const logout = async () => {
    router.push("/");
    await localStorage.removeItem("user");
    await dispatch(logoutAction());
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

export async function useAuth() {
  const ISSERVER = typeof window === "undefined";
  if (ISSERVER) {
    return;
  }
  const router = useRouter();
  const dispatch = useDispatch();
  const response = await axios
    .get(process.env.BACKEND_HOST + "/user/me", {
      headers: header(),
    })
    // Render compoment when
    .then((res) => {
      if (res.status === 200) {
        dispatch(login(res.data.data));
        return true;
      }
      return false;
    })
    .catch((err) => {
      if (typeof window !== "undefined") {
        router.push("/");
        return false;
      }
    });
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
      if (res.status === 200) {
        dispatch(login(res.data.data));
        return true;
      }
      return false;
    })
    .catch((err) => {
      return false;
    });
}
