import React from "react";
import MainPage from "./components/MainPage/MainPage";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile/Profile";
import PostsWrapper from "./components/Posts/PostsWrapper";
import Post from "./components/Posts/OnePost";
import { connect } from "react-redux";

const items = {
  "Access-Token": localStorage.getItem("access-token"),
  client: localStorage.getItem("client"),
  uid: localStorage.getItem("uid"),
  user_id: localStorage.getItem("user_id"),
};

const redirect =
  items["Access-Token"] === null ? (
    <Redirect to="/login" />
  ) : (
    <Redirect to="/main" />
  );

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        props.auth === false ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const App = (props) => {
  return (
    <>
      <Switch>
        <PrivateRoute path="/main" auth={props.auth} component={MainPage} />
        <PrivateRoute
          exact
          path="/posts/"
          auth={props.auth}
          component={PostsWrapper}
        />
        <PrivateRoute
          exact
          path="/posts/:postID"
          auth={props.auth}
          component={Post}
        />
        <Route exact auth={props.auth} path="/login" component={LogIn} />
        <Route exact auth={props.auth} path="/signup" component={SignUp} />
        <PrivateRoute
          exact
          path="/profile"
          auth={props.auth}
          component={Profile}
        />

        {redirect}
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.loginReducer.isAuth,
  };
};

export default withRouter(connect(mapStateToProps, null)(App));
