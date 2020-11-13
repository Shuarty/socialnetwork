import React from "react";
import { withRouter } from "react-router-dom";
import "./Posts.css";
import { connect } from "react-redux";
import { fetchGetComments } from "../../model/actions/commentAction";
import { fetchPosts } from "../../model/actions/postsAction";
import NavBar from "../NavBar";

import AllPosts from "./AllPosts";

class PostsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
      countPages: null,
    };
  }

  getComment = async () => {
    const action = fetchGetComments();
    await this.props.dispatch(action);
  };

  getPosts = async () => {
    const action = fetchPosts();
    this.props.dispatch(action);
    await this.getComment();
  };

  componentDidMount() {
    this.getPosts();
  }
  render() {
    return (
      <div>
        <NavBar />
        <div className="wrapper">
          <div className="totalposts">
            Total posts: {this.props.posts.length}
          </div>

          <AllPosts {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
    comments: state.commentReducer.comments,
    countPages: state.postsReducer.countPages,
    auth: state.loginReducer.isAuth,
  };
};

export default withRouter(connect(mapStateToProps, null)(PostsWrapper));
