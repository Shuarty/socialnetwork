import {
  CREATE_POST,
  REQUEST_POSTS,
  REQUEST_ONE_POST,
  REQUEST_CHANGE_POST,
} from "../types";

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post,
  };
}

export function fetchPosts() {
  return {
    type: REQUEST_POSTS,
  };
}

export function fetchOnePost(postID) {
  return {
    type: REQUEST_ONE_POST,
    postID: postID,
  };
}

export function changePost(postID, post) {
  return {
    type: REQUEST_CHANGE_POST,
    postID: postID,
    payload: post,
  };
}
