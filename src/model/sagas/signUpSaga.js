import { FETCH_AUTH_USER, REQUEST_AUTH_USER } from "../types";
import { takeEvery, call, put } from "redux-saga/effects";
import { history } from "../../index";

export default function* sagasWatcherUserAuth() {
  yield takeEvery(FETCH_AUTH_USER, sagaWorkerUserAuth);
}

function* sagaWorkerUserAuth(action) {
  const payload = yield call(fetchUserAuth, action);
  yield put({ type: REQUEST_AUTH_USER, payload });
  yield call([history, history.push], "/main");
}

async function fetchUserAuth(payload) {
  try {
    const res = await fetch("https://postify-api.herokuapp.com/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    await res.json();
  } catch (e) {
    console.log(e);
  }
}
