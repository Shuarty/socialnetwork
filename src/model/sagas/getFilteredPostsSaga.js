import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_FILTERED_POSTS, REQUEST_FILTERED_POSTS } from "../types";

export default function* sagasWatcherFilteredPosts() {
  yield takeEvery(REQUEST_FILTERED_POSTS, sagaWorkerFilteredPosts);
}
function* sagaWorkerFilteredPosts(action) {
  const payload = yield call(fetchFilteredPosts);
  yield put({ type: FETCH_FILTERED_POSTS, payload });
}

async function fetchFilteredPosts() {
  try {
    const res = await fetch(`https://postify-api.herokuapp.com/posts`, {
      method: "GET",
      headers: {
        "Access-Token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    return await res.json();
  } catch (err) {
    console.log("error:", err.message);
  }
}
