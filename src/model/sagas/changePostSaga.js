import { takeEvery, call, put } from "redux-saga/effects";
import { CHANGE_POST, REQUEST_CHANGE_POST } from "../types";

export default function* sagasWatcherChangePost() {
  yield takeEvery(REQUEST_CHANGE_POST, sagaWorkerChangePost);
}
function* sagaWorkerChangePost(action) {
  const dataPost = action.payload;
  const postID = action.postID;
  const payload = yield call(ChangePost, postID, dataPost);
  yield put({ type: CHANGE_POST, payload });
}

async function ChangePost(postID, dataPost) {
  try {
    const res = await fetch(
      `https://postify-api.herokuapp.com/posts/${postID}`,
      {
        method: "PUT",
        headers: {
          "Access-Token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          uid: localStorage.getItem("uid"),
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(dataPost),
      }
    );
    return await res.json();
  } catch (err) {
    console.log("error:", err.message);
  }
}
