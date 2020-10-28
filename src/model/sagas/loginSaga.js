//LOGIN USER
import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_LOGIN_USER, REQUEST_LOGIN_USER } from "../types";

export default function* sagasWatcherUser() {
  yield takeEvery(FETCH_LOGIN_USER, sagaWorkerUser);
}

function* sagaWorkerUser(action) {
  const payload = yield call(fetchUser, action);
  yield put({ type: REQUEST_LOGIN_USER, payload });
}

async function fetchUser(payload) {
  const res = await fetch("https://postify-api.herokuapp.com/auth/sign_in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(payload),
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
      localStorage.setItem("user_id", result.data.id);
    });
  } catch (e) {
    console.log(e);
  }
}
