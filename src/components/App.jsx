import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFetching } from "../reducers/reposReducer";
import Loader from "./Loader/Loader";

import "./app.scss";
import Main from "../pages/Main";
import About from "../pages/About";
import LK from "../pages/LK";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Transfer from "../pages/Transfer";
import Archive from "../pages/Archive";
import AddPosts from "../pages/AddPosts";
import Register from "../pages/Register";

const App = (props) => {
  // const dispatch = useDispatch();
  // const isFetching = useSelector((state) => state.repos.isFetching);
  // const onClickFetching = () => {
  //   dispatch(setFetching(false));
  // };
  const [loaded, setLoaded] = React.useState(false);
  const routes = [
    { path: "/", Component: Main },
    { path: "/about", Component: About },
    { path: "/lk", Component: LK },
    { path: "/lk-admin", Component: LK },
    { path: "/transfer", Component: Transfer },
    { path: "/archive", Component: Archive },
    { path: "/addPosts", Component: AddPosts },
    { path: "/register", Component: Register },
  ];

  return (
    <Router>
      <div className="app">
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  timeout={1000}
                  // classNames="page"
                  unmountOnExit
                  in={match != null}
                >
                  <Component {...props} />
                  {/* {loaded ? <Component /> : <>asdasd</>} */}
                </CSSTransition>
              )}
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
