import {
    login as loginAction,
    logout as logoutAction,
} from "../src/actions/auth";
import {useDispatch} from "react-redux";
import axios from "axios";
import {useRouter} from "next/router";

export function authService(): object {
    const dispatch = useDispatch();

    const login = (username, password) => {
        return axios.post(process.env.BACKEND_HOST + "/auth/login", {
            email,
            password,
        })
    };

    const register = (email, password, first_name, last_name, phone) => {
        return axios
            .post(process.env.BACKEND_HOST + "/auth/register", {
                email,
                password,
                first_name,
                last_name,
                phone,
            })
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
