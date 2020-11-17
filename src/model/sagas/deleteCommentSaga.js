import { put, takeEvery, call } from "redux-saga/effects";
import { REQUEST_DELETE_COMMENT, DELETE_COMMENT } from "../types";

export default function* sagasWatcherDeleteComment() {
  yield takeEvery(REQUEST_DELETE_COMMENT, sagasWorkerDeleteComment);
}

function* sagasWorkerDeleteComment(action) {
  const commentID = action.commentID;
  const payload = yield call(fetchDeleteComment, commentID);
  yield put({ type: DELETE_COMMENT, payload });
}

async function fetchDeleteComment(commentID) {
  try {
    await fetch(`https://postify-api.herokuapp.com/comments/${commentID}`, {
      method: "DELETE",
      headers: {
        "Access-Token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    return commentID;
  } catch (e) {
    console.error("error:", e.message);
  }
}
