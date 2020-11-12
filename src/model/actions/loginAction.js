import { FETCH_LOGIN_USER, LOGOUT_USER } from "../types";

export function fetchLoginUser(dataUser) {
  return {
    dataUser,
    type: FETCH_LOGIN_USER,
  };
}

export function logoutUser(dataUser) {
  return {
    dataUser,
    type: LOGOUT_USER,
  };
}
