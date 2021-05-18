import React from "react";
import LKButton from "../Button/Button";
import sett from "../../../assets/img/LK/lkBtnSettings.svg";

const LKNavPanel = () => (
  <div className="">
    <LKButton img={sett} />
  </div>
);

const LKNav = () => {
  return (
    <div className="lk-nav">
      <div className="">
        <LKButton img={sett} />
      </div>
      <LKNavPanel />
      <div className=""></div>
    </div>
  );
};

export default LKNav;
