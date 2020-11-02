import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_POSTS, REQUEST_POSTS } from "../types";

export default function* sagasWatcherPost() {
  yield takeEvery(REQUEST_POSTS, sagaWorkerPost);
}
function* sagaWorkerPost(action) {
  const payload = yield call(fetchPosts);
  yield put({ type: FETCH_POSTS, payload });
}

async function fetchPosts(postID) {
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
