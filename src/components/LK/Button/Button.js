import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./button.scss";

const LKButton = ({ img, name, type, activeTab, setActiveTab, link }) => {
  const onClickButton = () => {
    setActiveTab(type);
  };
  if (type == "arr-m") {
    return (
      <Link className="lk-button" to={link}>
        <div
          className={`lk-button__icon ${activeTab == type ? "active" : ""}`}
          onClick={onClickButton}
        >
          <img className="" src={img} />
        </div>
        <p>{name}</p>
      </Link>
    );
  }
  if (type == "history-m") {
    return (
      <a className="lk-button" href={link}>
        <div
          className={`lk-button__icon ${activeTab == type ? "active" : ""}`}
          onClick={onClickButton}
        >
          <img className="" src={img} />
        </div>
        <p>{name}</p>
      </a>
    );
  }

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
