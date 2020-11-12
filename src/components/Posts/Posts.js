import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { fetchPosts } from "../../model/actions/postsAction";

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  getFetchedPosts() {
    const action = fetchPosts();
    this.props.dispatch(action);
  }

  componentDidMount() {
    this.getFetchedPosts();
  }

  render() {
    const posts = this.props.posts;
    const dateSortedposts = posts.sort((a, b) => {
      const dateOne = new Date(a.created_at),
        dateTwo = new Date(b.created_at);
      return dateTwo - dateOne;
    });
    return (
      <>
        {dateSortedposts.map((post) => {
          return <OnePost post={post} key={post.id} {...this.props} />;
        })}
      </>
    );
  }
}

class OnePost extends React.Component {
  render() {
    let date = `${new Date(this.props.post.created_at)}`;

    return (
      <div className="card" key={this.props.post.id}>
        <Link to={`/posts/${this.props.post.id}`}>
          <div className="title">{this.props.post.title}</div>
        </Link>
        <div className="description">{this.props.post.description}</div>

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
  };
};

export default connect(mapStateToProps, null)(Posts);
