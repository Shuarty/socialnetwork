import { takeEvery, call, put } from "redux-saga/effects";
import { DELETE_POST, REQUEST_DELETE_POST } from "../types";

export default function* sagasWatcherDeletePost() {
  yield takeEvery(REQUEST_DELETE_POST, sagaWorkerDeletePost);
}
function* sagaWorkerDeletePost(action) {
  const postID = action.postID;
  const payload = yield call(deletePost, postID);
  yield put({ type: DELETE_POST, payload });
}

async function deletePost(postID) {
  try {
    await fetch(`https://postify-api.herokuapp.com/posts/${postID}`, {
      method: "DELETE",
      headers: {
        "Access-Token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    // return await res.json();
  } catch (err) {
    console.log("error:", err.message);
  }
}
