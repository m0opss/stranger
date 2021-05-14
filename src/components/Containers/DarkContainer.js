import React from "react";
import "./containers.scss";

const DarkContainer = ({ children }) => {
  return (
    <>
      <div className="dark-container">
        <div className="main-background__rect1"></div>
        <div className="main-background__circle1"></div>
      </div>
      {children}
    </>
  );
};

export default DarkContainer;
