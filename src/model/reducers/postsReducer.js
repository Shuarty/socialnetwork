import {
  CREATE_POST,
  FETCH_POSTS,
  REQUEST_POSTS,
  REQUEST_FILTERED_POSTS,
  FETCH_FILTERED_POSTS,
  FETCH_ONE_POST,
  REQUEST_ONE_POST,
  REQUEST_CHANGE_POST,
  CHANGE_POST,
  DELETE_POST,
  REQUEST_DELETE_POST,
} from "../types";

let initialState = {
  posts: [],
  post: [],
  countPages: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { posts: state.posts.concat(action.payload), ...state };
    case REQUEST_DELETE_POST:
      return { ...state };
    case DELETE_POST:
      return { post: action.payload, ...state };
    case REQUEST_POSTS:
      return { ...state };
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
        countPages: Math.ceil(action.payload.length / 10),
      };

    case REQUEST_FILTERED_POSTS:
      return { ...state };
    case FETCH_FILTERED_POSTS:
      return {
        ...state,
        posts: action.payload.filter(
          (post) => post.user_id === +localStorage.getItem("user_id")
        ),
        countPages: Math.ceil(
          action.payload.filter(
            (post) => post.user_id === +localStorage.getItem("user_id")
          ).length / 10
        ),
      };
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
