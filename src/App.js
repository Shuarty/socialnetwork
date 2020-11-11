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
  return (
    <Route
      {...rest}
      render={(props) =>
        props.isAuth === false ? (
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
    <Switch>
      <PrivateRoute path="/main" auth={props.isAuth} component={MainPage} />
      <PrivateRoute
        exact
        path="/posts/"
        auth={props.isAuth}
        component={PostsWrapper}
      />
      <PrivateRoute
        exact
        path="/posts/:postID"
        auth={props.isAuth}
        component={Post}
      />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signup" component={SignUp} />
      <PrivateRoute
        exact
        path="/profile"
        auth={props.isAuth}
        component={Profile}
      />
      <Route
        render={() =>
          props.isAuth === true ? (
            <Redirect to="/main" />
          ) : (
            <Redirect to="/login" />
          )
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
