import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./app/store/configureStore";

import "semantic-ui-css/semantic.min.css";
import "./index.scss";

const store = configureStore();

const el = document.getElementById("root");

import App from "./app/layout/App";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    el
  );
};

render();
