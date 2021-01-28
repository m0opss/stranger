import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFetching } from "../reducers/reposReducer";
import Loader from "./Loader/Loader";

import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.repos.isFetching);
  const onClickFetching = () => {
    dispatch(setFetching(false));
  };

  return (
    <div className="app">
      <div className="container ">
        {isFetching ? (
          <div className="panel">
            <Loader />
            <button className="btn" onClick={onClickFetching}>
              No Fetching!
            </button>
          </div>
        ) : (
          <div className="welcome">React!</div>
        )}
      </div>
    </div>
  );
};

export default App;
