import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./model/reducers/rootReducer";
import sagasWatcherUser from "./model/sagas/loginSaga";
import sagasWatcherUserAuth from "./model/sagas/signUpSaga";
import sagasWatcherPost from "./model/sagas/getPostsSaga";
import sagasWatcherPostAdd from "./model/sagas/addPostSaga";
import sagasWatcherComments from "./model/sagas/getCommentsSaga";
import sagasAddComment from "./model/sagas/addCommentSaga";

const saga = createSagaMiddleware();

export const history = createBrowserHistory();

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

saga.run(sagasWatcherUser);
saga.run(sagasWatcherUserAuth);
saga.run(sagasWatcherPost);
saga.run(sagasWatcherPostAdd);
saga.run(sagasWatcherComments);

saga.run(sagasAddComment);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
