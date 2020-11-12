import React from "react";
import Comment from "./Comment";
import EditModal from "./Modal";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import "./PostsWrapper.css";
import { logoutUser } from "../../model/actions/loginAction";
import { connect } from "react-redux";
import { fetchOnePost } from "../../model/actions/postsAction";

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("user-id");
    const action = logoutUser();
    props.dispatch(action);
    setTimeout(setAnchorEl(null), 500);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "#fff", marginRight: 15 }}
      >
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link className="link" to="/main">
            Main Page
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="link" to="/profile">
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Link className="link" to="/login">
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      postID: null,
    };
  }

  componentDidMount() {
    let postID = this.props.match.params.postID;
    const action = fetchOnePost(postID);
    this.props.dispatch(action);

    //   let headers = {
    //     "access-token": localStorage.getItem("access-token"),
    //     uid: localStorage.getItem("uid"),
    //     client: localStorage.getItem("client"),
    //   };
    //   let requestOptions = {
    //     method: "GET",
    //     headers: headers,
    //     redirect: "follow",
    //   };
    //   fetch(`https://postify-api.herokuapp.com/posts/${postID}`, requestOptions)
    //     .then((response) => response.json())
    //     .then((result) =>
    //       this.setState({
    //         post: result,
    //         postID,
    //       })
    //     )

    //     .catch((error) => console.log("error", error));
    // }
  }

  updatePost = (newPost) => {
    this.setState({ post: newPost });
  };
  render() {
    // console.log(this.props, "props one post");
    return (
      <div>
        <nav className="navbar">
          <SimpleMenu {...this.props} />
        </nav>

        <div className="card">
          {this.props.post ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: 20,
                  fontSize: 13,
                }}
              >
                <div className="id">User ID: {this.props.post.user_id}</div>
                <div className="created">
                  Created at:
                  {`${new Date(this.props.post.created_at)}`}
                </div>
              </div>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.loginReducer.isAuth,
    post: state.postsReducer.post,
  };
};

export default connect(mapStateToProps, null)(Post);
