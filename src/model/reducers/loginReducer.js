import { FETCH_LOGIN_USER, REQUEST_LOGIN_USER, LOGOUT_USER } from "../types";
const initialState = {
  email: "",
  password: "",
  isAuth: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_USER:
      return { ...state };
    case REQUEST_LOGIN_USER:
      if (localStorage.getItem("access-token")) {
        return { ...state, data: action.payload, isAuth: true };
      } else {
        return { ...state, isAuth: false };
      }
    case LOGOUT_USER:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

export default loginReducer;
