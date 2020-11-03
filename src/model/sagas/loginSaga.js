//LOGIN USER
import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_LOGIN_USER, REQUEST_LOGIN_USER } from "../types";
import { history } from "../../index";

export default function* sagasWatcherUser() {
  yield takeEvery(FETCH_LOGIN_USER, sagaWorkerUser);
}

function* sagaWorkerUser(action) {
  const payload = yield call(fetchUser, action);
  yield put({ type: REQUEST_LOGIN_USER, payload });
  yield call([history, history.push], "/main");
}

async function fetchUser(payload) {
  const res = await fetch("https://postify-api.herokuapp.com/auth/sign_in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload.dataUser),
  });
  try {
    const result = await res.json();
    res.headers.forEach(function (el, i) {
      if (i === "access-token") {
        let access_token = el.toString();
        localStorage.setItem("access-token", access_token);
      }
      if (i === "client") {
        let client = el.toString();
        localStorage.setItem("client", client);
      }
      if (i === "uid") {
        let uid = el.toString();
        localStorage.setItem("uid", uid);
      }
      if (i === "firs_name") {
        let firs_name = el.toString();
        localStorage.setItem("firs_name", firs_name);
      }
      if (i === "last_name") {
        let last_name = el.toString();
        localStorage.setItem("last_name", last_name);
      }
      localStorage.setItem("user_id", result.data.id);
    });
  } catch (e) {
    console.log(e);
  }
}
