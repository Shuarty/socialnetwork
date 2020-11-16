import { takeEvery, call, put } from "redux-saga/effects";
import { CREATE_COMMENT, CREATE_COMMENT_ADD } from "../types";

export default function* sagasWatcherCommentAdd() {
  yield takeEvery(CREATE_COMMENT, sagaWorkerCommentAdd);
}

function* sagaWorkerCommentAdd(action) {
  const data = action.payload;
  const payload = yield call(fetchCommentAdd, data);
  yield put({ type: CREATE_COMMENT_ADD, payload });
}

async function fetchCommentAdd(data) {
  try {
    const res = await fetch("https://postify-api.herokuapp.com/comments", {
      method: "POST",
      headers: {
        "Access-Token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.log("error:", err.message);
  }
}
