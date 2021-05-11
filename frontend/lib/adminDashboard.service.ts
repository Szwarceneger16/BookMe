import axios from "axios";
import header from "./authHeader";

export const getAllVisits = (
    date,
    employee_id
  ) => {
    return axios
      .post(process.env.BACKEND_HOST + "/get-available-reservations", {
        date,
        employee_id,
      }, {
        headers: header() 
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  };