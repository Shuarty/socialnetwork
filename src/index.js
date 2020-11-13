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
import sagasWatcherPosts from "./model/sagas/getPostsSaga";
import sagasWatcherOnePost from "./model/sagas/getOnePostSaga";
import sagasWatcherPostAdd from "./model/sagas/addPostSaga";
import sagasWatcherComments from "./model/sagas/getCommentsSaga";
import sagasAddComment from "./model/sagas/addCommentSaga";
import sagasWatcherChangePost from "./model/sagas/changePostSaga";
import sagasWatcherFilteredPosts from "./model/sagas/getFilteredPostsSaga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const saga = createSagaMiddleware();

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["loginReducer"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const history = createBrowserHistory();

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const persistor = persistStore(store);

saga.run(sagasWatcherUser);
saga.run(sagasWatcherUserAuth);
saga.run(sagasWatcherPosts);
saga.run(sagasWatcherFilteredPosts);
saga.run(sagasWatcherOnePost);
saga.run(sagasWatcherPostAdd);
saga.run(sagasWatcherComments);
saga.run(sagasWatcherChangePost);
saga.run(sagasAddComment);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
