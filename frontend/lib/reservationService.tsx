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

export function reservationService(): object {
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
        return false;
      });
  };
}