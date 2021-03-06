import {
  REQUEST_CREATE_POST,
  REQUEST_POSTS,
  REQUEST_ONE_POST,
  REQUEST_CHANGE_POST,
  REQUEST_FILTERED_POSTS,
  REQUEST_DELETE_POST,
} from "../types";

export function createPost(post) {
  return {
    type: REQUEST_CREATE_POST,
    post: post,
  };
}

export function fetchPosts() {
  return {
    type: REQUEST_POSTS,
  };
}

export function fetchFilteredPosts() {
  return {
    type: REQUEST_FILTERED_POSTS,
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

export function deletePost(postID) {
  return {
    type: REQUEST_DELETE_POST,
    postID: postID,
  };
}
