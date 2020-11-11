import React from "react";
import MainPage from "./components/MainPage/MainPage";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile/Profile";
import PostsWrapper from "./components/Posts/PostsWrapper";
import Post from "./components/Posts/OnePost";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log("resat", rest);
  if (!rest.isAuth) return <Redirect to={"/login"} />;

  return <Route {...rest} component={Component} />;
};

const App = (props) => {
  return (
    <Switch>
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={SignUp} />
      <PrivateRoute path="/main" {...props} component={MainPage} />

      <PrivateRoute exact path="/posts/" {...props} component={PostsWrapper} />
      <PrivateRoute exact path="/posts/:postID" {...props} component={Post} />

      <PrivateRoute exact path="/profile" {...props} component={Profile} />
      <Route
        render={() =>
          props.isAuth ? <Redirect to="/main" /> : <Redirect to="/login" />
        }
      />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.loginReducer.isAuth,
  };
};

export default withRouter(connect(mapStateToProps, null)(App));
