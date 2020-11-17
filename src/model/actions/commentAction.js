import { REQUEST_COMMENTS, REQUEST_CREATE_COMMENT } from "../types";

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
