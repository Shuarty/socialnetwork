import React from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import "./Profile.css";
import { logoutUser } from "../../model/actions/loginAction";
import { connect } from "react-redux";

import PostsInProfile from "./PostsInProfile";

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

class Profile extends React.Component {
  email = localStorage.getItem("uid");

  render() {
    return (
      <div>
        <nav className="navbar">
          <SimpleMenu {...this.props} />
        </nav>
        <div className="wrapper">
          <div className="user">Users email: {this.email}</div>

          <PostsInProfile />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.loginReducer.isAuth,
  };
};

export default connect(mapStateToProps, null)(Profile);
