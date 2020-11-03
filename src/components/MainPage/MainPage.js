import React from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import "./MainPage.css";
import PostForm from "./PostForm";
import PostsInMain from "./PostsInMain";
import { fetchGetComments } from "../../model/actions/commentAction";
import { fetchPost } from "../../model/actions/postsAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

function SimpleMenu() {
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
          <Link className="link" to="/profile">
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className="link" to="/posts">
            All posts
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

class MainPage extends React.Component {
  getComment = async () => {
    const action = fetchGetComments();
    await this.props.dispatch(action);
  };
  getPosts = async () => {
    const action = fetchPost();
    await this.props.dispatch(action);
  };
  componentDidMount() {
    this.getPosts().then(this.getComment());
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <SimpleMenu />
        </nav>
        <div className="wrapper">
          <PostForm />
          <div className="totalposts">
            Total posts: {this.props.posts.length}
          </div>
          <PostsInMain />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    posts: state.postsReducer.posts,
    auth: state.loginReducer.isAuth,
  };
};

export default withRouter(connect(mapStateToProps, null)(MainPage));
