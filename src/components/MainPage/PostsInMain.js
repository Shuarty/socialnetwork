import React from "react";
import { Link } from "react-router-dom";
import BasicPagination from "../Pagination";
import { connect } from "react-redux";
import { fetchPosts } from "../../model/actions/postsAction";

export class PostsInMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 1,
      noOfPages: 1,
    };
    this.itemsPerPage = 10;

    this.handleChange = this.handleChange.bind(this);
  }

  // getFetchedPosts = async () => {
  //   const action = fetchPosts();
  //   await this.props.dispatch(action);
  // };

  // componentDidMount() {
  //   this.getFetchedPosts();
  // }

  componentDidUpdate(prevProps) {
    if (this.props.posts.length !== prevProps.posts.length) {
      this.setState({
        noOfPages: Math.ceil(this.props.posts.length / this.itemsPerPage),
      });
    }
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
        {dateSortedposts
          .slice(
            (this.state.page - 1) * this.itemsPerPage,
            this.state.page * this.itemsPerPage
          )
          .map((post) => {
            return <PostInMain post={post} key={post.id} {...this.props} />;
          })}
        <div className="pagination">
          <BasicPagination
            count={this.state.noOfPages}
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
    );
  }
}

class PostInMain extends React.Component {
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

export default connect(mapStateToProps, null)(PostsInMain);
