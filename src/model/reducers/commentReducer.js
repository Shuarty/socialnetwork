import {
  REQUEST_CREATE_COMMENT,
  CREATE_COMMENT_ADD,
  FETCH_GET_COMMENTS,
  REQUEST_COMMENTS,
  REQUEST_DELETE_COMMENT,
  DELETE_COMMENT,
} from "../types";

let initialState = {
  comments: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CREATE_COMMENT:
      return { ...state };
    case CREATE_COMMENT_ADD:
      return { ...state, comments: state.comments.concat(action.payload) };
    case REQUEST_COMMENTS:
      return { ...state };
    case FETCH_GET_COMMENTS:
      return { ...state, comments: action.payload.reverse() };
    case REQUEST_DELETE_COMMENT:
      return { ...state };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default commentReducer;
