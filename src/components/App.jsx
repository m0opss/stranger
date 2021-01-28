import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "../reducers/reposReducer";
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.repos.count);
  const onCountClick = () => {
    dispatch(setCount(2));
  };

  return (
    <div className="app">
      <button onClick={() => onCountClick()}>count</button>
      <div className="">{count}</div>
    </div>
  );
};

export default App;
