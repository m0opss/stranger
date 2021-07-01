import React from "react";
import { useHistory } from "react-router";

import back_arr from "../../assets/img/backArr.svg";
import "./backarr.scss";

const BackArr = ({ link, className, type, func }) => {
  const history = useHistory();

  const onBackClick = () => {
    if (type == "faq") {
      func();
    } else {
      history.push(link);
    }
  };
  return (
    <div
      className={`back-btn btn ${className ? className : ""}`}
      onClick={onBackClick}
    >
      <img src={back_arr} />
    </div>
  );
};

export default BackArr;
