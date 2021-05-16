import React from "react";
import "./containers.scss";

const DarkContainer = ({ children }) => {
  return (
    <>
      <div className="dark-container">
        <div className="main-background__rect1" />
        <div className="main-background__rect2" />
        <div className="main-background__rect3" />
        <div className="main-background__rect4" />
        <div className="main-background__rect5" />
        <div className="main-background__circle1" />
        <div className="main-background__circle2" />
        <div className="main-background__circle3" />
        <div className="main-background__circle4" />
        <div className="main-background__circle5" />
      </div>
      {children}
    </>
  );
};

export default DarkContainer;
