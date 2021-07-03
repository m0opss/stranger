import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_TOKEN, SET_UID } from "../reducers/authReducer";
import Loader from "./Loader/Loader";

import "./app.scss";
import Main from "../pages/Main";
import About from "../pages/About";
import LK from "../pages/LK";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

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
import { getMe, getTokenAnon } from "../actions/authActions";
import Advertisers from "../pages/Advertisers";
import ResetPass from "../pages/ResetPass";
import ResetPassConfirm from "../pages/ResetPassConfirm";
import Settings from "../pages/LK/Settings";
import History from "../pages/LK/History";
import Temp from "../pages/Temp";

const App = (props) => {
  // const dispatch = useDispatch();
  // const isFetching = useSelector((state) => state.repos.isFetching);
  // const onClickFetching = () => {
  //   dispatch(setFetching(false));
  // };
  const history = useHistory();
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
    { path: "/rules/rules-slides", Component: RulesSlides },
    { path: "/test", Component: Test },
    { path: "/brand/:id", Component: Brand },
    { path: "/brand/:id/q", Component: Questions },
    { path: "/addPost", Component: AddPost },
    { path: "/faq", Component: FAQ },
    { path: "/addQue", Component: AddQue },
    { path: "/advertisers", Component: Advertisers },
    { path: "/reset", Component: ResetPass },
    { path: "/reset-confirm", Component: ResetPassConfirm },
    { path: "/settings", Component: Settings },
    { path: "/history", Component: History },
    { path: "/temp", Component: Temp },
  ];
  const dispatch = useDispatch();
  const { search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.get("next") != null) {
      history.push("/login");
    }

    if (params.get("uid") != null) {
      dispatch({ type: SET_TOKEN, payload: params.get("token") });
      dispatch({ type: SET_UID, payload: params.get("uid") });
      history.push("/reset-confirm");
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("token") != undefined &&
      localStorage.getItem("token") != ""
    ) {
      dispatch(getMe(localStorage.getItem("token")));
      dispatch({ type: SET_TOKEN, payload: localStorage.getItem("token") });
    } else {
      dispatch(getTokenAnon());
    }
  }, []);

  return (
    <div className="app">
      <Switch>
        {routes.map(({ path, Component }) => {
          if (path == "/rules/rules-slides") {
            console.log(path);
            return (
              <Route key={path} path={path}>
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
            );
          } else {
            return (
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
            );
          }
        })}
      </Switch>
    </div>
  );
};

export default App;
