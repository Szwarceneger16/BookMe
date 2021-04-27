import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {};

function messageReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return { message: payload.message, severity: payload.severity };

    case CLEAR_MESSAGE:
      return {};

    default:
      return state;
  }
}

export default messageReducer;
