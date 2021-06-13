import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOKEN } from "../reducers/authReducer";
import Loader from "./Loader/Loader";

import "./app.scss";
import Main from "../pages/Main";
import About from "../pages/About";
import LK from "../pages/LK";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Transfer from "../pages/Transfer";
import Archive from "../pages/Archive";
import AddPosts from "../pages/AddPosts";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Rules from "../pages/Rules";
import Test from "../pages/Test";
import Brand from "../pages/Brand";
import Questions from "../pages/Questions";
import AddPost from "../pages/AddPost";
import RulesSlides from "../pages/RulesSlides";
import FAQ from "../pages/FAQ";
import AddQue from "../pages/AddQue";
import { getMe } from "../actions/authActions";
import Advertisers from "../pages/Advertisers";

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
    { path: "/login", Component: Login },
    { path: "/rules", Component: Rules },
    { path: "/rules-slides", Component: RulesSlides },
    { path: "/test", Component: Test },
    { path: "/brand/:id", Component: Brand },
    { path: "/brand/:id/q", Component: Questions },
    { path: "/addPost", Component: AddPost },
    { path: "/faq", Component: FAQ },
    { path: "/addQue", Component: AddQue },
    { path: "/advertisers", Component: Advertisers },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.getItem("token") != undefined &&
      localStorage.getItem("token") != ""
    ) {
      console.log(localStorage.getItem("token"));
      dispatch(getMe(localStorage.getItem("token")));
      dispatch({ type: SET_TOKEN, payload: localStorage.getItem("token") });
    }
  }, []);
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
