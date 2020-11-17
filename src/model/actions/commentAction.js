import {
  REQUEST_COMMENTS,
  REQUEST_CREATE_COMMENT,
  REQUEST_DELETE_COMMENT,
} from "../types";

export function fetchGetComments() {
  return {
    type: REQUEST_COMMENTS,
  };
}

export function fetchComment(comment) {
  return {
    type: REQUEST_CREATE_COMMENT,
    comment,
  };
}

export function deleteComment(commentID) {
  return {
    type: REQUEST_DELETE_COMMENT,
    commentID,
  };
}
