import { takeEvery, call, put } from "redux-saga/effects";
import { FETCH_ONE_POST, REQUEST_ONE_POST } from "../types";

export default function* sagasWatcherOnePost() {
  yield takeEvery(REQUEST_ONE_POST, sagaWorkerOnePost);
}
function* sagaWorkerOnePost(action) {
  // console.log(action, "action in saga");
  const payload = yield call(fetchOnePost, action.postID);
  yield put({ type: FETCH_ONE_POST, payload });
}

async function fetchOnePost(postID) {
  try {
    const res = await fetch(
      `https://postify-api.herokuapp.com/posts/${postID}`,
      {
        method: "GET",
        headers: {
          "Access-Token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          uid: localStorage.getItem("uid"),
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log("error:", err.message);
  }
}
