import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFetching } from "../reducers/reposReducer";
import Loader from "./Loader/Loader";

import "./app.scss";
import Main from "../pages/Main";
import About from "../pages/About";
import LK from "../pages/LK";
import { NavLink, Redirect, Route } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Transfer from "../pages/Transfer";

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
    { path: "/transfer", Component: Transfer },
  ];

  // useEffect(() => {
  //   console.log(props)
  //   setTimeout(() => setLoaded(true), 1000);
  // }, []);

  return (
    <Router>
      <div className="app">
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            {({ match }) => (
              <CSSTransition
                timeout={1000}
                // classNames="page"
                unmountOnExit
                in={match != null}
              >
                <Component />
                {/* {loaded ? <Component /> : <>asdasd</>} */}
              </CSSTransition>
            )}
          </Route>
        ))}
      </div>
    </Router>
  );
};

export default App;
