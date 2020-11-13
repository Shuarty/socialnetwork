import React from "react";
import "./Profile.css";
import { connect } from "react-redux";
import AllPosts from "../Posts/AllPosts";
import NavBar from "../NavBar";
import { fetchFilteredPosts } from "../../model/actions/postsAction";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: [],
    };
  }

  email = localStorage.getItem("uid");

  getFilteredPosts = () => {
    const action = fetchFilteredPosts();
    this.props.dispatch(action);
  };

  componentDidMount() {
    this.getFilteredPosts();
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="wrapper">
          <div className="user">Users email: {this.email}</div>

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
    // auth: state.loginReducer.isAuth,
  };
};

export default connect(mapStateToProps, null)(Profile);
