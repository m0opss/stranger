import React, { useEffect, useState } from "react";
import "./button.scss";

const LKButton = ({ img, name, type, activeTab, setActiveTab }) => {

  const onClickButton = () => {
    setActiveTab(type);
  };

  return (
    <div className="lk-button">
      <div
        className={`lk-button__icon ${activeTab == type ? "active" : ""}`}
        onClick={onClickButton}
      >
        <img className="" src={img} />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default LKButton;
