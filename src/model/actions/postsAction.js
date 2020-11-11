import { CREATE_POST, REQUEST_POSTS, REQUEST_ONE_POST } from "../types";

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
