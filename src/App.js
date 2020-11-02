import React from "react";
import MainPage from "./components/MainPage/MainPage";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile/Profile";
import PostsWrapper from "./components/Posts/PostsWrapper";
import Post from "./components/Posts/OnePost";

const items = {
  "Access-Token": localStorage.getItem("access-token"),
  client: localStorage.getItem("client"),
  uid: localStorage.getItem("uid"),
};

const redirect = items ? <Redirect to="/main" /> : <Redirect to="/login" />;

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/posts/" component={PostsWrapper} />
        <Route exact path="/posts/:postID" component={Post} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/profile" component={Profile} />
        {redirect}
      </Switch>
    </>
  );
};
export default withRouter(App);
