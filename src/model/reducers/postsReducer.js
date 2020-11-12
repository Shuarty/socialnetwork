import {
  CREATE_POST,
  FETCH_POSTS,
  REQUEST_POSTS,
  FETCH_ONE_POST,
  REQUEST_ONE_POST,
  REQUEST_CHANGE_POST,
  CHANGE_POST,
} from "../types";

let initialState = {
  posts: [],
  post: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { posts: state.posts.concat(action.payload), ...state };
    case REQUEST_POSTS:
      return { ...state };
    case FETCH_POSTS:
      return { ...state, posts: action.payload };
    case REQUEST_ONE_POST:
      return { ...state };
    case FETCH_ONE_POST:
      return { ...state, post: action.payload };
    case REQUEST_CHANGE_POST:
      return { ...state };
    case CHANGE_POST:
      return { ...state, post: action.payload };

    default:
      return state;
  }
};

export default postsReducer;
