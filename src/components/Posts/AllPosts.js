import React from "react";
import { Link } from "react-router-dom";
import BasicPagination from "../Pagination";
import { connect } from "react-redux";
import Loader from "../Spinner";

import DeleteModal from "./DeleteModal";

export class AllPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 1,
      countPages: null,
      isLoading: false,
    };
    this.itemsPerPage = 10;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ page: value });
  };

  render() {
    const posts = this.props.posts;
    const dateSortedposts = posts.sort((a, b) => {
      const dateOne = new Date(a.created_at),
        dateTwo = new Date(b.created_at);
      return dateTwo - dateOne;
    });

    return (
      <>
        {!!this.props.isLoading ? (
          <Loader />
        ) : (
          <>
            {this.props.posts.length > this.itemsPerPage ? (
              <>
                {dateSortedposts
                  .slice(
                    (this.state.page - 1) * this.itemsPerPage,
                    this.state.page * this.itemsPerPage
                  )
                  .map((post) => {
                    return <Post post={post} key={post.id} {...this.props} />;
                  })}
                <div className="pagination">
                  <BasicPagination
                    count={this.props.countPages}
                    page={this.state.page}
                    onChange={this.handleChange}
                    defaultPage={1}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                  />
                </div>
              </>
            ) : (
              <>
                {dateSortedposts
                  .slice(
                    (this.state.page - 1) * this.itemsPerPage,
                    this.state.page * this.itemsPerPage
                  )
                  .map((post) => {
                    return <Post post={post} key={post.id} {...this.props} />;
                  })}
              </>
            )}
          </>
        )}
      </>
    );
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
    };
  }

  filteredComments = (arr, id) => {
    const result = arr.filter((comment) => comment.commentable_id === +id);
    return result;
  };

  render() {
    let date = `${new Date(this.props.post.created_at)}`;

    return (
      <div className="card" key={this.props.post.id}>
        <div className="in-post-flex">
          <Link to={`/posts/${this.props.post.id}`}>
            <div className="title">{this.props.post.title}</div>
          </Link>

          <DeleteModal {...this.props} />
        </div>
        <div className="description">{this.props.post.description}</div>

        <div className="comments-counter">
          Comments:{" "}
          {
            this.filteredComments(this.props.comments, this.props.post.id)
              .length
          }
        </div>
        <div className="in-onepost">
          <div className="id">User ID: {this.props.post.user_id}</div>
          <div className="created">Created at: {date}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.postsReducer.isLoading,
    posts: state.postsReducer.posts,
    countPages: state.postsReducer.countPages,
  };
};

export default connect(mapStateToProps, null)(AllPosts);
