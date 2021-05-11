import axios from "axios";
import authHeader from "./authHeader";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};
function createAxiosResponseInterceptor() {
  axios.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const token = user.access_token || "";
      req.headers["Authorization"] = "Bearer " + token;
    }

    return req;
  });
  const interceptor = axios.interceptors.response.use(
    (response) => {
      let user = JSON.parse(localStorage.getItem("user"));
      //Change token when expired
      if (
        response.status === 200 &&
        response.data.status === "Token is Expired"
      ) {
        const token = response.data.token;
        user.access_token = token;
        localStorage.setItem("user", JSON.stringify(user));
        //axios.interceptors.response.eject(interceptor);
        response.config.headers["Authorization"] = "Bearer " + token;
        return axios(response.config);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}
export default createAxiosResponseInterceptor;
