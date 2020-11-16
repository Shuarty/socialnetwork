import { CREATE_COMMENT, FETCH_GET_COMMENTS, REQUEST_COMMENTS } from "../types";

let initialState = {
  comments: [],
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
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
