import {
  REQUEST_CREATE_COMMENT,
  CREATE_COMMENT_ADD,
  FETCH_GET_COMMENTS,
  REQUEST_COMMENTS,
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

    default:
      return state;
  }
};

export default commentReducer;
