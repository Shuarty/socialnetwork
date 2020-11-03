import { FETCH_LOGIN_USER } from "../types";

export function fetchLoginUser(dataUser) {
  return {
    dataUser,
    type: FETCH_LOGIN_USER,
  };
}
