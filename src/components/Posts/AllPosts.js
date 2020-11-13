import React from "react";
import { Link } from "react-router-dom";
import BasicPagination from "../Pagination";
import { connect } from "react-redux";
import Loader from "../Spinner";
import {
  deletePost,
  fetchPosts,
  fetchFilteredPosts,
} from "../../model/actions/postsAction";

export class AllPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 1,
      countPages: null,
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
        {this.props.posts.length ? (
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
          <Loader />
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
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  filteredComments = (arr, id) => {
    const result = arr.filter((comment) => comment.commentable_id === +id);
    return result;
  };

  deletePostRedux = async () => {
    const postID = this.props.post.id;
    const action = deletePost(postID);
    await this.props.dispatch(action);
    if (this.props.isFiltered) {
      await this.props.dispatch(fetchFilteredPosts());
    } else {
      await this.props.dispatch(fetchPosts());
    }
  };

  deleteHandler = () => {
    this.props.post.user_id === +localStorage.getItem("user_id")
      ? this.deletePostRedux()
      : console.error("You can't delete another guy's post, stop it, dude.");
  };

  render() {
    let date = `${new Date(this.props.post.created_at)}`;

    return (
      <div className="card" key={this.props.post.id}>
        <div className="in-post-flex">
          <Link to={`/posts/${this.props.post.id}`}>
            <div className="title">{this.props.post.title}</div>
          </Link>
          <button onClick={this.deleteHandler}>Delete post</button>
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
    countPages: state.postsReducer.countPages,
  };
};

export default connect(mapStateToProps, null)(AllPosts);
