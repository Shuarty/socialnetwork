import { takeEvery, call, put } from "redux-saga/effects";
import { REQUEST_CREATE_POST, CREATE_POST_ADD } from "../types";

//LOADING POSTS
export default function* sagasWatcherPostAdd() {
  yield takeEvery(REQUEST_CREATE_POST, sagaWorkerPostAdd);
}

function* sagaWorkerPostAdd(action) {
  const dataPost = action.post;
  // console.log(action.post, "action post saga");
  const payload = yield call(fetchPostsAdd, dataPost);
  // console.log(payload, "payload saga");
  yield put({ type: CREATE_POST_ADD, payload });
}

async function fetchPostsAdd(dataPost) {
  try {
    const res = await fetch("https://postify-api.herokuapp.com/posts", {
      method: "POST",
      headers: {
        "Access-Token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(dataPost),
    });
    return await res.json();
  } catch (err) {
    console.log("error:", err.message);
  }
}
