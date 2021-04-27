import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const setMessage = (message, severity) => ({
  type: SET_MESSAGE,
  payload: { message, severity },
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
