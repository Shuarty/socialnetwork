import React from "react";
import Comment from "./Comment";
import EditModal from "./Modal";
import NavBar from "../NavBar";
import "./Posts.css";

import { connect } from "react-redux";
import { fetchOnePost } from "../../model/actions/postsAction";
import Loader from "../Spinner";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      postID: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    let postID = this.props.match.params.postID;
    const action = fetchOnePost(postID);
    this.props.dispatch(action);
  }

  updatePost = (newPost) => {
    this.setState({ post: newPost });
  };

  render() {
    return (
      <div>
        <NavBar />

        <div className="card">
          {!!this.props.isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="in-post-flex">
                <div>
                  <div className="title">{this.props.post.title}</div>

                  <div className="description">
                    {this.props.post.description}
                  </div>
                </div>
                <EditModal
                  post={this.props.post}
                  updatePost={this.updatePost}
                />
              </div>
              <Comment postID={this.props.post.id} />
              <div className="in-onepost">
                <div className="id">User ID: {this.props.post.user_id}</div>
                <div className="created">
                  Created at:
                  {`${new Date(this.props.post.created_at)}`}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.postsReducer.isLoading,
    post: state.postsReducer.post,
  };
};

export default connect(mapStateToProps, null)(Post);
