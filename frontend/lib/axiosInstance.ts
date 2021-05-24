import axios from "axios";

function createAxiosResponseInterceptor() {
  axios.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const token = user.access_token || "";
      req.headers["Authorization"] = "Bearer " + token;
    }
    return req;
  });
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.status === 401 &&
        error.response?.data.status === "Token is Expired"
      ) {
        const newAccessToken = error.response.data.token;
        let user = JSON.parse(localStorage.getItem("user"));
        user.access_token = newAccessToken;
        localStorage.setItem("user", JSON.stringify(user));
        error.config.headers["Authorization"] = "Bearer " + newAccessToken;
        return axios.request(error.config);
      } else {
        return Promise.reject(error);
      }
    }
  );
}
export default createAxiosResponseInterceptor;
