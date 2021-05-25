import React from "react";
import { useHistory } from "react-router";

import back_arr from "../../assets/img/backArr.svg";
import "./backarr.scss";

const BackArr = ({ className }) => {
  const history = useHistory();
  const onBackClick = () => {
    history.goBack();
  };
  return (
    <div className="back-btn btn" onClick={onBackClick}>
      <img src={back_arr} />
    </div>
  );
};

export default BackArr;
