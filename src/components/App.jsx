import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFetching } from "../reducers/reposReducer";
import Loader from "./Loader/Loader";

import "./app.scss";
import Main from "../pages/Main";
import About from "../pages/About";
import { NavLink, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const App = () => {
  // const dispatch = useDispatch();
  // const isFetching = useSelector((state) => state.repos.isFetching);
  // const onClickFetching = () => {
  //   dispatch(setFetching(false));
  // };
  const [loaded, setLoaded] = React.useState(false);
  const routes = [
    { path: "/", Component: Main },
    { path: "/about", Component: About },
  ];
  useEffect(() => {
    setTimeout(() => setLoaded(true), 1000);
    console.log(loaded);
  });
  return (
    <BrowserRouter>
      <div className="app">
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            {({ match }) => (
              <CSSTransition
                timeout={1000}
                classNames="page"
                unmountOnExit
                in={match != null}
              >
                <Component />
                {/* {loaded ?  : <>asdasd</>} */}
              </CSSTransition>
            )}
          </Route>
        ))}
      </div>
    </BrowserRouter>
  );
};

export default App;
