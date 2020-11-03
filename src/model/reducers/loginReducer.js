import { FETCH_LOGIN_USER, REQUEST_LOGIN_USER, LOGOUT_USER } from "../types";
const initialState = {
  email: "",
  password: "",
  id: null,
  isAuth: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_USER:
      return { ...state };
    case REQUEST_LOGIN_USER:
      return { ...state, data: action.payload, isAuth: true };
    case LOGOUT_USER:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

export default loginReducer;
