import React from "react";

import "./MainPage.css";
import NavBar from "../NavBar";
import PostForm from "./PostForm";
import { fetchGetComments } from "../../model/actions/commentAction";
import { fetchPosts } from "../../model/actions/postsAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AllPosts from "../Posts/AllPosts";

class MainPage extends React.Component {
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
          <PostForm />
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
  };
};

export default withRouter(connect(mapStateToProps, null)(MainPage));
