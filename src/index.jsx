import "./index.scss";
import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";
import { Provider } from "react-redux";
import { store } from "./reducers";
// import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
