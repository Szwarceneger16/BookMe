import {
  login,
  login as loginAction,
  logout as logoutAction,
} from "../src/actions/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

import header from "./authHeader";

export function reservationService(): object {

  const setNewReservation = ({ 
    client_id, 
    place_id,
    service_id,
    employee_id,
    datetime_start,
    datetime_end 
  }) => {
    return axios
      .post(process.env.BACKEND_HOST + "/reservations", {
        client_id,
        place_id,
        service_id,
        employee_id,
        datetime_start,
        datetime_end
      }, {
        headers: header() 
      })
      .then((res) => {
        console.log(res)
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  const getExperts = ({ 
    
  }) => {
    /* return axios
      .post(process.env.BACKEND_HOST + "/reservations", {
        
      }, {
        headers: header() 
      })
      .then((res) => {
        //console.log(res)
        return res;
      })
      .catch((err) => {
        return false;
      }); */
      return Promise.resolve();
  };

  return {
    setNewReservation,
    getExperts
  };
}