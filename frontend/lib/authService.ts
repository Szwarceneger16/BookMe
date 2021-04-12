import {
  login as loginAction,
  logout as logoutAction,
} from "../src/actions/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

export function authService(): object {
  const dispatch = useDispatch();

  const login = async (username, password) => {
    // const result = await client
    //   .mutate({
    //     mutation: LOGIN,
    //     variables: { username, password },
    //   })
    //   .then((res) => {
    //     dispatch(loginAction(res.data));
    //     localStorage.setItem("user", JSON.stringify(res.data));
    //     return true;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return false;
    //   });
    // return result;
  };

  const register = async (name, email, password, password_confirmation) => {
    // const result = await client
    //   .mutate({
    //     mutation: REGISTER,
    //     variables: { name, email, password, password_confirmation },
    //   })
    //   .then((res) => {
    //     return [true, ""];
    //   })
    //   .catch((err) => {
    //     const isEmailError =
    //       err.graphQLErrors[0].extensions.validation["input.email"] || false;
    //     if (isEmailError) {
    //       return [false, "emailError"];
    //     }
    //   });
    // return result;
  };

  const logout = async () => {
    // const result = await client
    //   .mutate({
    //     mutation: LOGOUT,
    //   })
    //   .then((res) => {
    //     dispatch(logoutAction());
    //     localStorage.removeItem("user");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //return result;
  };
  return {
    login,
    register,
    logout,
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
