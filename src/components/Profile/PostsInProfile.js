import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { fetchPosts } from "../../model/actions/postsAction";

export class PostsInProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    if (!this.props.posts.length) {
      const action = fetchPosts();
      this.props.dispatch(action);
    }
  }

  render() {
    const posts = this.props.posts;
    const filteredPosts = posts.filter(
      (post) => post.user_id === +localStorage.getItem("user_id")
    );
    const dateSortedposts = filteredPosts.sort((a, b) => {
      const dateOne = new Date(a.created_at),
        dateTwo = new Date(b.created_at);
      return dateTwo - dateOne;
    });

    return (
      <>
        <div className="totalposts">Total posts: {filteredPosts.length}</div>
        <>
          {dateSortedposts.map((post) => {
            return <PostInProfile post={post} key={post.id} {...this.props} />;
          })}
        </>
      </>
    );
  }
}

class PostInProfile extends React.Component {
  filteredComments = (arr, id) => {
    const result = arr.filter((comment) => comment.commentable_id === +id);
    return result;
  };

  render() {
    let date = `${new Date(this.props.post.created_at)}`;
    return (
      <div className="card" key={this.props.post.id}>
        <Link to={`/posts/${this.props.post.id}`}>
          <div className="title">{this.props.post.title}</div>
        </Link>
        <div className="description">{this.props.post.description}</div>
        <div className="comments-counter">
          Comments:{" "}
          {
            this.filteredComments(this.props.comments, this.props.post.id)
              .length
          }
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 20,
            fontSize: 13,
          }}
        >
          <div className="id">User ID: {this.props.post.user_id}</div>
          <div className="created">Created at: {date}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
    comments: state.commentReducer.comments,
  };
};

export default connect(mapStateToProps, null)(PostsInProfile);
